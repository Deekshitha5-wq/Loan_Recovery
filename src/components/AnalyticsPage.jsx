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

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Monthly Recovery

          <h2 className="text-5xl font-bold mt-4">
            {analytics.recovery_rate}
          </h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Recovered Loans

          <h2 className="text-5xl font-bold mt-4">
            {analytics.recovered_loans}
          </h2>
        </div>

      </div>
    </div>
  );
}