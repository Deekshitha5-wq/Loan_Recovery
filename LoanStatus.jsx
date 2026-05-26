export default function LoanStatus() {
  return (
    <div className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">
        Loan Status
      </h2>

      <input
        type="text"
        placeholder="Enter Loan ID"
        className="w-full p-3 rounded-xl bg-black/20 outline-none"
      />

      <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl glow">
        Check Status
      </button>

      <div className="mt-6 space-y-2">
        <p>Name: John Doe</p>
        <p>Loan Amount: ₹5,00,000</p>
        <p>Status: Pending</p>
      </div>
    </div>
  );
}