import './style.css';
import { editCardCompleted, editCardUncompleted, renderCards } from './cards'
import { Task, changeLocalStorageObject, deleteTask, getSelectedTaskIndex, isDone, saveTasks  } from './todos'
import { populateModal, success } from './modal'
import { getProjectFromName, saveAndRenderProjects, renderProjectsToForm, getActiveProjectFromId, setActiveProject } from './projects.js';


/* let date = formatRelative(subDays(new Date(), 3), new Date())
console.log(date) */

const newTodoBtn = document.getElementById('newTodoBtn')
const formBtn = document.getElementById('newFormBtn')
const dialogPage = document.querySelector('.dialog')

newTodoBtn.addEventListener('click', function() {
    const form = document.getElementById('taskForm')
    form.reset()
    const projectDiv = document.getElementById('selectProject')
    let activeProject = getActiveProjectFromId()
    projectDiv.value = activeProject.name
    const saveBtn = document.querySelector('.save-btn')
    saveBtn.id = ''
    openModal()
})

dialogPage.addEventListener('input', success)

formBtn.addEventListener('click', function(e) {
    if (e.target.id === '') {
        submitNewTask()
        renderCards()
  } else {
        updateTask(e.target.id)
        renderCards()
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

saveAndRenderProjects()
renderProjectsToForm()
renderCards()

function openModal() {
    dialogPage.showModal()
}

function submitNewTask() {
    const form = document.getElementById('taskForm')
    let newTask = new Task(Object.fromEntries(new FormData(form).entries()))
    let project = getProjectFromName(newTask['project'])
    setActiveProject(project.id)
    newTask.add(newTask)
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
    let project = getProjectFromName(updatedTaskEntries['project'])
    setActiveProject(project.id)
    saveTasks()
}



