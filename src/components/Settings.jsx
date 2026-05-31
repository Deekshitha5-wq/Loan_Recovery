import { useState } from "react";

export default function Settings({
  darkMode,
  setDarkMode,
}) {
  const [notifications, setNotifications] = useState(true);

  const [language, setLanguage] = useState("English");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="space-y-6">

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full bg-white shadow-md border border-gray-200 p-4 rounded-xl text-left"
        >
          Dark Mode: {darkMode ? "ON" : "OFF"}
        </button>

        <button
          onClick={() =>
            setNotifications(!notifications)
          }
          className="w-full bg-white shadow-md border border-gray-200 p-4 rounded-xl text-left"
        >
          Notifications:
          {notifications
            ? " Enabled"
            : " Disabled"}
        </button>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          className="w-full bg-white shadow-md border border-gray-200 p-4 rounded-xl outline-none"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
        </select>

      </div>
    </div>
  );
}