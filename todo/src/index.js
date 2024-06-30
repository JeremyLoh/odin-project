import { NavController } from "./controller/nav-controller"
import { ProjectController } from "./controller/project-controller"
import "./style.css"

NavController.setupButtons()

ProjectController.setupDemoProject("Demo")
ProjectController.renderAllProjects()

// TODO - Pending items
/*
Checklist
Persistent storage based on localStorage
*/