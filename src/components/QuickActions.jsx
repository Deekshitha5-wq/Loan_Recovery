import { useEffect, useState } from "react";
import { saveQuickAction } from "../api";

export default function QuickActions() {
  const [loanId, setLoanId] = useState("");
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/quick-actions");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAction = async (action) => {

  if (action === "Generate Report") {
    window.open(
      `http://127.0.0.1:8000/generate-report/${loanId}`,
      "_blank"
    );
    return;
  }

  const data = await saveQuickAction(
    action,
    loanId,
    note
  );

  alert(data.message);

  setLoanId("");
  setNote("");

  fetchHistory();
};

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Quick Actions
      </h1>

      <input
        type="text"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 mb-4 outline-none"
      />

      <textarea
        placeholder="Add Notes..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-3 rounded-xl bg-gray-100 border border-gray-300 mb-6 outline-none"
      />

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => handleAction("Send Reminder")}
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Send Reminder
        </button>

        <button
          onClick={() => handleAction("Mark as Paid")}
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Mark as Paid
        </button>

        <button
          onClick={() => handleAction("Add Notes")}
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Add Notes
        </button>

        <button
          onClick={() => handleAction("Generate Report")}
          className="bg-pink-500 p-4 rounded-xl hover:scale-105 transition"
        >
          Generate Report
        </button>

      </div>

      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">
          Quick Action History
        </h2>

        <div className="space-y-3">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-gray-100 p-4 rounded-xl border border-gray-200"
            >

              <p>
                <b>Loan ID:</b> {item.loan_id}
              </p>

              <p>
                <b>Action:</b> {item.action_type}
              </p>

              <p>
                <b>Note:</b> {item.note}
              </p>

              <p className="text-green-400">
                {item.status}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}