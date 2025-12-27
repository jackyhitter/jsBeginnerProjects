document.addEventListener("DOMContentLoaded", main);
function main() {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  const loadStyle = document.getElementById("loadStyle");

  //dynamically adding the stylesheet
  loadStyle.addEventListener("click", () => {
    const exitsting = document.getElementById("dynamic-styling");
    if (!exitsting) {
      const link = document.createElement("link");
      link.id = "dynamic-styling";
      link.href = "styles.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      console.log("Stylesheet loaded", link);
    } else {
      setTimeout(() => {
        alert("Stylesheet loaded successfully");
      }, 50);
      exitsting.remove(link);
    }
  });
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateAmount();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputName = expenseNameInput.value.trim();
    const inputAmount = Number(expenseAmountInput.value.trim());
    if (inputName !== "" && !isNaN(inputAmount) && inputAmount > 0) {
      const inputObject = {
        id: Date.now(),
        name: inputName,
        amount: inputAmount,
      };
      expenses.push(inputObject);
      saveLocal();
      renderExpense();
      updateTotal();
      //clear the input
      expenseAmountInput.value = "";
      expenseNameInput.value = "";
    }
  });

  function renderExpense() {
    expenseList.innerHTML = "";
    expenses.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - $${item.amount}
        <button data-id="${item.id}">Delete</button>
        `;
      expenseList.appendChild(li);
    });
  }

  function saveLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateAmount() {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateAmount();
    totalAmountDisplay.textContent = totalAmount;
  }
  renderExpense();
  updateTotal();

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const deleteId = Number(e.target.dataset.id);
      console.log(deleteId);
      expenses = expenses.filter(t => t.id !== deleteId);
      saveLocal();
      updateTotal();
      renderExpense();
    }
  });
}
