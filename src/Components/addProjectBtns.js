import { projects } from "./data";
import { saveProjectsToLocalStorage } from "./saveProjectsToLocalStorage";
import { optionAdd } from "./optionAdd";

export function addProjectBtns(){
    const projectsBtns = document.querySelector('.projectsBar');
    const toDoHeader = document.querySelector('.toDoHeader')
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
            location.reload();
        })

        projectsBtns.appendChild(projectDiv);
        projectDiv.appendChild(projectBtn);
        if(project.name != 'Today'){
            projectDiv.appendChild(projectRemove);
        }

        projectBtn.addEventListener('click', (event) => {
            const toDoContainer = document.querySelector('.toDoContainer')
            toDoHeader.textContent = `Project: ${project.name}`
            toDoContainer.innerHTML = '';
            
            project.todos.forEach((todo) => {
                const selectOptions = ['To Do', 'Doing', 'Done']
                
                const toDoDiv = document.createElement('div');
                toDoDiv.classList.add('toDoItem');
                
                const toDoTitle = document.createElement('h4');
                toDoTitle.textContent = `${todo.name}`;
                
                const toDoNotes = document.createElement('p');
                toDoNotes.textContent = `Notes: ${todo.notes}`;

                const toDoDueDate = document.createElement('p');
                toDoDueDate.classList.add('dueDate');
                toDoDueDate.textContent = `Due: ${todo.dueDate}`

                const toDoDone = document.createElement('select');
                toDoDone.classList.add('toDoDone');
                toDoDone.addEventListener('change', (event) => {
                    todo.done = event.target.value;
                    saveProjectsToLocalStorage();
                });

                const editToDo = document.createElement('button');
                editToDo.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3 6V8H14V6H3M3 10V12H14V10H3M20 10.1C19.9 10.1 19.7 10.2 19.6 10.3L18.6 11.3L20.7 13.4L21.7 12.4C21.9 12.2 21.9 11.8 21.7 11.6L20.4 10.3C20.3 10.2 20.2 10.1 20 10.1M18.1 11.9L12 17.9V20H14.1L20.2 13.9L18.1 11.9M3 14V16H10V14H3Z" />
                    </svg>`;
                editToDo.classList.add('editBtn')
                editToDo.addEventListener('click', (event) => {
                    document.querySelector('.editToDo .modal')?.showModal();
                    const title = document.querySelector('.toDoNameEdit');
                    const date = document.querySelector('.toDoDateEdit');
                    const notes = document.querySelector('.toDoNotesEdit');

                    title.value = `${todo.name}`;
                    date.value = `${todo.dueDate}`;
                    notes.value = `${todo.notes}`;

                });

                document.querySelector('.toDoEditForm').addEventListener('submit', (event) => {
                    const title = document.querySelector('.toDoNameEdit').value;
                    const date = document.querySelector('.toDoDateEdit').value;
                    const notes = document.querySelector('.toDoNotesEdit').value;

                    todo.name = title;
                    todo.dueDate = date;
                    todo.notes = notes;

                    saveProjectsToLocalStorage();
                })
                
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
                
                const selectEditDiv = document.createElement('div');
                selectEditDiv.classList.add('selectEditDiv');

                toDoContainer.appendChild(toDoDiv);

                toDoDiv.appendChild(toDoTitle);
                toDoDiv.appendChild(toDoNotes);
                toDoDiv.appendChild(toDoDueDate);
                toDoDiv.appendChild(selectEditDiv);
                selectEditDiv.appendChild(toDoDone);
                selectEditDiv.appendChild(editToDo);
                toDoDiv.appendChild(toDoRemove);

                selectOptions.forEach((option) => {
                    const selectOption = document.createElement('option');
                    selectOption.textContent = `${option}`;

                    if (option === todo.done) {
                        selectOption.selected = true;
                    }

                    toDoDone.appendChild(selectOption);
                });
            });
        });
        if (project.name === 'Today') {
            projectBtn.click();
        }
    });
}