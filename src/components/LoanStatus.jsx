import React, { useState } from "react";

const LoanStatus = () => {
  const [loanId, setLoanId] = useState("");
  const [loan, setLoan] = useState(null);

  const checkLoanStatus = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/loan/${loanId}`
      );

      const data = await response.json();

      if (response.ok) {
        setLoan(data);
      } else {
        alert("Loan not found");
        setLoan(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Loan Status</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          className="p-3 w-full rounded-xl bg-white border border-gray-300 text-gray-900 outline-none"
        />

        <button
          onClick={checkLoanStatus}
          className="bg-pink-500 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
        >
          Check
        </button>
      </div>

      {loan && (
        <div className="mt-4 bg-gray-100 p-5 rounded-xl border border-gray-200">
          <h3 className="text-xl font-bold mb-3">Loan Details</h3>

          <p><strong>Loan ID:</strong> {loan.id}</p>
          <p><strong>Customer:</strong> {loan.customer_name || loan.customer}</p>
          <p><strong>Amount:</strong> ₹{loan.amount}</p>
          <p><strong>Status:</strong> {loan.status}</p>
        </div>
      )}
    </div>
  );
};

export default LoanStatus;