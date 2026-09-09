// Calculator state: what's typed now, what was typed before, and the pending operator.
let currentOperand = "0";
let previousOperand = "";
let operation = null;

const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");

function updateDisplay() {
  resultEl.textContent = currentOperand;
  expressionEl.textContent = previousOperand
    ? `${previousOperand} ${operatorSymbol(operation) || ""}`
    : "";
}

function operatorSymbol(action) {
  return { add: "+", subtract: "−", multiply: "×", divide: "÷" }[action] || "";
}

function appendDigit(digit) {
  if (digit === "." && currentOperand.includes(".")) return;
  if (currentOperand === "0" && digit !== ".") {
    currentOperand = digit;
  } else {
    currentOperand += digit;
  }
}

function chooseOperation(nextOperation) {
  if (previousOperand !== "") {
    compute();
  }
  operation = nextOperation;
  previousOperand = currentOperand;
  currentOperand = "0";
}

function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case "add":
      result = prev + current;
      break;
    case "subtract":
      result = prev - current;
      break;
    case "multiply":
      result = prev * current;
      break;
    case "divide":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  // Round to avoid ugly floating point artifacts like 0.1 + 0.2 = 0.30000000000000004
  currentOperand = typeof result === "number" ? String(Math.round(result * 1e10) / 1e10) : result;
  previousOperand = "";
  operation = null;
}

function clearAll() {
  currentOperand = "0";
  previousOperand = "";
  operation = null;
}

function deleteLast() {
  currentOperand = currentOperand.length > 1 ? currentOperand.slice(0, -1) : "0";
}

function applyPercent() {
  currentOperand = String(parseFloat(currentOperand) / 100);
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { value, action } = button.dataset;

    if (value !== undefined) {
      appendDigit(value);
    } else if (action === "clear") {
      clearAll();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "percent") {
      applyPercent();
    } else if (action === "equals") {
      compute();
    } else {
      chooseOperation(action);
    }

    updateDisplay();
  });
});

// Keyboard support so students can type instead of clicking.
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") appendDigit(e.key);
  else if (e.key === ".") appendDigit(".");
  else if (e.key === "+") chooseOperation("add");
  else if (e.key === "-") chooseOperation("subtract");
  else if (e.key === "*") chooseOperation("multiply");
  else if (e.key === "/") { e.preventDefault(); chooseOperation("divide"); }
  else if (e.key === "Enter" || e.key === "=") compute();
  else if (e.key === "Backspace") deleteLast();
  else if (e.key === "Escape") clearAll();
  else return;

  updateDisplay();
});

updateDisplay();
