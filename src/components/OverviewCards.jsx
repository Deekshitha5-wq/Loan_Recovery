import { useEffect, useState } from "react";

export default function OverviewCards() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics")
      .then((res) => res.json())
      .then((stats) => {
        setData([
          {
            title: "Total Loans",
            value: stats.totalLoans,
          },
          {
            title: "Pending Loans",
            value: stats.pendingLoans,
          },
          {
            title: "Recovered Loans",
            value: stats.recoveredLoans,
          },
          {
            title: "Recovery Rate",
            value: `${stats.recoveryRate}%`,
          },
        ]);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {data.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
        >
          <h2 className="text-gray-500">{card.title}</h2>

          <p className="text-4xl font-bold mt-3 text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}