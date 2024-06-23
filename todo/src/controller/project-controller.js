import { Project } from "../model/project"
import { TodoEvent, TodoPubsub } from "../todo-pubsub"
import { renderProjects } from "../view/project-view"
import { displayCreateForm } from "../view/todo-form"
import { renderTodos } from "../view/todo-view"

// Manage project creation and todo added to a project
export const ProjectController = (function() {
  const projects = {}
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
  function createProject(title) {
    const project = new Project(title, [])
    projects[title] = project
  }
  function renderAllProjects() {
    renderProjects(Object.values(projects))
  }
  function renderCreateTodoForm(projectTitle) {
    if (!projects.hasOwnProperty(projectTitle)) {
      return
    }
    displayCreateForm(projectTitle)
  }
  return { createProject, renderAllProjects, renderCreateTodoForm }
})()