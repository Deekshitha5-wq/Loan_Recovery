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

const notifications = Array.isArray(data)
  ? data
  : [];

setNotifications(notifications);
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

      , <div className="space-y-4">
  {notifications.map((item) => (
    <div
      key={item.id}
      className="bg-white shadow-md border border-gray-200 p-4 rounded-lg"
    >
      <h3 className="font-bold text-lg">
        {item.action_type}
      </h3>

      <p className="text-gray-600">
        {item.status}
      </p>

      <p className="text-sm text-gray-500">
        Loan ID: {item.loan_id}
      </p>

      {item.note && (
        <p className="text-sm text-blue-600">
          Note: {item.note}
        </p>
      )}
    </div>
  ))}
</div>
    </div>
  );
}