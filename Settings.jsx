export default function Settings() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="space-y-6">
        <div className="bg-[#111827] p-4 rounded-xl">
          Dark Mode: ON
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          Notifications Enabled
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          Language: English
        </div>
      </div>
    </div>
  );
}