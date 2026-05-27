export default function LoanStatus() {
  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Loan Status
      </h1>

      <input
        placeholder="Enter Loan ID"
        className="w-full p-3 rounded-xl bg-[#111827] outline-none"
      />

      <button className="w-full mt-4 bg-pink-500 p-3 rounded-xl">
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