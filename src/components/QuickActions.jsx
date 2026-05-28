import { useState } from "react";
import { saveQuickAction } from "../api";

export default function QuickActions() {
  const [loanId, setLoanId] = useState("");
  const [note, setNote] = useState("");

  const handleAction = async (action) => {
    const data = await saveQuickAction(
      action,
      loanId,
      note
    );

    alert(data.message);

    setLoanId("");
    setNote("");
  };

  return (
    <div className="bg-[#1F2937] p-6 rounded-2xl">

      <h1 className="text-2xl font-bold mb-6">
        Quick Actions
      </h1>

      <input
        type="text"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#111827] mb-4 outline-none"
      />

      <textarea
        placeholder="Add Notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 rounded-xl bg-[#111827] mb-6 outline-none"
      />

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() =>
            handleAction("Send Reminder")
          }
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Send Reminder
        </button>

        <button
          onClick={() =>
            handleAction("Mark as Paid")
          }
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Mark as Paid
        </button>

        <button
          onClick={() =>
            handleAction("Add Notes")
          }
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Add Notes
        </button>

        <button
          onClick={() =>
            handleAction("Generate Report")
          }
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Generate Report
        </button>

      </div>
    </div>
  );
}