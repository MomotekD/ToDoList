import { projects } from "./data";

export function saveProjectsToLocalStorage(){
    localStorage.setItem('projects', JSON.stringify(projects));
}