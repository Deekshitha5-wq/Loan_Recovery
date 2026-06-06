import { useEffect, useState } from "react";
import { getNotifications } from "../api";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/quick-actions");
        const data = await res.json();
        // filter reminders
        const remainders = Array.isArray(data)
          ? data.filter((item) => item.action_type === "Send Reminder")
          : [];
        setNotifications(remainders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(Array.isArray(data) ? data : []);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white shadow-md border border-gray-200 p-4 rounded-lg"
          >
            {n.message}
          </div>
        ))}

      </div>
    </div>
  );
}