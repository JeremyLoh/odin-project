let display = ""
const PRECISION = 9 

setup()

function setup() {
  const operands = document.querySelectorAll(".operands")
  operands.forEach((element) => element.addEventListener("click", operandOnClick))
  
  const operators = document.querySelectorAll(".operator")
  operators.forEach((element) => element.addEventListener("click", operatorOnClick))
  
  const negate = document.querySelector("#negate")
  negate.addEventListener("click", negateDisplayValue)

  const divideByHundred = document.querySelector("#divide-by-hundred")
  divideByHundred.addEventListener("click", handleDivideByHundred)

  const equals = document.querySelector("#equals")
  equals.addEventListener("click", evaluate)

  const reset = document.querySelector("#reset")
  reset.addEventListener("click", resetDisplay)

  const body = document.querySelector("body")
  body.addEventListener("keydown", handleKeyPress)

}

function handleKeyPress(event) {
  handleBackspaceKeyPress(event)
  handleDigitOrDecimalPress(event)
}

function handleBackspaceKeyPress(event) {
  if (event.key !== "Backspace" || display === "") {
    return
  }
  display = display.trim()
  display = display.slice(0, display.length - 1)
  refreshDisplay()
}

function handleDigitOrDecimalPress(event) {
  const digits = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  if (!digits.includes(event.key)) {
    return
  }
  display = (display + event.key).trim()
  refreshDisplay()
}

function operate(operator, x, y) {
  if (x === "" || y === "") {
    throw `Invalid Expression (x=${x}, y=${y}, operator=${operator}`
  }
  const left = isFloat(x) ? parseFloat(x) : parseInt(x)
  const right = isFloat(y) ? parseFloat(y) : parseInt(y)
  if (right === 0 && operator === "/") {
    alert("Division by zero is not valid")
    throw "Division by zero"
  } 
  // https://stackoverflow.com/questions/3612744/remove-insignificant-trailing-zeros-from-a-number
  if (operator === "/") {
    return Number((left / right).toFixed(PRECISION))
  } else if (operator === "X") {
    return Number((left * right).toFixed(PRECISION))
  } else if (operator === "+") {
    return Number((left + right).toFixed(PRECISION))
  } else if (operator === "-") {
    return Number((left - right).toFixed(PRECISION))
  }
}

function isFloat(number) {
  const value = parseFloat(number)
  return !isNaN(value)
}

function operandOnClick(event) {
  const value = event.target.textContent
  display = display === "0" && value !== "." ? value : display + value
  refreshDisplay()
}

function operatorOnClick(event) {
  const value = event.target.textContent
  const tokens = display.split(" ")
  if (tokens.length === 3) {
    // if there is existing valid equation, evaluate it and continue
    display = evaluateExpression(tokens)
  }
  display += " " + value + " "
  refreshDisplay()
}

function negateDisplayValue(event) {
  if (!display) {
    return
  }
  display = evaluateExpression([display, "X", "-1"])
  refreshDisplay()
}

function handleDivideByHundred(event) {
  if (display === "") {
    alert("(%): Please provide a number for division by 100")
    return
  }
  display = evaluateExpression([display, "/", "100"])
  refreshDisplay()
}

function evaluate(event) {
  const operators = ["+", "-", "/", "*"]
  const currentDisplayValue = document.querySelector("#display").textContent.trim()
  const isIncomplete = currentDisplayValue === "" || currentDisplayValue.split(" ").length < 3
  const isLastTokenOperator = operators.includes(currentDisplayValue.slice(-1))
  if (isIncomplete || isLastTokenOperator) {
    alert("Incomplete expression. Could not evaluate")
    display = "0"
    refreshDisplay()
    return
  }
  if (operators.includes(currentDisplayValue[0])) {
    // first value is operator, assume starting value is zero
    display = `0 ${currentDisplayValue}`
    refreshDisplay()
  }

  const tokens = currentDisplayValue.split(" ")
  if (tokens.length < 3) {
    return
  } else if (tokens.length === 3) {
    display = evaluateExpression(tokens)
  } else {
    const rest = display.slice(3).join("")
    display = evaluateExpression(tokens.slice(0, 3)) + rest
  }
  refreshDisplay()
}

function evaluateExpression(tokens) {
  try {
    const result = operate(tokens[1], tokens[0], tokens[2])
    return "" + result
  } catch (error) {
    return ""
  }
}

function resetDisplay() {
  display = ""
  refreshDisplay()
}

function refreshDisplay() {
  const container = document.querySelector("#display")
  container.textContent = display
  disableMultipleDecimal()
}

function disableMultipleDecimal() {
  const decimal = document.querySelector("#decimal")
  if (display.split(" ").pop().includes(".")) {
    // last argument of display contains decimal point
    decimal.classList.add("disabled")
  } else {
    decimal.classList.remove("disabled")
  }
}