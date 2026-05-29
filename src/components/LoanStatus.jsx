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

      setLoan(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Loan Status</h2>

      <input
        type="text"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          color: "black",
          backgroundColor: "white",
        }}
      />

      <button
        onClick={checkLoanStatus}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Check Status
      </button>

      {loan && (
        <div
          style={{
            marginTop: "20px",
            background: "#1e293b",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Loan Details</h3>

          <p>
            <strong>Loan ID:</strong> {loan.id}
          </p>

          <p>
            <strong>Customer:</strong> {loan.customer}
          </p>

          <p>
            <strong>Amount:</strong> ₹{loan.amount}
          </p>

          <p>
            <strong>Status:</strong> {loan.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoanStatus;