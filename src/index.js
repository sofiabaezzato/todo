import './style.css';
import { editCardCompleted, editCardUncompleted, renderCards } from './cards'
import { Task, changeLocalStorageObject, deleteTask, getSelectedTaskIndex, isDone  } from './todos'
import { populateModal, success } from './modal'
import { renderProjects, renderProjectsToForm } from './projects';

/* let date = formatRelative(subDays(new Date(), 3), new Date())
console.log(date) */

const newTodoBtn = document.getElementById('newTodoBtn')
const formBtn = document.getElementById('newFormBtn')
const dialogPage = document.querySelector('.dialog')

newTodoBtn.addEventListener('click', function() {
    const form = document.getElementById('taskForm')
    form.reset()
    const saveBtn = document.querySelector('.save-btn')
    saveBtn.id = ''
    openModal()
})

dialogPage.addEventListener('input', success)

formBtn.addEventListener('click', function(e) {
    if (e.target.id === '') {
        submitNewTask()
    } else {
        updateTask(e.target.id)
    }
})

document.addEventListener('click', function(e){
    const targetTask = e.target.closest('.checkbox')
    if (targetTask) {
        let taskIndex = getSelectedTaskIndex(targetTask.id)
        let newValue;

        if (isDone(taskIndex)) {
            editCardUncompleted(targetTask.id)
            newValue = false
        } else {
            editCardCompleted(targetTask.id)
            newValue = true
        }

        changeLocalStorageObject(taskIndex, 'done', newValue)
    } else return
})

document.addEventListener('click', function(e){
    const targetTask = e.target.closest('.delete-btn')
    if (targetTask) { 
        let taskIndex = getSelectedTaskIndex(targetTask.id)
        deleteTask(taskIndex)
        renderCards()
    } else return
})

document.addEventListener('click', function(e){
    const targetTask = e.target.closest('.edit-btn')
    if (targetTask) {
        let taskIndex = getSelectedTaskIndex(targetTask.id)
        openModal()
        populateModal(taskIndex)
        success()
    } else return
})

renderCards()
renderProjects()
renderProjectsToForm()

function openModal() {
    document.getElementById('taskForm').reset()
    dialogPage.showModal()
}

function submitNewTask() {
    const form = document.getElementById('taskForm')
    let newTask = new Task(Object.fromEntries(new FormData(form).entries()))
    newTask.add(newTask)
    renderCards()
    dialogPage.close()
}

function updateTask(taskId) {
    const form = document.getElementById('taskForm')
    let updatedTaskEntries = Object.fromEntries(new FormData(form).entries())
    let taskIndex = getSelectedTaskIndex(taskId)
    changeLocalStorageObject(taskIndex, 'name', updatedTaskEntries['name'])
    changeLocalStorageObject(taskIndex, 'description', updatedTaskEntries['description'])
    changeLocalStorageObject(taskIndex, 'dueDate', updatedTaskEntries['date'])
    changeLocalStorageObject(taskIndex, 'project', updatedTaskEntries['project'])
    changeLocalStorageObject(taskIndex, 'priority', updatedTaskEntries['priority'])
    renderCards()
}



