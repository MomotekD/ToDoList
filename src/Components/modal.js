import { createProject } from './createProject.js';
import { createToDo } from './createToDo.js';
import { projects } from './data.js';
import { optionAdd } from './optionAdd.js';
import { addProjectBtns } from './addProjectBtns.js';
import { saveProjectsToLocalStorage } from './saveProjectsToLocalStorage.js';

export function setupModals() {
    document.querySelector('.openBtnProject').addEventListener('click', () => {
        document.querySelector('.projectsBtns .modal')?.showModal();
    })

    document.querySelector('.openBtnToDo').addEventListener('click', () => {
        document.querySelector('.toDoBtns .modal')?.showModal();
    })

    document.querySelectorAll('.modalClose').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const dialog = event.target.closest('dialog');
            if (dialog) dialog.close();
        })
    })

    document.querySelector('.projectForm').addEventListener('submit', (event) => {
        const projectName = document.querySelector('.projectName').value;
        const dialog = event.target.closest('dialog');
        if (dialog) dialog.close();
        createProject(projectName);
        optionAdd();
        addProjectBtns();
        saveProjectsToLocalStorage();
    })

    if (!projects.find(project => project.name === 'Today')) {
        createProject('Today');
    }
    optionAdd();
    addProjectBtns();

    document.querySelector('.toDoForm').addEventListener('submit', (event) => {
        const toDoName = document.querySelector('.toDoName').value;
        const notes = document.querySelector('.toDoNotes').value;
        const date = document.querySelector('.dueDate').value;

        const selectValue = document.querySelector('.projectSelect').value;
        const selectedProject = projects.find(p => p.name === selectValue);

        const dialog = event.target.closest('dialog');
        
        if (dialog) dialog.close();
        
        const newToDo = createToDo(toDoName, notes, date);
        selectedProject.todos.push(newToDo);
        saveProjectsToLocalStorage();
    })
}