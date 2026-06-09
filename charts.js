<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Expense Tracker</title>
  <link rel="stylesheet" href="css/style.css" />
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body>

<!-- ── HEADER ──────────────────────────────────────────────────────────── -->
<header class="header">
  <div class="header-inner">
    <h1 class="logo">💸 Expense Tracker</h1>
    <button class="btn btn-primary" id="openModalBtn">+ Add Expense</button>
  </div>
</header>

<!-- ── MAIN ────────────────────────────────────────────────────────────── -->
<main class="container">

  <!-- KPI Cards -->
  <section class="kpi-grid">
    <div class="kpi-card">
      <span class="kpi-label">Total (All Time)</span>
      <span class="kpi-value" id="kpiTotal">₹0</span>
    </div>
    <div class="kpi-card accent-green">
      <span class="kpi-label">This Month</span>
      <span class="kpi-value" id="kpiMonth">₹0</span>
    </div>
    <div class="kpi-card accent-orange">
      <span class="kpi-label">Today</span>
      <span class="kpi-value" id="kpiToday">₹0</span>
    </div>
    <div class="kpi-card accent-red">
      <span class="kpi-label">Highest Expense</span>
      <span class="kpi-value" id="kpiHighest">₹0</span>
    </div>
  </section>

  <!-- Charts Row -->
  <section class="charts-row">
    <div class="chart-card">
      <h2 class="chart-title">Monthly Spending</h2>
      <canvas id="monthlyChart"></canvas>
    </div>
    <div class="chart-card">
      <h2 class="chart-title">Category Breakdown</h2>
      <canvas id="categoryChart"></canvas>
    </div>
  </section>

  <!-- Filter & Table -->
  <section class="table-section">
    <div class="table-header">
      <h2>All Expenses</h2>
      <div class="filter-row">
        <input type="text" id="searchInput" placeholder="Search…" class="input-sm" />
        <select id="categoryFilter" class="input-sm">
          <option value="">All Categories</option>
          <option>Food</option><option>Transport</option><option>Shopping</option>
          <option>Entertainment</option><option>Health</option><option>Education</option>
          <option>Utilities</option><option>Rent</option><option>Other</option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="expense-table">
        <thead>
          <tr>
            <th>#</th><th>Title</th><th>Amount</th>
            <th>Category</th><th>Date</th><th>Actions</th>
          </tr>
        </thead>
        <tbody id="expenseTableBody">
          <tr><td colspan="6" class="empty-state">Loading…</td></tr>
        </tbody>
      </table>
    </div>
  </section>

</main>

<!-- ── ADD / EDIT MODAL ─────────────────────────────────────────────────── -->
<div class="modal-overlay" id="modalOverlay">
  <div class="modal">
    <div class="modal-header">
      <h3 id="modalTitle">Add Expense</h3>
      <button class="modal-close" id="closeModalBtn">✕</button>
    </div>
    <div class="modal-body">
      <input type="hidden" id="editId" />

      <div class="form-group">
        <label>Title *</label>
        <input type="text" id="fTitle" placeholder="e.g. Grocery Shopping" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Amount (₹) *</label>
          <input type="number" id="fAmount" placeholder="0.00" min="0.01" step="0.01" />
        </div>
        <div class="form-group">
          <label>Date *</label>
          <input type="date" id="fDate" />
        </div>
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="fCategory">
          <option>Food</option><option>Transport</option><option>Shopping</option>
          <option>Entertainment</option><option>Health</option><option>Education</option>
          <option>Utilities</option><option>Rent</option><option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label>Notes</label>
        <textarea id="fNotes" rows="2" placeholder="Optional notes…"></textarea>
      </div>

      <div id="formError" class="form-error" style="display:none;"></div>

      <div class="modal-actions">
        <button class="btn btn-outline" id="cancelBtn">Cancel</button>
        <button class="btn btn-primary" id="saveBtn">Save Expense</button>
      </div>
    </div>
  </div>
</div>

<script src="js/api.js"></script>
<script src="js/charts.js"></script>
<script src="js/app.js"></script>
</body>
</html>
