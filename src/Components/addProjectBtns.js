import { projects } from "./data";
import { saveProjectsToLocalStorage } from "./saveProjectsToLocalStorage";
import { optionAdd } from "./optionAdd";

export function addProjectBtns(){
    const projectsBtns = document.querySelector('.projectsBar');
    projectsBtns.innerHTML = '';

    projects.forEach((project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('projectItem');

        const projectBtn = document.createElement('button');
        projectBtn.classList.add('projectBtn')
        projectBtn.textContent = `${project.name}`;    
        
        const projectRemove = document.createElement('button');
        projectRemove.textContent = '×';
        projectRemove.classList.add('projectBtn')
        projectRemove.addEventListener('click',(event) => {
            const index = projects.findIndex(p => p.id === project.id);
            if(index !== -1) {
                projects.splice(index, 1);
            }
            projectDiv.remove();
            saveProjectsToLocalStorage();
            optionAdd();
        })

        projectsBtns.appendChild(projectDiv);
        projectDiv.appendChild(projectBtn);
        if(project.name != 'Today'){
            projectDiv.appendChild(projectRemove);
        }

        projectBtn.addEventListener('click', (event) => {
            const toDoContainer = document.querySelector('.toDoContainer')
            toDoContainer.innerHTML = '';
            
            project.todos.forEach((todo) => {
                const selectOptions = ['To Do', 'Doing', 'Done']
                
                const toDoDiv = document.createElement('div');
                toDoDiv.classList.add('toDoItem');
                
                const toDoTitle = document.createElement('h4');
                toDoTitle.textContent = `${todo.name}`;
                
                const toDoNotes = document.createElement('p');
                toDoNotes.textContent = `${todo.notes}`;

                const toDoDueDate = document.createElement('p');
                toDoDueDate.classList.add('dueDate');
                toDoDueDate.textContent = `Due: ${todo.dueDate}`

                const toDoDone = document.createElement('select');
                toDoDone.addEventListener('change', (event) => {
                    todo.done = event.target.value;
                    saveProjectsToLocalStorage();
                });
                
                const toDoRemove = document.createElement('button');
                toDoRemove.textContent = '×';
                toDoRemove.classList.add('removeToDoBtn');
                toDoRemove.addEventListener('click', (event) => {
                    const index = project.todos.findIndex(t => t.id === todo.id);
                    if(index !== -1) {
                        project.todos.splice(index, 1);
                    }
                    toDoDiv.remove()
                    saveProjectsToLocalStorage();
                });

                toDoContainer.appendChild(toDoDiv);

                toDoDiv.appendChild(toDoTitle);
                toDoDiv.appendChild(toDoNotes);
                toDoDiv.appendChild(toDoDueDate);
                toDoDiv.appendChild(toDoDone);
                toDoDiv.appendChild(toDoRemove);

                selectOptions.forEach((option) => {
                    const selectOption = document.createElement('option');
                    selectOption.textContent = `${option}`;

                    if (option === todo.done) {
                        selectOption.selected = true;
                    }

                    toDoDone.appendChild(selectOption);
                })
            })
        });
    })
}