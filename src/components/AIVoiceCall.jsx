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
  const [callStatus, setCallStatus] = useState("Idle");
  const [duration, setDuration] = useState(0);
  const [callStarted, setCallStarted] = useState(false);

  const timerRef = useRef(null);

  const fetchLogs = async () => {
    const data = await getCallLogs();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

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

  const speakAI = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 0.95;

    setCallStatus("AI Speaking");

    speech.onend = () => {
      setCallStatus("Listening");
    };

    window.speechSynthesis.speak(speech);
  };

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";

    setCallStatus("Listening");

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setMessage(text);
    };

    recognition.start();
  };

  const sendMessage = async () => {
    if (!customerName.trim()) {
      alert("Enter customer name");
      return;
    }

    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    if (!loanId.trim()) {
      alert("Enter loan ID");
      return;
    }

    if (!message.trim()) {
      alert("Type or speak a customer message");
      return;
    }

    if (!callStarted) {
      setCallStarted(true);
      setDuration(0);
      startTimer();
    }

    setMessages((prev) => [
      ...prev,
      { sender: "customer", text: message },
    ]);

    setCallStatus("AI Thinking");

    const data = await sendVoiceMessage(message);

    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: data.ai_reply },
    ]);

    speakAI(data.ai_reply);
    setMessage("");
    fetchLogs();
  };

  const endCall = async () => {

  window.speechSynthesis.cancel();

  stopTimer();

  setCallStarted(false);

  setCallStatus("Ending call...");

  try {

    const data = await endVoiceCall({
      customer_name: customerName,
      phone_number: phoneNumber,
      loan_id: loanId,
      transcript: messages,
    });

    alert(data.message);

    setCallStatus("Call Ended");

    fetchLogs();

  } catch (error) {

    alert("Failed to save call");

    setCallStatus("Error");
  }
};

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">AI Voice Call</h1>

      <div className="bg-[#1F2937] rounded-3xl p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Live Call Console</h2>
            <p className="text-gray-400">
              Status: <span className="text-green-400">{callStatus}</span>
            </p>
          </div>

          <div className="bg-[#111827] px-5 py-3 rounded-2xl">
            ⏱ {duration}s
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            className="bg-[#111827] p-4 rounded-2xl outline-none"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            className="bg-[#111827] p-4 rounded-2xl outline-none"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <input
            className="bg-[#111827] p-4 rounded-2xl outline-none"
            placeholder="Loan ID"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
          />
        </div>

        <div className="bg-[#060816] rounded-3xl p-5 h-[360px] overflow-y-auto mb-5">
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center mt-28">
              Start conversation by typing or using mic...
            </p>
          ) : (
            <div className="space-y-4">
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
                    className={`max-w-[70%] p-4 rounded-2xl ${
                      msg.sender === "customer"
                        ? "bg-pink-500"
                        : "bg-purple-600"
                    }`}
                  >
                    <p className="text-xs opacity-80 mb-1">
                      {msg.sender === "customer"
                        ? "Customer"
                        : "AI Agent"}
                    </p>
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <input
            className="flex-1 bg-[#111827] p-4 rounded-2xl outline-none"
            placeholder="Type customer message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={startListening}
            className="bg-purple-600 px-5 rounded-2xl"
          >
            🎤
          </button>

          <button
            onClick={sendMessage}
            className="bg-pink-500 px-6 rounded-2xl font-bold"
          >
            Send
          </button>

          <button
            onClick={endCall}
            className="bg-red-500 px-6 rounded-2xl font-bold"
          >
            End
          </button>
        </div>
      </div>

      <div className="bg-[#1F2937] p-6 rounded-3xl">
        <h2 className="text-2xl font-bold mb-4">Call Logs</h2>

        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-[#111827] p-4 rounded-2xl">
              <p>
                <b>{log.customer_name}</b> — Loan ID: {log.loan_id}
              </p>
              <p>Customer: {log.customer_message}</p>
              <p>AI: {log.ai_reply}</p>
              <p className="text-green-400">{log.call_status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}