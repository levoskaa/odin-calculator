class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
  }
}

function add(...numbers) {
  const containsNaN = numbers.some((number) => typeof number !== "number");
  if (containsNaN) {
    throw new InvalidArgumentError("Input contains non-numeric values");
  }
  const sum = numbers.reduce((sum, number) => sum + number);
  return sum;
}
