import {
  FaHome,
  FaMoneyBill,
  FaUsers,
  FaChartPie,
  FaPhoneAlt,
  FaBell,
  FaCog,
} from "react-icons/fa";

const menu = [
  { icon: <FaHome />, name: "Dashboard" },
  { icon: <FaMoneyBill />, name: "Loans" },
  { icon: <FaUsers />, name: "Customers" },
  { icon: <FaPhoneAlt />, name: "AI Voice Call" },
  { icon: <FaChartPie />, name: "Analytics" },
  { icon: <FaBell />, name: "Notifications" },
  { icon: <FaCog />, name: "Settings" },
];

export default function Sidebar({ setActivePage }) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 hidden md:block text-gray-800">

      <h1 className="text-3xl font-bold mb-10 text-pink-500">
        LoanAI
      </h1>

      <div className="space-y-4">
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setActivePage(item.name.toLowerCase())
            }
            className="flex items-center gap-4 p-4 rounded-xl cursor-pointer text-gray-700 hover:bg-gray-100 transition"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}