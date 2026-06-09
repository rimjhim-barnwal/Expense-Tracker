// frontend/js/app.js
// ──────────────────
// Orchestrates the UI: table rendering, modal, CRUD actions, filters.

// ── State ────────────────────────────────────────────────────────────────────
let allExpenses = [];

// ── DOM refs ─────────────────────────────────────────────────────────────────
const tbody          = document.getElementById("expenseTableBody");
const modalOverlay   = document.getElementById("modalOverlay");
const modalTitle     = document.getElementById("modalTitle");
const openModalBtn   = document.getElementById("openModalBtn");
const closeModalBtn  = document.getElementById("closeModalBtn");
const cancelBtn      = document.getElementById("cancelBtn");
const saveBtn        = document.getElementById("saveBtn");
const formError      = document.getElementById("formError");
const searchInput    = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Form fields
const fId       = document.getElementById("editId");
const fTitle    = document.getElementById("fTitle");
const fAmount   = document.getElementById("fAmount");
const fDate     = document.getElementById("fDate");
const fCategory = document.getElementById("fCategory");
const fNotes    = document.getElementById("fNotes");

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = n => "₹" + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
const fmtDate = d => new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

function showError(msg) {
  formError.textContent = msg;
  formError.style.display = "block";
}
function clearError() { formError.style.display = "none"; }

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// ── Modal control ─────────────────────────────────────────────────────────────

function openModal(expense = null) {
  clearError();
  if (expense) {
    modalTitle.textContent = "Edit Expense";
    fId.value       = expense.id;
    fTitle.value    = expense.title;
    fAmount.value   = expense.amount;
    fDate.value     = expense.date?.split("T")[0] ?? todayISO();
    fCategory.value = expense.category;
    fNotes.value    = expense.notes || "";
  } else {
    modalTitle.textContent = "Add Expense";
    fId.value       = "";
    fTitle.value    = "";
    fAmount.value   = "";
    fDate.value     = todayISO();
    fCategory.value = "Food";
    fNotes.value    = "";
  }
  modalOverlay.classList.add("open");
  fTitle.focus();
}

function closeModal() { modalOverlay.classList.remove("open"); }

openModalBtn.addEventListener("click",  () => openModal());
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click",     closeModal);
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) closeModal();
});

// ── Save (create or update) ───────────────────────────────────────────────────

saveBtn.addEventListener("click", async () => {
  clearError();
  const data = {
    title:    fTitle.value.trim(),
    amount:   fAmount.value,
    category: fCategory.value,
    date:     fDate.value,
    notes:    fNotes.value.trim(),
  };

  if (!data.title)  return showError("Title is required.");
  if (!data.amount) return showError("Amount is required.");
  if (!data.date)   return showError("Date is required.");

  saveBtn.disabled = true;
  saveBtn.textContent = "Saving…";

  try {
    let res;
    if (fId.value) {
      res = await Api.update(fId.value, data);
    } else {
      res = await Api.create(data);
    }

    if (!res.success) {
      showError(res.message || "Something went wrong.");
    } else {
      closeModal();
      await loadAll();
    }
  } catch {
    showError("Network error. Is the server running?");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Save Expense";
  }
});

// ── Delete ────────────────────────────────────────────────────────────────────

async function deleteExpense(id) {
  if (!confirm("Delete this expense?")) return;
  try {
    await Api.delete(id);
    await loadAll();
  } catch {
    alert("Delete failed. Please try again.");
  }
}

// ── Table rendering ───────────────────────────────────────────────────────────

function renderTable(expenses) {
  if (!expenses.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No expenses found.</td></tr>`;
    return;
  }
  tbody.innerHTML = expenses.map((e, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${e.title}</td>
      <td>${fmt(e.amount)}</td>
      <td><span class="badge badge-${e.category}">${e.category}</span></td>
      <td>${fmtDate(e.date)}</td>
      <td>
        <button class="action-btn edit" onclick="openModal(allExpenses.find(x=>x.id===${e.id}))">✏️</button>
        <button class="action-btn del"  onclick="deleteExpense(${e.id})">🗑️</button>
      </td>
    </tr>
  `).join("");
}

// ── Filters ───────────────────────────────────────────────────────────────────

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const cat    = categoryFilter.value;
  const filtered = allExpenses.filter(e => {
    const matchText = e.title.toLowerCase().includes(search);
    const matchCat  = !cat || e.category === cat;
    return matchText && matchCat;
  });
  renderTable(filtered);
}

searchInput.addEventListener("input",    applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// ── KPI update ────────────────────────────────────────────────────────────────

async function updateKPIs() {
  const res = await Api.stats();
  if (!res.success) return;
  const s = res.data;
  document.getElementById("kpiTotal").textContent   = fmt(s.total_all_time   || 0);
  document.getElementById("kpiMonth").textContent   = fmt(s.total_this_month || 0);
  document.getElementById("kpiToday").textContent   = fmt(s.total_today      || 0);
  document.getElementById("kpiHighest").textContent = fmt(s.highest_expense  || 0);
}

// ── Load everything ───────────────────────────────────────────────────────────

async function loadAll() {
  try {
    const res = await Api.getAll();
    allExpenses = res.success ? res.data : [];
    applyFilters();
    await Promise.all([updateKPIs(), refreshCharts()]);
  } catch {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">
      ⚠️ Could not connect to server. Make sure the backend is running.
    </td></tr>`;
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────────
loadAll();
