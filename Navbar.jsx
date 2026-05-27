import { FaBell, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back Agent 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Loan Recovery Dashboard
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-[#1F2937] px-4 py-2 rounded-xl">
          <FaSearch />
          <input
            className="bg-transparent outline-none ml-2"
            placeholder="Search..."
          />
        </div>

        <FaBell size={22} />

        <img
          src="https://i.pravatar.cc/40"
          className="rounded-full"
        />
      </div>
    </div>
  );
}