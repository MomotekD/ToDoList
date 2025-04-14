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
                const toDoDiv = document.createElement('div');
                toDoDiv.classList.add('toDoItem');
                
                const toDoTitle = document.createElement('h4');
                toDoTitle.textContent = `${todo.name}`;
                
                const toDoNotes = document.createElement('p');
                toDoNotes.textContent = `${todo.notes}`
                
                const toDoRemove = document.createElement('button');
                toDoRemove.classList.add('removeToDoBtn');
                toDoRemove.addEventListener('click', (event) => {
                    toDoDiv.innerHTML = '';
                });

                toDoContainer.appendChild(toDoDiv);
                toDoDiv.appendChild(toDoTitle);
                toDoDiv.appendChild(toDoNotes);
                toDoDiv.appendChild(toDoRemove);
            })
        });
    })
}