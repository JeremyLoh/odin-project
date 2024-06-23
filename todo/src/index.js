import { ProjectController } from "./controller/project-controller"
import "./style.css"

ProjectController.createProject("Demo")
ProjectController.createProject("Demo2")
ProjectController.createProject("Demo3")
ProjectController.renderAllProjects()

ProjectController.renderCreateTodoForm("Demo")

// TODO - Pending items
/*
Render list of demo projects
On click of each project card, render available todos
- If no todos, display a message of no todo, and a create todo button to display create todo
- If there are todos present, display create todo button, followed by list of todos

The create todo should be shown in a modal, once created, that modal element is destroyed
Persistent storage based on localStorage

Handle adding and cleaning up of DOM elements

Create Project button functionality
View project functionality - list all created projects

Delete project functionality
Delete todo functionality
Update todo functionality
*/