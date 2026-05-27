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
          className="bg-[#1F2937] p-6 rounded-2xl"
        >
          <h2 className="text-gray-400">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}