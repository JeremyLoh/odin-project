import { NavController } from "./controller/nav-controller"
import { ProjectController } from "./controller/project-controller"
import "./style.css"

NavController.setupButtons()

ProjectController.setupDemoProject("Demo")
ProjectController.renderAllProjects()

// TODO - Pending items
/*
Checklist
    2) View all todos in each project (probably just the title and due date... perhaps changing color for different priorities)
    3) Expand a single todo to see/edit its details

Persistent storage based on localStorage

Update todo functionality
*/