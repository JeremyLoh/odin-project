export class Todo {
  constructor(title, description, dueDate, priority, notes) {
    this._title = title
    this._description = description
    this._dueDate = dueDate
    this._priority = priority
    this._notes = notes
  }

  get title() {
    return this._title
  }

  get description() {
    return this._description
  }

  get dueDate() {
    return this._dueDate
  }

  get priority() {
    return this._priority
  }

  get notes() {
    return this._notes
  }
}

export const PriorityLevel = Object.freeze({
  LOW:    Symbol("Low"),
  MEDIUM: Symbol("Medium"),
  HIGH:   Symbol("High")
})