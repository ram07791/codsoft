let display = document.getElementById("display");
let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

function appendNumber(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if ("+-*/".includes(currentInput.slice(-1))) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  updateDisplay();
}

function toggleSign() {
  if (currentInput.startsWith("-")) {
    currentInput = currentInput.slice(1);
  } else {
    currentInput = "-" + currentInput;
  }
  updateDisplay();
}

function percentage() {
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay();
}

function calculate() {
  try {
    currentInput = String(eval(currentInput));
  } catch {
    currentInput = "Error";
  }
  updateDisplay();
}
