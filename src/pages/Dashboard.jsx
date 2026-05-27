import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OverviewCards from "../components/OverviewCards";
import LoanStatus from "../components/LoanStatus";
import QuickActions from "../components/QuickActions";
import Analytics from "../components/Analytics";
import ActivityPanel from "../components/ActivityPanel";
import Notifications from "../components/Notifications";
import Settings from "../components/Settings";
import React, { useState } from "react";
import Customers from "../components/Customers";
import Loans from "../components/Loans";
import AnalyticsPage from "../components/AnalyticsPage";
import VoiceAgent from "../components/VoiceAgent"; 

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  return (
    <div className="flex min-h-screen w-full bg-[#070B1A] text-white relative overflow-hidden">

    <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

<div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 opacity-20 blur-3xl rounded-full"></div>

      <Sidebar setActivePage={setActivePage} />
      <VoiceAgent />

      <div className="flex-1 w-full p-6 overflow-y-auto">
        <Navbar />

{activePage === "dashboard" && (
  <>
    <OverviewCards />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <LoanStatus />
      <QuickActions />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Analytics />
      <ActivityPanel />
    </div>
  </>
)}

{activePage === "notifications" && <Notifications />}

{activePage === "settings" && <Settings />}

{activePage === "customers" && <Customers />}

{activePage === "loans" && <Loans />}

{activePage === "analytics" && <AnalyticsPage />}
        </div>
      </div>
  
  );
}