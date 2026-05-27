import React from "react";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/10"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        Settings
      </h2>

      <div className="space-y-5">
        <div>
          <label className="text-gray-300 block mb-2">
            Agent Name
          </label>

          <input
            type="text"
            placeholder="LoanAI Agent"
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10"
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-2">
            Email Notifications
          </label>

          <select className="w-full p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div>
          <label className="text-gray-300 block mb-2">
            Theme
          </label>

          <select className="w-full p-3 rounded-xl bg-white/10 text-white outline-none border border-white/10">
            <option>Dark Neon</option>
            <option>Light</option>
          </select>
        </div>

        <button className="bg-pink-500 hover:bg-pink-600 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
          Save Settings
        </button>
      </div>
    </motion.div>
  );
};

export default Settings;