export function createToDo(name, notes, date){
    const toDo = {
        id: crypto.randomUUID(),
        name: name,
        notes: notes,
        done: 'To Do',
        dueDate: date,
    }
    console.log(toDo);

    return toDo;
}