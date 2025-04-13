export function createToDo(name, notes){
    const toDo = {
        id: crypto.randomUUID,
        name: name,
        notes: notes,
        done: false,
    }
    console.log(toDo);

    return toDo;
}