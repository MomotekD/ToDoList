import { projects } from './data.js';

export function createProject(name){
    const project = {
        id: crypto.randomUUID(),
        name,
        todos: [],
    }
    projects.push(project);

    return project
}