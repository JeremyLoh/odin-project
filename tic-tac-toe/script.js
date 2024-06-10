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
  return { getBoard, updateCellLabel }
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
  const playRound = () => {
    const player = getCurrentPlayer()
    const row = parseInt(prompt("Select a cell (row): "))
    const column = parseInt(prompt("Select a cell (column): "))
    GameBoard.updateCellLabel(row, column, player.label)
    getNextPlayer()
  }
  const getBoardView = () => GameView.getBoardDisplay(board)
  return { getCurrentPlayer, getNextPlayer, playRound, getBoardView }
})()

// TEST
GameController.playRound()
console.log(GameController.getBoardView())
GameController.playRound()
console.log(GameController.getBoardView())