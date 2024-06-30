export class Project {
  constructor(title, todos) {
    this._todos = todos || []
    this._title = title
    this._createdAt = new Date()
  }

  addTodo(todo) {
    this._todos.push(todo)
  }

  updateTodo(existingTodo, newTodo) {
    const index = this._todos.findIndex((todo) => 
      todo.title === existingTodo.title &&
      todo.description === existingTodo.description &&
      todo.priority === existingTodo.priority &&
      todo.notes === existingTodo.notes
    )
    const isNotFound = index === -1
    if (isNotFound) {
      return
    }
    this._todos[index] = newTodo
  }

  deleteTodo(todo) {
    this._todos = this._todos.filter((t) => {
      // filter out todos that are same as the one to delete (will remove all duplicates)
      return !(
        t.title === todo.title && t.description === todo.description && t.dueDate === todo.dueDate &&
        t.priority == todo.priority && t.notes === todo.notes
      )
    })
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