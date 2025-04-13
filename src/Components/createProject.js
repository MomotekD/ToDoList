export function createProject(name){
    const project = {
        id: crypto.randomUUID,
        name,
        todos: [],
    }
    console.log(project.name);

    return project
}