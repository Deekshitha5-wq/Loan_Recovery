export default function ActivityPanel() {
  return (
    <div className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">
        Recent Activity
      </h1>

      <div className="space-y-4">
        <div className="bg-white/10 p-4 rounded-xl">
          Reminder sent to Rahul
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          Payment received from Priya
        </div>

        <div className="bg-white/10 p-4 rounded-xl">
          Loan marked completed
        </div>
      </div>
    </div>
  );
}