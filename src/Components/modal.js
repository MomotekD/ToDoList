import { createProject } from './createProject.js';
import { createToDo } from './createToDo.js';
import { projects } from './data.js';
import { optionAdd } from './optionAdd.js';

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
        event.preventDefault();
        const projectName = document.querySelector('.projectName').value;
        const dialog = event.target.closest('dialog');
        if (dialog) dialog.close();
        createProject(projectName);
        optionAdd()
    })

    const defaultProject = createProject('Today');
    optionAdd()

    document.querySelector('.toDoForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const toDoName = document.querySelector('.toDoName').value;
        const notes = document.querySelector('.toDoNotes').value;
        const selectValue = document.querySelector('.projectSelect').value;
        const selectedProject = projects.find(p => p.name === selectValue);
        const dialog = event.target.closest('dialog');
        
        if (dialog) dialog.close();
        
        const newToDo = createToDo(toDoName, notes);
        selectedProject.todos.push(newToDo)
        console.log(selectedProject);
    })
}