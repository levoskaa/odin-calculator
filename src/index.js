class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
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
