function Cell(label) {
  this.label = label
  const getLabel = () => this.label
  const setLabel = (label) => this.label = label
  return { getLabel, setLabel }
}

const GameBoard = (function(rows, columns) {
  const board = []
  for (let r = 0; r < rows; r++) {
    const row = []
    for (let c = 0; c < columns; c++) {
      row.push(new Cell("-"))
    }
    board.push(row)
  }
  const getBoard = () => board
  const updateCellLabel = (row, column, label) => {
    board[row][column].setLabel(label)
  }
  const isFreeCell = (row, column) => board[row][column].getLabel() === "-"
  const transpose = (board) => {
    // board[0] to iterate over the columns https://stackoverflow.com/a/46805290
    return board[0].map((_, columnIndex) => board.map((row) => row[columnIndex]))
  }
  const isWinState = (label) => {
    const isRowWinState = board.some((row) => row.every(v => v.getLabel() === label))
    const isColumnWinState = transpose(board).some((column) => column.every(v => v.getLabel() === label))
    const isDiagonalWinState = [0, 1, 2].every((i) => board[i][i].getLabel() === label) || [0, 1, 2].every((r) => board[r][2-r].getLabel() === label)
    return isRowWinState || isColumnWinState || isDiagonalWinState
  }
  const isTieState = () => board.every((row) => row.every((cell) => cell.getLabel() !== "-"))
  return { getBoard, updateCellLabel, isFreeCell, isWinState, isTieState }
})(3, 3)

const GameView = (function() {
  const getBoardDisplay = (board) => {
    let text = ""
    board.forEach((row, index) => {
      const [first, second, third] = row
      text += "|‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾|\n"
      text += `|  ${first.getLabel()}  |  ${second.getLabel()}  |  ${third.getLabel()}  |\n`
      if (index != 2) {
        text += "|     |     |     |\n"
      } else {
        text += "|_____|_____|_____|\n"
      }
    })
    return text
  }
  return { getBoardDisplay }
})()

const GameController = (function(playerOneName = "One", playerTwoName = "Two") {
  const board = GameBoard.getBoard()
  const players = [
    {
      "name": playerOneName,
      "label": "X"
    },
    {
      "name": playerTwoName,
      "label": "O"
    }
  ]
  let currentPlayer = 0
  const getCurrentPlayer = () => players[currentPlayer]
  const getNextPlayer = () => {
    currentPlayer = (currentPlayer + 1) % players.length
    return players[currentPlayer]
  }
  const getUserInput = (promptInfo, errorInfo) => {
    while (true) {
      const value = parseInt(prompt(promptInfo))
      if (Number.isInteger(value) && value >= 1 && value <= 3) {
        return value
      }
      alert(errorInfo)
    }
  }
  const getBoardView = () => GameView.getBoardDisplay(board)
  const playRound = () => {
    const player = getCurrentPlayer()
    if (isGameOver()) {
      return
    }
    const row = getUserInput("Select a cell (row): ", "Please enter a valid number (1, 2, 3)") - 1
    const column = getUserInput("Select a cell (column): ", "Please enter a valid number (1, 2, 3)") - 1
    if (GameBoard.isFreeCell(row, column)) {
      GameBoard.updateCellLabel(row, column, player.label)
    } else {
      alert("That cell is occupied! Please choose a free cell")
      return
    }
    if (isGameOver()) {
      return
    }
    getNextPlayer()
  }
  const getWinner = () => {
    const currentPlayer = getCurrentPlayer()
    if (GameBoard.isWinState(currentPlayer.label)) {
      return currentPlayer.name
    }
    if (GameBoard.isTieState()) {
      return "Tie"
    }
  }
  const isGameOver = () => {
    return GameBoard.isWinState(getCurrentPlayer().label) || GameBoard.isTieState()
  }
  // TODO have way to reset game
  return { getCurrentPlayer, getBoardView, playRound, getWinner, isGameOver }
})()


function testGame() {
  while (!GameController.isGameOver()) {
    GameController.playRound()
    console.log(GameController.getBoardView())
  }
  console.log(`The winner is Player ${GameController.getWinner()}`)
}