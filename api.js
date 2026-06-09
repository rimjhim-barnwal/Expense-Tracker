/* frontend/css/style.css */
/* ──────────────────────── */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0f1117;
  --surface:   #1a1d27;
  --surface2:  #22263a;
  --border:    #2e3350;
  --text:      #e8eaf6;
  --muted:     #8b92b8;
  --primary:   #6c63ff;
  --primary-h: #574fd6;
  --green:     #22c55e;
  --orange:    #f59e0b;
  --red:       #ef4444;
  --radius:    12px;
  --shadow:    0 4px 20px rgba(0,0,0,.4);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 15px;
  min-height: 100vh;
}

/* ── HEADER ──────────────────────────────────────────── */
.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 14px 0;
  position: sticky; top: 0; z-index: 100;
}
.header-inner {
  max-width: 1200px; margin: auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo { font-size: 1.4rem; font-weight: 700; letter-spacing: -.5px; }

/* ── BUTTONS ─────────────────────────────────────────── */
.btn {
  padding: 9px 20px; border: none; border-radius: 8px;
  font-size: 14px; font-weight: 600; cursor: pointer; transition: .15s;
}
.btn-primary  { background: var(--primary); color: #fff; }
.btn-primary:hover { background: var(--primary-h); }
.btn-outline  { background: transparent; border: 1px solid var(--border); color: var(--text); }
.btn-outline:hover { background: var(--surface2); }
.btn-danger   { background: transparent; border: 1px solid var(--red); color: var(--red); }
.btn-danger:hover { background: var(--red); color: #fff; }

/* ── CONTAINER ───────────────────────────────────────── */
.container { max-width: 1200px; margin: auto; padding: 28px 24px; }

/* ── KPI CARDS ───────────────────────────────────────── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px; margin-bottom: 28px;
}
.kpi-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 20px 24px;
  display: flex; flex-direction: column; gap: 6px;
  border-left: 4px solid var(--primary);
}
.kpi-card.accent-green  { border-left-color: var(--green); }
.kpi-card.accent-orange { border-left-color: var(--orange); }
.kpi-card.accent-red    { border-left-color: var(--red); }
.kpi-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .6px; }
.kpi-value { font-size: 1.8rem; font-weight: 700; }

/* ── CHARTS ──────────────────────────────────────────── */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; margin-bottom: 28px;
}
@media (max-width: 720px) { .charts-row { grid-template-columns: 1fr; } }
.chart-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 20px;
}
.chart-title { font-size: 14px; font-weight: 600; margin-bottom: 16px; color: var(--muted); }

/* ── TABLE SECTION ───────────────────────────────────── */
.table-section {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
}
.table-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; border-bottom: 1px solid var(--border);
  flex-wrap: wrap; gap: 12px;
}
.table-header h2 { font-size: 1rem; font-weight: 600; }
.filter-row { display: flex; gap: 10px; }
.input-sm {
  background: var(--surface2); border: 1px solid var(--border);
  color: var(--text); border-radius: 8px; padding: 7px 12px;
  font-size: 13px; outline: none;
}
.input-sm:focus { border-color: var(--primary); }
.table-wrapper { overflow-x: auto; }
.expense-table {
  width: 100%; border-collapse: collapse;
}
.expense-table th, .expense-table td {
  padding: 12px 24px; text-align: left;
}
.expense-table thead th {
  background: var(--surface2); font-size: 12px;
  color: var(--muted); text-transform: uppercase; letter-spacing: .5px;
}
.expense-table tbody tr { border-bottom: 1px solid var(--border); }
.expense-table tbody tr:last-child { border-bottom: none; }
.expense-table tbody tr:hover { background: var(--surface2); }
.empty-state { text-align: center; color: var(--muted); padding: 40px !important; }

/* Category badge */
.badge {
  display: inline-block; padding: 3px 10px;
  border-radius: 20px; font-size: 12px; font-weight: 600;
}
.badge-Food          { background:#fef3c7; color:#92400e; }
.badge-Transport     { background:#dbeafe; color:#1e40af; }
.badge-Shopping      { background:#fce7f3; color:#9d174d; }
.badge-Entertainment { background:#ede9fe; color:#5b21b6; }
.badge-Health        { background:#d1fae5; color:#065f46; }
.badge-Education     { background:#e0f2fe; color:#0c4a6e; }
.badge-Utilities     { background:#f3f4f6; color:#374151; }
.badge-Rent          { background:#fee2e2; color:#991b1b; }
.badge-Other         { background:#f9fafb; color:#6b7280; }

/* action buttons in table */
.action-btn {
  background: none; border: none; cursor: pointer;
  padding: 4px 8px; border-radius: 6px; font-size: 14px;
}
.action-btn.edit  { color: var(--primary); }
.action-btn.edit:hover  { background: rgba(108,99,255,.15); }
.action-btn.del   { color: var(--red); }
.action-btn.del:hover   { background: rgba(239,68,68,.15); }

/* ── MODAL ───────────────────────────────────────────── */
.modal-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,.7); backdrop-filter: blur(4px);
  z-index: 200; align-items: center; justify-content: center;
}
.modal-overlay.open { display: flex; }
.modal {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 16px; width: 100%; max-width: 460px;
  margin: 16px; box-shadow: var(--shadow);
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 24px; border-bottom: 1px solid var(--border);
}
.modal-header h3 { font-size: 1.1rem; }
.modal-close {
  background: none; border: none; color: var(--muted);
  font-size: 18px; cursor: pointer;
}
.modal-body { padding: 24px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; background: var(--surface2); border: 1px solid var(--border);
  color: var(--text); border-radius: 8px; padding: 9px 12px;
  font-size: 14px; outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: var(--primary); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-error { color: var(--red); font-size: 13px; margin-bottom: 12px; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 8px; }
