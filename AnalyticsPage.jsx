export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Monthly Recovery
          <h2 className="text-5xl font-bold mt-4">
            74%
          </h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Collection Efficiency
          <h2 className="text-5xl font-bold mt-4">
            89%
          </h2>
        </div>
      </div>
    </div>
  );
}