export default class Node {
  constructor(key, value) {
    this._key = key
    this._value = value
    this._nextNode = null
  }

  get key() {
    return this._key
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
