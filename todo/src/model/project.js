export class Project {
  constructor(title, todos) {
    this._todos = todos || []
    this._title = title
    this._createdAt = new Date()
  }

  addTodo(todo) {
    this._todos.push(todo)
  }

  get todos() {
    return this._todos
  }

  get title() {
    return this._title
  }

  get createdAt() {
    return this._createdAt
  }

  get totalTodos() {
    return this._todos.length
  }
}