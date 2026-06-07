import { useEffect, useState } from "react";
import { getAnalytics } from "../api";

export default function AnalyticsPage() {

  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const data = await getAnalytics();
    setAnalytics(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Total Interactions</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.total_interactions ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>High Risk Cases</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.high_risk_cases ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Medium Risk Cases</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.medium_risk_cases ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Low Risk Cases</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.low_risk_cases ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Payment Discussions</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.payment_discussions ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Follow Up Requests</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.follow_up_requests ?? 0}
    </h2>
  </div>

  <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
    <h3>Financial Difficulty Cases</h3>
    <h2 className="text-4xl font-bold mt-3">
      {analytics.financial_difficulty_cases ?? 0}
    </h2>
  </div>

</div>
    </div>
  );
}