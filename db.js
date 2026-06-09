// frontend/js/charts.js
// ─────────────────────
// Initialises and updates Chart.js instances.

let monthlyChart = null;
let categoryChart = null;

const CHART_DEFAULTS = {
  color: "#e8eaf6",
  grid:  "rgba(255,255,255,.07)",
  font:  { family: "'Segoe UI', system-ui, sans-serif", size: 12 },
};

const PALETTE = [
  "#6c63ff","#22c55e","#f59e0b","#ef4444","#06b6d4",
  "#a855f7","#f97316","#14b8a6","#64748b",
];

// ── Monthly Bar Chart ────────────────────────────────────────────────────────
function renderMonthlyChart(data) {
  const ctx = document.getElementById("monthlyChart").getContext("2d");
  if (monthlyChart) monthlyChart.destroy();

  monthlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels:   data.map(d => d.label),
      datasets: [{
        label:           "Spending (₹)",
        data:            data.map(d => d.total),
        backgroundColor: "#6c63ff99",
        borderColor:     "#6c63ff",
        borderWidth:     2,
        borderRadius:    6,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: CHART_DEFAULTS.color, font: CHART_DEFAULTS.font } },
        tooltip: {
          callbacks: {
            label: ctx => `₹${Number(ctx.parsed.y).toLocaleString("en-IN")}`,
          },
        },
      },
      scales: {
        x: { ticks: { color: CHART_DEFAULTS.color }, grid: { color: CHART_DEFAULTS.grid } },
        y: {
          ticks: {
            color: CHART_DEFAULTS.color,
            callback: v => "₹" + Number(v).toLocaleString("en-IN"),
          },
          grid: { color: CHART_DEFAULTS.grid },
        },
      },
    },
  });
}

// ── Category Doughnut Chart ──────────────────────────────────────────────────
function renderCategoryChart(data) {
  const ctx = document.getElementById("categoryChart").getContext("2d");
  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels:   data.map(d => d.category),
      datasets: [{
        data:            data.map(d => d.total),
        backgroundColor: PALETTE,
        borderWidth:     2,
        borderColor:     "#1a1d27",
      }],
    },
    options: {
      responsive: true,
      cutout: "65%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: CHART_DEFAULTS.color, font: CHART_DEFAULTS.font, padding: 12 },
        },
        tooltip: {
          callbacks: {
            label: ctx => ` ₹${Number(ctx.parsed).toLocaleString("en-IN")}`,
          },
        },
      },
    },
  });
}

// ── Public refresh function ──────────────────────────────────────────────────
async function refreshCharts() {
  const [monthly, category] = await Promise.all([Api.monthly(), Api.category()]);
  if (monthly.success)  renderMonthlyChart(monthly.data);
  if (category.success) renderCategoryChart(category.data);
}
