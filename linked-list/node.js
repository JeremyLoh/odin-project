class Node {
  constructor(value) {
    this._value = value
    this._nextNode = null
  }

  get value() {
    return this._value
  }

  get next() {
    return this._nextNode
  }

  set next(node) {
    this._nextNode = node
  }
}
