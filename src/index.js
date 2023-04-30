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

function add(...numbers) {
  const containsNaN = numbers.some((number) => !isNumber(number));
  if (containsNaN) {
    throw new InvalidArgumentError("Input contains non-numeric values");
  }
  const sum = numbers.reduce((sum, number) => sum + number);
  return sum;
}

function subtract(minuend, subtrahend) {
  const inputIsNaN = !isNumber(minuend) || !isNumber(subtrahend);
  if (inputIsNaN) {
    throw new InvalidArgumentError("Input contains non-numeric values");
  }
  const result = minuend - subtrahend;
  return result;
}
