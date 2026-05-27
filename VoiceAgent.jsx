import React, { useState } from "react";
import { Mic } from "lucide-react";

export default function VoiceAgent() {
  const [voice, setVoice] = useState("Female");
  const [language, setLanguage] = useState("English");
  const [accent, setAccent] = useState("Indian");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const voices = [
    "Male",
    "Female",
    "Robot",
    "Siri Style",
    "Cute Voice",
    "Deep Voice",
  ];

  const languages = [
    "English",
    "Hindi",
    "Telugu",
    "Kannada",
    "Tamil",
    "Malayalam",
    "Spanish",
    "French",
    "Japanese",
  ];

  const accents = [
    "Indian",
    "American",
    "British",
    "Australian",
  ];

  const speakNow = () => {
    const text =
      "Hello Agent. Welcome to Loan AI Recovery Dashboard.";

    const speech = new SpeechSynthesisUtterance(text);

    // LANGUAGES
    if (language === "Hindi") speech.lang = "hi-IN";
    else if (language === "Telugu") speech.lang = "te-IN";
    else if (language === "Kannada") speech.lang = "kn-IN";
    else if (language === "Tamil") speech.lang = "ta-IN";
    else if (language === "Malayalam") speech.lang = "ml-IN";
    else if (language === "Spanish") speech.lang = "es-ES";
    else if (language === "French") speech.lang = "fr-FR";
    else if (language === "Japanese") speech.lang = "ja-JP";
    else speech.lang = "en-US";

    // VOICE EFFECTS
    if (voice === "Robot") {
      speech.pitch = 0.5;
      speech.rate = 0.8;
    }

    if (voice === "Cute Voice") {
      speech.pitch = 2;
      speech.rate = 1.2;
    }

    if (voice === "Deep Voice") {
      speech.pitch = 0.6;
      speech.rate = 0.9;
    }

    if (voice === "Siri Style") {
      speech.pitch = 1.4;
      speech.rate = 1;
    }

    // ACCENTS
    if (accent === "British") {
      speech.lang = "en-GB";
    }

    if (accent === "Australian") {
      speech.lang = "en-AU";
    }

    if (accent === "Indian") {
      speech.lang = "en-IN";
    }

    setIsSpeaking(true);

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(speech);
  };

  return (
    <div className="w-[340px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        AI Voice Assistant
      </h1>

      {/* SELECTS */}
      <div className="space-y-4">

        {/* VOICE */}
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full bg-[#1B1E3A] p-4 rounded-2xl outline-none"
        >
          {voices.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>

        {/* LANGUAGE */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-[#1B1E3A] p-4 rounded-2xl outline-none"
        >
          {languages.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>

        {/* ACCENT */}
        <select
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="w-full bg-[#1B1E3A] p-4 rounded-2xl outline-none"
        >
          {accents.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      </div>

      {/* AI CIRCLE */}
      <div className="flex justify-center mt-8">

        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSpeaking
              ? "bg-purple-500 shadow-[0_0_50px_#a855f7] scale-110"
              : "bg-white/10"
          }`}
        >
          <Mic size={55} />
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={speakNow}
        className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
      >
        Talk to AI
      </button>

      {/* STATUS */}
      <p className="text-center mt-4 text-gray-300">
        {isSpeaking
          ? "AI is speaking..."
          : "AI Assistant Ready"}
      </p>
    </div>
  );
}