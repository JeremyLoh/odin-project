export default class Calculator {
  add(x, y) {
    return x + y
  }

  subtract(x, y) {
    return x - y
  }

  divide(x, y) {
    if (y === 0) {
      throw new Error("Division by zero not allowed")
    }
    return x / y
  }

  multiply(x, y) {
    return x * y
  }
}
