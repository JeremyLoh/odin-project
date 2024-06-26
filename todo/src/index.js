import { ProjectController } from "./controller/project-controller"
import "./style.css"

ProjectController.setupDemoProject("Demo")
ProjectController.renderAllProjects()

// ProjectController.renderCreateTodoForm("Demo")

// TODO - Pending items
/*
Checklist
    1) View all projects
    2) View all todos in each project (probably just the title and due date... perhaps changing color for different priorities)
    3) Expand a single todo to see/edit its details
    4) Delete a todo

Render list of demo projects
On click of each project card, render available todos
- If no todos, display a message of no todo, and a create todo button to display create todo
- If there are todos present, display create todo button, followed by list of todos

The create todo should be shown in a modal, once created, that modal element is destroyed
- <Dialog> element

Persistent storage based on localStorage

Handle adding and cleaning up of DOM elements

Create Project button functionality
View project functionality - list all created projects

Delete project functionality
Delete todo functionality
Update todo functionality
*/