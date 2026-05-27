import {
  FaHome,
  FaMoneyBill,
  FaUsers,
  FaChartPie,
  FaBell,
  FaCog,
} from "react-icons/fa";

const menu = [
  { icon: <FaHome />, name: "Dashboard" },
  { icon: <FaMoneyBill />, name: "Loans" },
  { icon: <FaUsers />, name: "Customers" },
  { icon: <FaChartPie />, name: "Analytics" },
  { icon: <FaBell />, name: "Notifications" },
  { icon: <FaCog />, name: "Settings" },
];

export default function Sidebar({ setActivePage }) {
  return (
    <div className="w-64 glass min-h-screen p-6 hidden md:block">
      <h1 className="text-3xl font-bold mb-10 text-purple-400">
        LoanAI
      </h1>

      <div className="space-y-4">
        {menu.map((item, index) => (
  <div
    key={index}
    onClick={() => {
      if (item.name === "Dashboard") {
        setActivePage("dashboard");
      }

      if (item.name === "Notifications") {
        setActivePage("notifications");
      }

      if (item.name === "Settings") {
        setActivePage("settings");
      }
    }}
    className="flex items-center gap-4 p-4 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-300"
  >
    <span className="text-xl">{item.icon}</span>

    <span>{item.name}</span>
  </div>
))}
      </div>
    </div>
  );
}