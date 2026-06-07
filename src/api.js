const API_URL = "http://127.0.0.1:8000";

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`);
  return res.json();
}

export async function getLoans() {
  const res = await fetch(`${API_URL}/loans`);
  return res.json();
}

export async function getAnalytics() {
  const res = await fetch(`${API_URL}/ai-analytics`);
  return res.json();
}

export async function getNotifications() {
  const res = await fetch(`${API_URL}/notifications`);
  return res.json();
}

export async function getSettings() {
  const res = await fetch(`${API_URL}/settings`);
  return res.json();
}

export async function saveQuickAction(action, loanId, note) {
  const res = await fetch(`${API_URL}/quick-action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    action_type: action,
    loan_id: loanId,
    note: note,
}),
  });

  return res.json();
}

export async function sendVoiceMessage(data) {
  const res = await fetch(`${API_URL}/voice-message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function endVoiceCall(data) {
  const res = await fetch(`${API_URL}/end-call`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getCallLogs() {
  const res = await fetch(`${API_URL}/call-logs`);
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.json();
}

export async function getCallAnalytics() {
  const res = await fetch(`${API_URL}/call-analytics`);
  return res.json();
}