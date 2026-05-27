export default function AnalyticsPage() {
  return (
    <div className="glass p-6 rounded-3xl mt-6">
      <h2 className="text-3xl font-bold mb-6">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">Recovery Rate</h3>
          <p className="text-5xl mt-4 text-green-400">74%</p>
        </div>

        <div className="bg-black/30 p-6 rounded-2xl">
          <h3 className="text-xl font-bold">Monthly Collection</h3>
          <p className="text-5xl mt-4 text-pink-400">₹12L</p>
        </div>
      </div>
    </div>
  );
}