export default class Node {
  constructor(data, leftChild, rightChild) {
    this._data = data
    this._leftChild = leftChild
    this._rightChild = rightChild
  }

  get data() {
    return this._data
  }

  get leftChild() {
    return this._leftChild
  }

  get rightChild() {
    return this._rightChild
  }
}
