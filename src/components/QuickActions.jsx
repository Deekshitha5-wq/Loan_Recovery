const actions = [
  "Send Reminder",
  "Mark as Paid",
  "Add Notes",
  "Generate Report",
];

export default function QuickActions() {
  return (
    <div className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-pink-600 hover:bg-pink-700 transition p-4 rounded-xl glow"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}