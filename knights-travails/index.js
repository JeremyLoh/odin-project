class Node {
  constructor(row, column, path = []) {
    this._row = row
    this._column = column
    this._path = path
    this._path.push([row, column])
  }

  get row() {
    return this._row
  }

  get column() {
    return this._column
  }

  get path() {
    return this._path
  }

  set path(value) {
    if (value == null) {
      return
    }
    this._path = value
  }
}

function knightMoves(start, end) {
  // start and end are position of board in format [x, y]
  const [rowStart, colStart] = start
  const [rowEnd, colEnd] = end
  // check if square has been visited, move is invalid if moving to visited square (to prevent cycles)
  const visited = new Set()
  // since all moves have same weight, use BFS to find shortest path
  const queue = [new Node(rowStart, colStart)]
  while (queue.length > 0) {
    const current = queue.shift()
    if (current.row === rowEnd && current.column === colEnd) {
      return formatPathAnswer(current.path)
    }
    const validMoves = getValidKnightMoves(current.row, current.column)
    for (let i = 0; i < validMoves.length; i++) {
      const [r, c] = validMoves[i]
      const nextPath = [...current.path]
      const nextPosition = new Node(r, c, nextPath)
      if (r === rowEnd && c === colEnd) {
        return formatPathAnswer(nextPosition.path)
      }
      const key = `${r},${c}`
      if (!visited.has(key)) {
        queue.push(nextPosition)
        visited.add(key)
      }
    }
    visited.add(`${current.row},${current.column}`)
  }
  return []
}

function formatPathAnswer(path) {
  const moveCount = path.length
  let answer = `You made it in ${moveCount - 1} move${
    moveCount - 1 > 1 ? "s" : ""
  }! Here's your path:`
  for (let i = 0; i < moveCount; i++) {
    const move = path[i]
    answer += `\n[${move[0]},${move[1]}]`
  }
  return answer
}

function getValidKnightMoves(row, column) {
  // chess board has 8 rows and 8 columns
  return [
    [row - 2, column - 1],
    [row - 2, column + 1],
    [row - 1, column - 2],
    [row - 1, column + 2],
    [row + 1, column - 2],
    [row + 1, column + 2],
    [row + 2, column - 1],
    [row + 2, column + 1],
  ].filter(([r, c]) => r >= 0 && r <= 7 && c >= 0 && c <= 7)
}

/*
knightMoves([3,3],[4,3])
=> You made it in 3 moves! Here's your path:
  [3,3]
  [4,5]
  [2,4]
  [4,3]
*/
console.log(knightMoves([3, 3], [4, 3]))
