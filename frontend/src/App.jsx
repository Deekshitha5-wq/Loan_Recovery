import { useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [res, setRes] = useState("");

  const send = async () => {
    const response = await fetch("http://127.0.0.1:8000/process-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: 1,
        message: msg
      })
    });

    const data = await response.json();
    setRes(JSON.stringify(data));
  };

  return (
    <div>
      <h2>Loan Recovery Agent</h2>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
      <p>{res}</p>
    </div>
  );
}

export default App;