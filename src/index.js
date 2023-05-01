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

let operand1;
let operand2;
let operator;
