import { useEffect, useState } from "react";
import { getNotifications } from "../api";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-[#111827] p-4 rounded-xl"
          >
            {item.message}
          </div>
        ))}

      </div>
    </div>
  );
}