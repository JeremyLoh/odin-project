export default class Ship {
  constructor(length = 1) {
    this._length = length
    this._timesHit = 0
    this._isSunk = false
  }

  get length() {
    return this._length
  }

  get timesHit() {
    return this._timesHit
  }

  isSunk() {
    this._isSunk = this._length === this._timesHit
    return this._isSunk
  }

  hit() {
    this._timesHit++
  }
}
