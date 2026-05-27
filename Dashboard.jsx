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

import VoiceAgent from "../components/VoiceAgent";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#060816] text-white">

      {/* SIDEBAR */}
      <div className="w-64 flex-shrink-0">
        <Sidebar setActivePage={setActivePage} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto relative">

        {/* NAVBAR */}
        <Navbar />

        {/* FLOATING VOICE AGENT */}
        <div className="fixed top-24 right-4 z-50 scale-75 origin-top-right">
  <VoiceAgent />
</div>

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <div className="pr-[360px]">

            {/* OVERVIEW CARDS */}
            <OverviewCards />

            {/* LOAN STATUS + QUICK ACTIONS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <LoanStatus />
              <QuickActions />
            </div>

            {/* ANALYTICS + ACTIVITY */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
              <Analytics />
              <ActivityPanel />
            </div>

          </div>
        )}

        {/* CUSTOMERS PAGE */}
        {activePage === "customers" && (
          <div className="pr-[360px]">
            <Customers />
          </div>
        )}

        {/* LOANS PAGE */}
        {activePage === "loans" && (
          <div className="pr-[360px]">
            <Loans />
          </div>
        )}

        {/* ANALYTICS PAGE */}
        {activePage === "analytics" && (
          <div className="pr-[360px]">
            <AnalyticsPage />
          </div>
        )}

        {/* NOTIFICATIONS PAGE */}
        {activePage === "notifications" && (
          <div className="pr-[360px]">
            <Notifications />
          </div>
        )}

        {/* SETTINGS PAGE */}
        {activePage === "settings" && (
          <div className="pr-[360px]">
            <Settings />
          </div>
        )}

      </div>
    </div>
  );
}