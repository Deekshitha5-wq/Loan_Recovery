export default function Loans() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Loans
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Active Loans
          <h2 className="text-4xl font-bold mt-3">
            320
          </h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Paid Loans
          <h2 className="text-4xl font-bold mt-3">
            930
          </h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-2xl">
          Defaulted
          <h2 className="text-4xl font-bold mt-3">
            14
          </h2>
        </div>
      </div>
    </div>
  );
}