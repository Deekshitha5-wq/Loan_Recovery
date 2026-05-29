import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OverviewCards from "../components/OverviewCards";
import LoanStatus from "../components/LoanStatus";
import QuickActions from "../components/QuickActions";
import Analytics from "../components/Analytics";
import ActivityPanel from "../components/ActivityPanel";

import Notifications from "../components/Notifications";
import Settings from "../components/Settings";
import Customers from "../components/Customers";
import Loans from "../components/Loans";
import AnalyticsPage from "../components/AnalyticsPage";
import AIVoiceCall from "../components/AIVoiceCall";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-[#060816] text-white" : "bg-white text-black"
      }`}
    >
      <div className="w-64 flex-shrink-0">
        <Sidebar setActivePage={setActivePage} />
      </div>

      <div className="flex-1 p-6 overflow-y-auto relative">
        <Navbar />

        {activePage === "dashboard" && (
          <div>
            <OverviewCards />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <LoanStatus />
              <QuickActions />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <Analytics />
              <ActivityPanel />
            </div>
          </div>
        )}

        {activePage === "customers" && <Customers />}
        {activePage === "loans" && <Loans />}
        {activePage === "analytics" && <AnalyticsPage />}
        {activePage === "notifications" && <Notifications />}
        {activePage === "ai voice call" && <AIVoiceCall />}

        {activePage === "settings" && (
          <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </div>
    </div>
  );
}