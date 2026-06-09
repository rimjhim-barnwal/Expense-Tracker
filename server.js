// frontend/js/api.js
// ──────────────────
// Centralised fetch wrapper. All API calls go through here.

const BASE = "/api/expenses";

const Api = {
  // Fetch all expenses
  getAll: () => fetch(BASE).then(r => r.json()),

  // Fetch one expense
  getOne: (id) => fetch(`${BASE}/${id}`).then(r => r.json()),

  // Create a new expense
  create: (data) => fetch(BASE, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  }).then(r => r.json()),

  // Update an existing expense
  update: (id, data) => fetch(`${BASE}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  }).then(r => r.json()),

  // Delete an expense
  delete: (id) => fetch(`${BASE}/${id}`, { method: "DELETE" }).then(r => r.json()),

  // Summary endpoints
  stats:    () => fetch(`${BASE}/summary/stats`).then(r => r.json()),
  monthly:  () => fetch(`${BASE}/summary/monthly`).then(r => r.json()),
  category: () => fetch(`${BASE}/summary/category`).then(r => r.json()),
};
