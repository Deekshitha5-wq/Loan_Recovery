export default function Customers() {
  return (
    <div className="glass p-6 rounded-3xl mt-6">
      <h2 className="text-3xl font-bold mb-6">Customers</h2>

      <div className="space-y-4">
        <div className="bg-black/30 p-4 rounded-2xl">
          <h3 className="font-bold">John Doe</h3>
          <p>Loan Amount: ₹5,00,000</p>
          <p>Status: Pending</p>
        </div>

        <div className="bg-black/30 p-4 rounded-2xl">
          <h3 className="font-bold">Priya Sharma</h3>
          <p>Loan Amount: ₹2,50,000</p>
          <p>Status: Paid</p>
        </div>

        <div className="bg-black/30 p-4 rounded-2xl">
          <h3 className="font-bold">Rahul Verma</h3>
          <p>Loan Amount: ₹8,20,000</p>
          <p>Status: Overdue</p>
        </div>
      </div>
    </div>
  );
}