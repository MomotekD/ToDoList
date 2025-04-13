import { projects } from "./data";

export function optionAdd(){
    const select = document.querySelector('.projectSelect');
    
    projects.forEach((project) => {
        const option = document.createElement('option');
        option.textContent = `${project.name}`;
        select.appendChild(option);
    });
}