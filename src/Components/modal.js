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
}