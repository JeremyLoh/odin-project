import { Project } from "../model/project"
import { PriorityLevel, Todo } from "../model/todo"
import { ProjectEvent, ProjectPubSub } from "../pubsub/project-pubsub"
import { TodoEvent, TodoPubsub } from "../pubsub/todo-pubsub"
import { displayErrorAlert } from "../view/alert"
import { renderCurrentProject, renderProjects } from "../view/project-view"
import { displayCreateTodoForm } from "../view/todo-form"
import { renderTodos } from "../view/todo-view"

// Manage project creation and todo added to a project
export const ProjectController = (function() {
  const projects = loadStoredProjects()

  TodoPubsub.subscribe(TodoEvent.ADD, handleAddTodo)
  TodoPubsub.subscribe(TodoEvent.UPDATE, handleUpdateTodo)
  TodoPubsub.subscribe(TodoEvent.DELETE, handleDeleteTodo)
  ProjectPubSub.subscribe(ProjectEvent.ADD, handleAddProject)

  function loadStoredProjects() {
    const localStorageProjects = {}
    if (!window.localStorage.getItem("projects")) {
      return {}
    }
    const storedProjects = JSON.parse(window.localStorage.getItem("projects"))
    for (const [projectTitle, projectDetails] of Object.entries(storedProjects)) {
      const todos = projectDetails._todos.map((item) => {
        return new Todo(item._title, item._description, new Date(item._dueDate), item._priority, item._notes)
      })
      const project = new Project(projectDetails._title, todos, new Date(projectDetails._createdAt))
      localStorageProjects[projectTitle] = project
    }
    return localStorageProjects
  }
  function saveProjectsToStorage(projects) {
    const parsedProjects = JSON.stringify(projects)
    window.localStorage.setItem("projects", parsedProjects)
  }

  function handleAddTodo(data) {
    const {todo, projectTitle} = data
    if (!projects.hasOwnProperty(projectTitle)) {
      return
    }
    const project = projects[projectTitle]
    project.addTodo(todo)
    renderCurrentProject(project, {handleDeleteProject})
    renderTodos(project.todos, projectTitle)
    saveProjectsToStorage(projects)
  }
  function handleUpdateTodo(data) {
    const {projectTitle, existingTodo, newTodo} = data
    const project = projects[projectTitle]
    project.updateTodo(existingTodo, newTodo)
    // not required to rerender current project of todo, already edited todo in place
    saveProjectsToStorage(projects)
  }
  function handleDeleteTodo(data) {
    const {todo, projectTitle} = data
    const project = projects[projectTitle]
    project.deleteTodo(todo)
    renderCurrentProject(project, {handleDeleteProject})
    renderTodos(project.todos, projectTitle)
    saveProjectsToStorage(projects)
  }
  function handleAddProject(data) {
    const {name} = data
    if (isExistingProjectName(name)) {
      displayErrorAlert("Did not create project as project name already exists")
      return
    }
    createProject(name)
    renderAllProjects()
    saveProjectsToStorage(projects)
  }
  function handleProjectCardClick(project) {
    const todos = project.todos
    renderCurrentProject(project, {handleDeleteProject})
    renderTodos(todos, project.title)
  }
  function handleDeleteProject(project) {
    const data = {project}
    // publish this event just in case any other component needs to know the project was deleted
    ProjectPubSub.publish(ProjectEvent.DELETE, data)
    delete projects[project.title]
    renderAllProjects()
  }

  function createProject(title) {
    const project = new Project(title, [])
    projects[title] = project    
    return project
  }
  function isExistingProjectName(title) {
    return title in projects
  }
  function renderAllProjects() {
    renderProjects(Object.values(projects), {handleProjectCardClick, handleDeleteProject})
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