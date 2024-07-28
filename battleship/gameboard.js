import Ship from "./ship"

export default class Gameboard {
  constructor(rows = 10, columns = 10) {
    this._rows = rows
    this._columns = columns
    this._ships = []
  }

  placeHorizontalShip(coordinate, shipSize) {
    // coordinate is [row, column]
    const [row, column] = coordinate
    if (row < 0 || row >= this._rows || column < 0 || column >= this._columns) {
      throw new Error(
        "Invalid coordinate to place ship as coordinate is outside board"
      )
    }
    if (row + shipSize > this._rows) {
      throw new Error("Invalid coordinate to place ship due to ship size")
    }
    const positions = new Set()
    for (let i = 0; i < shipSize; i++) {
      positions.add(`${row + i},${column}`)
    }
    this._ships.push({ positions, hits: [], ship: new Ship(shipSize) })
  }

  placeVerticalShip(coordinate, shipSize) {
    const [row, column] = coordinate
    // TODO
  }
}
