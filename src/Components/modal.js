import { createProject } from './createProject.js';
import { createToDo } from './createToDo.js';

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

    })

    const defaultProject = createProject('Today');

    document.querySelector('.toDoForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const toDoName = document.querySelector('.toDoName').value;
        const notes = document.querySelector('.toDoNotes').value;
        const dialog = event.target.closest('dialog');
        if (dialog) dialog.close();
        createToDo(toDoName, notes);
    })
}