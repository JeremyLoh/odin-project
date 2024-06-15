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
      row.push(new Cell(""))
    }
    board.push(row)
  }
  const getBoard = () => board
  const updateCellLabel = (row, column, label) => {
    board[row][column].setLabel(label)
  }
  const isFreeCell = (row, column) => board[row][column].getLabel() === ""
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
  const isTieState = () => board.every((row) => row.every((cell) => cell.getLabel() !== ""))
  const reset = () => board.forEach((row) => row.forEach((cell) => cell.setLabel("")))
  return { getBoard, updateCellLabel, isFreeCell, isWinState, isTieState, reset }
})(3, 3)

const GameView = (function() {
  const cells = document.querySelectorAll(".cell")
  cells.forEach((cell) => cell.addEventListener("click", (event) => {
    clickBoardHandler(event)
  }))
  const clickBoardHandler = (event) => {
    const {row, column} = event.target.dataset
    GameController.playRound(parseInt(row), parseInt(column))
    renderBoard(GameController.getBoard())
  }
  const renderBoard = (board) => {
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const element = document.querySelector(`.cell[data-row="${rowIndex}"][data-column="${columnIndex}"]`)
        element.textContent = cell.getLabel()
      })
    })
  }
  const log = (board) => {
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
  return { renderBoard, log }
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
  const playRound = (row, column) => {
    const player = getCurrentPlayer()
    if (isGameOver()) {
      return
    }
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
  const resetGame = () => {
    GameBoard.reset()
    currentPlayer = 0
  }
  const getBoard = () => board
  return { getCurrentPlayer, playRound, getWinner, isGameOver, resetGame, getBoard }
})()


function testGame() {
  while (!GameController.isGameOver()) {
    // TODO convert the user input to clicking on html element. prompt will prevent refresh until end of game
    GameController.playRound()
    GameView.renderBoard()
  }
  console.log(`The winner is Player ${GameController.getWinner()}`)
  GameController.resetGame()
}