import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">
          Loan Recovery Agent Dashboard
        </h1>
        <p className="text-gray-300">
          Welcome back,Agent! Here is your Dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
          <FaSearch />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        <div className="glass p-3 rounded-xl">
          <FaBell />
        </div>

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
      </div>
    </div>
  );
}