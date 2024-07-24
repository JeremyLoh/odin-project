// a calculator object that contains functions for basic operations

import Calculator from "./calculator"

// each operation should take two numbers and return the correct calculation
describe("calculator", () => {
  test("is defined", () => {
    expect(Calculator).toBeDefined()
  })

  describe("add(x,y)", () => {
    test("add zero returns same number", () => {
      const calculator = new Calculator()
      expect(calculator.add(0, 2)).toBe(2)
      expect(calculator.add(-0, 2)).toBe(2)
    })

    test("add two positive integer returns positive integer", () => {
      const calculator = new Calculator()
      expect(calculator.add(1, 2)).toBe(3)
    })

    test("add two negative integers", () => {
      const calculator = new Calculator()
      expect(calculator.add(-1, -2)).toBe(-3)
    })
  })

  describe("subtract(x,y)", () => {
    test("subtract zero returns same number", () => {
      const calculator = new Calculator()
      expect(calculator.subtract(4, 0)).toBe(4)
      expect(calculator.subtract(0, 4)).toBe(-4)
      expect(calculator.subtract(0, 0)).toBe(0)
    })

    test("subtract negative number", () => {
      const calculator = new Calculator()
      expect(calculator.subtract(1, -5)).toBe(6)
      expect(calculator.subtract(-1, -5)).toBe(4)
      expect(calculator.subtract(-1, 2)).toBe(-3)
    })

    test("subtract positive number", () => {
      const calculator = new Calculator()
      expect(calculator.subtract(10, 8)).toBe(2)
      expect(calculator.subtract(10, 18)).toBe(-8)
    })
  })

  describe("divide(x,y)", () => {
    test("divide by zero throws error", () => {
      const calculator = new Calculator()
      expect(() => calculator.divide(1, 0)).toThrow(
        "Division by zero not allowed"
      )
      expect(() => calculator.divide(0, 0)).toThrow(
        "Division by zero not allowed"
      )
    })

    test("divide by positive integer", () => {
      const calculator = new Calculator()
      expect(calculator.divide(8, 2)).toBe(4)
    })

    test("divide by negative integer", () => {
      const calculator = new Calculator()
      expect(calculator.divide(8, -2)).toBe(-4)
    })
  })

  describe("multiply(x,y)", () => {
    test("multiply by zero returns zero", () => {
      const calculator = new Calculator()
      expect(calculator.multiply(3, 0)).toBe(0)
      expect(calculator.multiply(0, 3)).toBe(0)
      expect(calculator.multiply(0, 0)).toBe(0)
    })

    test("multiply by one returns same number", () => {
      const calculator = new Calculator()
      expect(calculator.multiply(3, 1)).toBe(3)
      expect(calculator.multiply(1, 5)).toBe(5)
    })

    test("multiply positive numbers", () => {
      const calculator = new Calculator()
      expect(calculator.multiply(3, 50)).toBe(150)
    })

    test("multiply negative numbers", () => {
      const calculator = new Calculator()
      expect(calculator.multiply(-3, -50)).toBe(150)
      expect(calculator.multiply(-3, 50)).toBe(-150)
      expect(calculator.multiply(3, -50)).toBe(-150)
    })
  })
})
