import { useEffect, useState } from "react";
import { getLoans } from "../api";

export default function Loans() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const data = await getLoans();
    setLoans(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Loans
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {loans.map((loan) => (
          <div
            key={loan.id}
            className="bg-white shadow-md border border-gray-200 p-6 rounded-2xl"
          >
            <h2 className="text-2xl font-bold">
              {loan.customer}
            </h2>

            <p className="mt-3">
              Amount: ₹{loan.amount}
            </p>

            <p>Status: {loan.status}</p>
          </div>
        ))}

      </div>
    </div>
  );
}