const logs = [
  "Reminder sent to Customer #102",
  "Payment received from Customer #220",
  "Loan #522 marked as paid",
  "Report generated successfully",
];

export default function ActivityPanel() {
  return (
    <div className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-white/5 p-4 rounded-xl"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}