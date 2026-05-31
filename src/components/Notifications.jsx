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
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md border border-gray-200 p-4 rounded-lg"
          >
            {item.message}
          </div>
        ))}

      </div>
    </div>
  );
}