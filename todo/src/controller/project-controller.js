import { Project } from "../model/project"
import { PriorityLevel, Todo } from "../model/todo"
import { TodoEvent, TodoPubsub } from "../todo-pubsub"
import { renderProjects } from "../view/project-view"
import { displayCreateTodoForm } from "../view/todo-form"
import { renderTodos } from "../view/todo-view"

// Manage project creation and todo added to a project
export const ProjectController = (function() {
  const projects = {}
  // TODO In ProjectController, should subscribe to the TodoEvent.UPDATE on any todo update, to trigger rerender
  TodoPubsub.subscribe(TodoEvent.ADD, handleAddTodo)

  function handleAddTodo(value) {
    const {todo, projectTitle} = value
    if (!projects.hasOwnProperty(projectTitle)) {
      return
    }
    const project = projects[projectTitle]
    project.addTodo(todo)
    renderTodos(project.todos)
  }
  function handleProjectCardClick(project) {
    const todos = project.todos
    renderTodos(todos)
  }

  function createProject(title) {
    // TODO handle duplicate project creation with same title (hash the title with timestamp)
    const project = new Project(title, [])
    projects[title] = project
    return project
  }
  function renderAllProjects() {
    renderProjects(Object.values(projects), handleProjectCardClick)
  }
  function renderCreateTodoForm(projectTitle) {
    if (!projects.hasOwnProperty(projectTitle)) {
      return
    }
    displayCreateTodoForm(projectTitle)
  }
  function setupDemoProject(projectTitle) {
    const project = createProject(projectTitle)
    const title = "First Low Priority Todo"
    const description = ""
    const dueDate = new Date("2024-02-14")
    const priority = PriorityLevel.LOW.description
    const notes = "My First Todo Note"
    project.addTodo(new Todo(title, description, dueDate, priority, notes))
  }
  return { createProject, setupDemoProject, renderAllProjects, renderCreateTodoForm }
})()