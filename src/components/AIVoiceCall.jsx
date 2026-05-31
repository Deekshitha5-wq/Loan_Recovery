import { useEffect, useRef, useState } from "react";
import {
  sendVoiceMessage,
  endVoiceCall,
  getCallLogs,
} from "../api";

export default function AIVoiceCall() {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loanId, setLoanId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [callStatus, setCallStatus] = useState("Ready");
  const [duration, setDuration] = useState(0);
  const [callStarted, setCallStarted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  const fetchLogs = async () => {
    const data = await getCallLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startTimer = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const speakAI = (text) => {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    setCallStatus("AI Speaking");

    speech.onend = () => {
      setCallStatus("Listening");
    };

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    setIsListening(true);
    setCallStatus("Listening");

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setCallStatus("Mic Error");
    };

    recognition.onend = () => {
      setIsListening(false);
      setCallStatus("Ready to Send");
    };

    recognition.start();
  };

  const validateInputs = () => {
    if (!customerName.trim()) {
      alert("Enter customer name exactly as saved in database");
      return false;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      alert("Enter valid 10-digit phone number");
      return false;
    }

    if (!loanId.trim()) {
      alert("Enter loan ID");
      return false;
    }

    if (!message.trim()) {
      alert("Type or speak customer message first");
      return false;
    }

    return true;
  };

  const sendMessage = async () => {
    if (!validateInputs()) return;

    if (!callStarted) {
      setCallStarted(true);
      setDuration(0);
      startTimer();
    }

    const customerText = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "customer",
        text: customerText,
      },
    ]);

    setMessage("");
    setCallStatus("AI Thinking");

    try {
      const data = await sendVoiceMessage(customerText);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.ai_reply,
        },
      ]);

      speakAI(data.ai_reply);
    } catch (error) {
      setCallStatus("Error");
      alert("AI reply failed");
    }
  };

  const endCall = async () => {
    if (!callStarted || messages.length === 0) {
      alert("No active call conversation to save");
      return;
    }

    window.speechSynthesis.cancel();
    stopTimer();
    setIsSaving(true);
    setCallStatus("Saving call...");

    try {
      const data = await endVoiceCall({
        customer_name: customerName,
        phone_number: phoneNumber,
        loan_id: loanId,
        transcript: messages,
      });

      alert(data.message);

      setCallStarted(false);
      setCallStatus("Call Saved");
      setMessages([]);
      setMessage("");
      setDuration(0);

      fetchLogs();
    } catch (error) {
      setCallStatus("Authentication Failed");
      alert("Customer name, phone number, or loan ID does not match database");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">AI Voice Call</h1>
          <p className="text-gray-400 mt-2">
            Real-time loan recovery conversation console
          </p>
        </div>

        <div className="bg-[#1F2937] px-6 py-4 rounded-2xl text-right">
          <p className="text-sm text-gray-400">Call Duration</p>
          <h2 className="text-2xl font-bold">{formatTime(duration)}</h2>
        </div>
      </div>

      <div className="grid xl:grid-cols-[360px_1fr] gap-6">
        <div className="bg-[#1F2937] rounded-3xl p-6 h-fit">
          <h2 className="text-2xl font-bold mb-5">Customer Verification</h2>

          <div className="space-y-4">
            <input
              className="w-full bg-[#111827] p-4 rounded-2xl outline-none"
              placeholder="Exact Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <input
              className="w-full bg-[#111827] p-4 rounded-2xl outline-none"
              placeholder="Registered Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
              className="w-full bg-[#111827] p-4 rounded-2xl outline-none"
              placeholder="Loan ID"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
            />
          </div>

          <div className="mt-6 bg-[#111827] p-4 rounded-2xl">
            <p className="text-sm text-gray-400">Call Status</p>
            <p className="text-green-400 font-bold">{callStatus}</p>
          </div>

          <button
            onClick={endCall}
            disabled={isSaving}
            className="w-full mt-5 bg-red-500 py-4 rounded-2xl font-bold hover:scale-105 transition disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "End Call & Save History"}
          </button>
        </div>

        <div className="bg-[#1F2937] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-2xl font-bold">Live Transcript</h2>
              <p className="text-gray-400 text-sm">
                Type or speak customer message. AI reply appears and speaks back.
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-full text-sm ${
                isListening
                  ? "bg-green-500/20 text-green-300"
                  : "bg-[#111827] text-gray-300"
              }`}
            >
              {isListening ? "Listening..." : "Mic Ready"}
            </div>
          </div>

          <div className="bg-[#060816] rounded-3xl p-5 h-[420px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center text-gray-500">
                <div>
                  <p className="text-5xl mb-4">🎧</p>
                  <p>Start by typing or pressing mic.</p>
                  <p className="text-sm mt-1">
                    Conversation saves only after End Call.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "customer"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-lg ${
                        msg.sender === "customer"
                          ? "bg-pink-500 rounded-br-md"
                          : "bg-purple-600 rounded-bl-md"
                      }`}
                    >
                      <p className="text-xs opacity-80 mb-1">
                        {msg.sender === "customer"
                          ? "Customer"
                          : "AI Recovery Agent"}
                      </p>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-5">
            <input
              className="flex-1 bg-[#111827] p-4 rounded-2xl outline-none"
              placeholder="Type customer response..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />

            <button
              onClick={startListening}
              className={`px-5 rounded-2xl font-bold hover:scale-105 transition ${
                isListening ? "bg-green-500" : "bg-purple-600"
              }`}
            >
              🎤
            </button>

            <button
              onClick={sendMessage}
              className="bg-pink-500 px-7 rounded-2xl font-bold hover:scale-105 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1F2937] p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Call History</h2>

        <div className="space-y-4 max-h-[360px] overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="bg-[#111827] p-5 rounded-2xl">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {log.customer_name} — Loan ID: {log.loan_id}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Phone: {log.phone_number}
                  </p>
                </div>

                <p className="text-green-400 text-sm">
                  {log.call_status}
                </p>
              </div>

              <p className="mt-3 text-gray-300 text-sm">
                Transcript: {log.transcript || log.customer_message}
              </p>

              {log.call_started_at && (
                <p className="text-gray-500 text-xs mt-3">
                  {new Date(log.call_started_at).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}