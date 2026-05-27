export default function ActivityPanel() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">
        Recent Activity
      </h1>

      <div className="space-y-4">
        <div className="bg-[#111827] p-4 rounded-xl">
          Reminder sent to Rahul
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          Payment received from Priya
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          Loan marked completed
        </div>
      </div>
    </div>
  );
}