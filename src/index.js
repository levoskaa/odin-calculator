class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}

class DivideByZeroError extends Error {
  constructor(message) {
    super(message);
    this.name = "DivideByZeroError";
  }
}

class ButtonType {
  static Number = new ButtonType();
  static ArithmeticOperator = new ButtonType();
  static EqualOperator = new ButtonType();
}

function isNumeric(value) {
  if (typeof value !== "number" && typeof value !== "string") {
    return false;
  }
  const isNumeric = value !== "" && !isNaN(value);
  return isNumeric;
}

function validateNumberValues(...values) {
  const containsNaN = values.some((value) => typeof value !== "number");
  if (containsNaN) {
    throw new InvalidArgumentError("Input contains non-number values");
  }
}

function add(...numbers) {
  validateNumberValues(...numbers);
  const sum = numbers.reduce((sum, number) => sum + number);
  return sum;
}

function subtract(minuend, subtrahend) {
  validateNumberValues(minuend, subtrahend);
  const result = minuend - subtrahend;
  return result;
}

function multiply(...numbers) {
  validateNumberValues(...numbers);
  const product = numbers.reduce((product, number) => product * number);
  return product;
}

function divide(dividend, divisor) {
  validateNumberValues(dividend, divisor);
  if (divisor === 0) {
    throw new DivideByZeroError();
  }
  const quotient = dividend / divisor;
  return quotient;
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      return divide(operand1, operand2);
    default:
      throw new InvalidArgumentError(`${operator} is not a valid operator`);
  }
}

function onNumberInput(digit) {
  if (displayShouldReset) {
    doDisplayValue(digit);
    displayShouldReset = false;
  } else {
    doDisplayValue(displayValue + digit);
  }
  lastButtonPressed = ButtonType.Number;
}

function onArithmeticOperatorInput(operator) {
  if (hasErrored()) {
    return;
  }
  if (lastButtonPressed === ButtonType.ArithmeticOperator) {
    // If arithmetic operations are pressed one after the other,
    // then just update the operator to the latest one
    savedOperator = operator;
    return;
  }
  if (savedOperator) {
    // If there is an operation that was not finalized, then we calculate
    // its result now to reuse it in later operations
    const activeOperand = +displayValue;
    const result = operate(savedOperator, savedOperand, activeOperand);
    doDisplayValue(result);
    savedOperand = result;
  } else {
    savedOperand = +displayValue;
  }
  savedOperator = operator;
  displayShouldReset = true;
  lastButtonPressed = ButtonType.ArithmeticOperator;
}

function onEqualOperatorInput() {
  // Use non-strict equality check to check for both undefined and null
  const cannotCalculate =
    lastButtonPressed !== ButtonType.Number ||
    savedOperand == null ||
    savedOperator == null;
  if (cannotCalculate) {
    return;
  }
  const activeOperand = +displayValue;
  let result;
  try {
    result = operate(savedOperator, savedOperand, activeOperand);
  } catch (e) {
    result = "Err";
  }
  doDisplayValue(result);
  displayShouldReset = true;
  savedOperator = null;
  savedOperand = null;
  lastButtonPressed = ButtonType.EqualOperator;
}

function doDisplayValue(value) {
  if (isNumeric(value)) {
    value = trimNumber(value, CHARACTER_LIMIT);
  }
  displayValue = value;
  display.textContent = displayValue;
}

function trimNumber(number, characterLimit) {
  // Use parseFloat to remove leading zeros
  const trimmed = parseFloat(number);
  const length = trimmed.toString().length;
  if (length <= characterLimit) {
    return trimmed.toString();
  }
  return trimmed.toExponential(5);
}

function clear() {
  displayValue = "0";
  doDisplayValue(displayValue);
  savedOperand = null;
  savedOperator = null;
  displayShouldReset = true;
  lastButtonPressed = null;
}

function hasErrored() {
  return displayValue === "Err";
}

const ARITHMETIC_OPERATIONS = ["+", "-", "*", "/"];
const CHARACTER_LIMIT = 14;

let displayValue = "0";
let savedOperand;
let savedOperator;
let displayShouldReset = true;
let lastButtonPressed;

const buttons = Array.from(document.querySelectorAll(".calculator__button"));
const numberButtons = buttons.filter((button) =>
  isNumeric(button.dataset.value)
);
const arithmeticButtons = buttons.filter((button) =>
  ARITHMETIC_OPERATIONS.includes(button.dataset.value)
);
const equalButton = buttons.find((button) => button.dataset.value === "=");
const clearButton = buttons.find((button) => button.dataset.value === "C");
const display = document.querySelector(".calculator__display");

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (e) =>
    onNumberInput(e.currentTarget.dataset.value)
  );
});
arithmeticButtons.forEach((arithmeticButton) => {
  arithmeticButton.addEventListener("click", (e) =>
    onArithmeticOperatorInput(e.currentTarget.dataset.value)
  );
});
equalButton.addEventListener("click", onEqualOperatorInput);
clearButton.addEventListener("click", clear);
