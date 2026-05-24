import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OverviewCards from "../components/OverviewCards";
import LoanStatus from "../components/LoanStatus";
import QuickActions from "../components/QuickActions";
import Analytics from "../components/Analytics";
import ActivityPanel from "../components/ActivityPanel";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen text-white relative overflow-hidden">

      <div className="blob bg-purple-500 w-72 h-72 top-10 left-10"></div>
      <div className="blob bg-pink-500 w-72 h-72 bottom-10 right-10"></div>

      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <OverviewCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LoanStatus />
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Analytics />
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}