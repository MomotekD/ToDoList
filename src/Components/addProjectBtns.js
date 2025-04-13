import { projects } from "./data";

export function addProjectBtns(){
    const projectsBtns = document.querySelector('.projectsBar');
    projectsBtns.innerHTML = '';

    projects.forEach((project) => {
        const projectBtn = document.createElement('button');
        projectBtn.textContent = `${project.name}`;    
        projectsBtns.appendChild(projectBtn);
        projectBtn.addEventListener('click', (event) => {
            const toDoContainer = document.querySelector('.toDoContainer')
            toDoContainer.innerHTML = '';
            
            project.todos.forEach((todo) => {
                const toDoTitle = document.createElement('h4');
                toDoTitle.textContent = `${todo.name}`;
                toDoContainer.appendChild(toDoTitle);
            })
        });
    })
}