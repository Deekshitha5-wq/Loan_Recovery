import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, AlertTriangle } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Payment Reminder Sent",
    desc: "Reminder sent to Rahul Sharma",
    icon: <Bell size={20} />,
  },
  {
    id: 2,
    title: "Loan Successfully Recovered",
    desc: "₹50,000 recovered today",
    icon: <CheckCircle size={20} />,
  },
  {
    id: 3,
    title: "High Risk Account",
    desc: "Customer overdue by 90 days",
    icon: <AlertTriangle size={20} />,
  },
];

const Notifications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/10"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition"
          >
            <div className="text-pink-400">
              {item.icon}
            </div>

            <div>
              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notifications;