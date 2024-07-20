export default class Node {
  constructor(data, leftChild, rightChild, parent = null) {
    this._data = data
    this._leftChild = leftChild
    this._rightChild = rightChild
    this._parent = parent
  }

  get data() {
    return this._data
  }

  set data(value) {
    this._data = value
  }

  get leftChild() {
    return this._leftChild
  }

  set leftChild(node) {
    this._leftChild = node
  }

  get rightChild() {
    return this._rightChild
  }

  set rightChild(node) {
    this._rightChild = node
  }

  get parent() {
    return this._parent
  }

  set parent(node) {
    this._parent = node
  }
}
