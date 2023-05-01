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

function isNumber(value) {
  const isNumber = typeof value === "number";
  return isNumber;
}

function validateNumberValues(...values) {
  const containsNaN = values.some((value) => !isNumber(value));
  if (containsNaN) {
    throw new InvalidArgumentError("Input contains non-numeric values");
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
      return subtract(operand1, operand1);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      return divide(operand1, operand2);
    default:
      throw new InvalidArgumentError(`${operator} is not a valid operator`);
  }
}

function onButtonClick() {
  const value = this.dataset.value;
  const isNumber = !isNaN(value);
  if (isNumber) {
    onNumberClick(value);
  }
}

// TODO: handle overflow in the display
function onNumberClick(digit) {
  if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue += digit;
  }
  display.textContent = displayValue;
}

let displayValue = "0";
let operand2;
let operator;

const buttons = document.querySelectorAll(".calculator__button");
const display = document.querySelector(".calculator__display");

buttons.forEach((button) => button.addEventListener("click", onButtonClick));
