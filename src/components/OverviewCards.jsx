const data = [
  {
    title: "Total Loans",
    value: "1,250",
  },
  {
    title: "Pending Loans",
    value: "320",
  },
  {
    title: "Recovered Loans",
    value: "930",
  },
  {
    title: "Recovery Rate",
    value: "74%",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {data.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-gray-200"
        >
          <h2 className="text-gray-500">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-3 text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}