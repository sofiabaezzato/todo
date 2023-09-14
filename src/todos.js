const LOCAL_STORAGE_TASKS_KEY = 'task.tasks'
let tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASKS_KEY)) || []


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
}

function addTask(task) {
    tasks.push(task);
    saveTasks()
}

function saveTasks() {
    localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks))
}

function isDone(index) {
    if (tasks) {
        let task = tasks[index]
        return task['done']
    } else {
        console.log('No tasks saved')
    }
}

function getSelectedTaskIndex(selectedId) {
    let selectedTaskIndex = tasks.findIndex(task => task.id == selectedId)
    if (selectedTaskIndex != -1) {
        console.log(selectedTaskIndex)
        return selectedTaskIndex
    } else {
        console.log('Task not found')
    }
}

function changeLocalStorageObject(index, key, newValue) {
    if (tasks) {
        let task = tasks[index]
        task[key] = newValue
        saveTasks()

    } else {
        console.log('No tasks saved')
    }
}

function deleteTask(index) {
    if (tasks) {
        tasks.splice(index, 1)
        saveTasks()

    } else {
        console.log('No tasks saved')
    }
}

function removeTasksProject(projectName) {
    tasks = tasks.filter(task => task.project != projectName)
    saveTasks()
}




export { Task, tasks, addTask, isDone, getSelectedTaskIndex, changeLocalStorageObject, deleteTask, saveTasks, removeTasksProject }