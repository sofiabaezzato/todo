
class Task {
    constructor(form) {
        this.name = form.name;
        this.description = form.description;
        this.project = form.project;
        this.priority = form.priority;
        this.dueDate = form.date;
        this.done = false;
        this.id = new Date().valueOf();
    }

    add(task) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks === null) {
            tasks = []
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function isDone(index) {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (savedTasks) {
        let task = savedTasks[index]
        return task['done']
    } else {
        console.log('No tasks saved')
    }
}

function getSelectedTaskIndex(selectedId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    let selectedTaskIndex = tasks.findIndex(task => task.id == selectedId)
    if (selectedTaskIndex != -1) {
        console.log(selectedTaskIndex)
        return selectedTaskIndex
    } else {
        console.log('Task not found')
    }
}

function changeLocalStorageObject(index, key, newValue) {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (savedTasks) {
        let task = savedTasks[index]
        task[key] = newValue
        localStorage.setItem("tasks", JSON.stringify(savedTasks))

    } else {
        console.log('No tasks saved')
    }
}

function deleteTask(index) {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (savedTasks) {
        savedTasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(savedTasks))

    } else {
        console.log('No tasks saved')
    }
}




export { Task, isDone, getSelectedTaskIndex, changeLocalStorageObject, deleteTask }