const customers = [
  {
    name: "Rahul Sharma",
    amount: "₹2,50,000",
    status: "Pending",
  },
  {
    name: "Priya Verma",
    amount: "₹4,00,000",
    status: "Paid",
  },
];

export default function Customers() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="bg-[#1F2937] p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {customer.name}
            </h2>

            <p className="mt-3">
              Loan: {customer.amount}
            </p>

            <p>Status: {customer.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}