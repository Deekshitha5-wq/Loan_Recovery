export default function Notifications() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">
        <div className="bg-[#111827] p-4 rounded-xl">
          EMI reminder sent successfully
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          New customer added
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          Recovery target achieved
        </div>
      </div>
    </div>
  );
}