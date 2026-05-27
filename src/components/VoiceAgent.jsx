import React, { useEffect, useState } from "react";
import { Mic, MicOff, Bot } from "lucide-react";

function VoiceAgent() {
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      setVoices(availableVoices);

      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = selectedLanguage;

  const speakMessage = (userMessage) => {
    setIsThinking(true);
    let aiReply = "";

    if (userMessage?.toLowerCase().includes("loan")) {
      aiReply = "Your EMI payment is due next week.";
    } else if (userMessage?.toLowerCase().includes("customer")) {
      aiReply = "Opening customer records.";
    } else if (userMessage?.toLowerCase().includes("payment")) {
      aiReply = "Payment reminder has been sent.";
    } else {
      aiReply = "Hello. I am your AI recovery assistant.";
    }

    const speech = new SpeechSynthesisUtterance(aiReply);

    const voice = voices.find((v) => v.name === selectedVoice);

    if (voice) {
      speech.voice = voice;
    }

    speech.lang = selectedLanguage;
    speech.rate = 1;
    speech.pitch = 1;

   ssetTimeout(() => {
  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: aiReply,
    },
  ]);

  window.speechSynthesis.speak(speech);

  setIsThinking(false);
}, 1500);
  };

  recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;

  console.log("User Said:", transcript);

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: transcript,
    },
  ]);

  speakMessage(transcript);
};
    const transcript = event.results[0][0].transcript;

    console.log("User Said:", transcript);

    speakMessage(transcript);
  };

  const toggleListening = () => {
    if (!listening) {
      setListening(true);
      recognition.start();
    } else {
      setListening(false);
      recognition.stop();
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="voice-agent">
      <div className="agent-header">
        <Bot size={42} />
        <h2>AI Voice Agent</h2>
      </div>

      <div className={`voice-circle ${listening ? "active" : ""}`}>
        {listening ? <Mic size={45} /> : <MicOff size={45} />}
      </div>

      <p className="status">
        {listening && (
  <div className="wave-container">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
)}
        {isThinking && (
  <div className="thinking">
    <span></span>
    <span></span>
    <span></span>
  </div>
)}
        <div className="chat-box">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={
        msg.sender === "user"
          ? "user-message"
          : "ai-message"
      }
    >
      <strong>
        {msg.sender === "user" ? "👤 You" : "🤖 AI"}
      </strong>

      <p>{msg.text}</p>
    </div>
  ))}
</div>
        {listening ? "Listening..." : "Voice Agent Offline"}
      </p>

      <select
        className="voice-select"
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>

      <select
        className="voice-select"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="en-US">English</option>
        <option value="hi-IN">Hindi</option>
        <option value="te-IN">Telugu</option>
      </select>

      <button onClick={toggleListening} className="voice-btn">
        {listening ? "Stop Voice" : "Start Voice"}
      </button>
    </div>
  );


export default VoiceAgent;