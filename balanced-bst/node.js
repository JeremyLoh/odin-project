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

  set leftChild(node) {
    if (node == null) {
      return
    }
    this._leftChild = node
  }

  get rightChild() {
    return this._rightChild
  }

  set rightChild(node) {
    if (node == null) {
      return
    }
    this._rightChild = node
  }
}
