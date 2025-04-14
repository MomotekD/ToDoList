import './styles.css';
import { setupModals } from './Components/modal.js';
import { projects } from './Components/data.js';

const savedProjects = localStorage.getItem('projects');

if(savedProjects){
    const parsed = JSON.parse(savedProjects);
    projects.splice(0, projects.length, ...parsed);
}

document.addEventListener('DOMContentLoaded', () => {
    setupModals();
})




