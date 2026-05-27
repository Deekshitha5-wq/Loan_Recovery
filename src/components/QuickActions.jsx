const actions = [
  "Send Reminder",
  "Mark as Paid",
  "Add Notes",
  "Generate Report",
];

export default function QuickActions() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Quick Actions
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}