import { NavController } from "./controller/nav-controller"
import { ProjectController } from "./controller/project-controller"
import "./style.css"

NavController.setupButtons()

ProjectController.setupDemoProject("Demo")
ProjectController.renderAllProjects()

// ProjectController.renderCreateTodoForm("Demo")

// TODO - Pending items
/*
Checklist
    2) View all todos in each project (probably just the title and due date... perhaps changing color for different priorities)
    3) Expand a single todo to see/edit its details
    4) Delete a todo

On click of each project card, render available todos
- If no todos, display a message of no todo, and a create todo button to display create todo
- If there are todos present, display create todo button, followed by list of todos

Persistent storage based on localStorage

Handle adding and cleaning up of DOM elements

Delete project functionality
Delete todo functionality
Update todo functionality
*/