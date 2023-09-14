import './style.css';
import { editCardCompleted, editCardUncompleted, renderCardsMode, renderCardsProject, setCurrentMode } from './cards'
import { Task, addTask, changeLocalStorageObject, deleteTask, getSelectedTaskIndex, isDone, saveTasks  } from './todos'
import { populateModal, success } from './modal'
import { getProjectFromName, saveAndRenderProjects, renderProjectsToForm, getActiveProjectFromId, setActiveProject } from './projects.js';


const newTodoBtn = document.getElementById('newTodoBtn')
const formBtn = document.getElementById('newFormBtn')
const dialogPage = document.querySelector('.dialog')
const todayBtn = document.getElementById('todayBtn')
const thisWeekBtn = document.getElementById('thisWeekBtn')
const allTasksBtn = document.getElementById('allTasksBtn')
const modeBtns = document.querySelector('.date-menu')

todayBtn.onclick = () => setCurrentMode('day')
thisWeekBtn.onclick = () => setCurrentMode('week')
allTasksBtn.onclick = () => setCurrentMode('all')
modeBtns.addEventListener('click', e => btnSelected(e))


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
    } else {
        updateTask(e.target.id)
    }
    renderCards()

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
renderCardsProject()

function openModal() {
    dialogPage.showModal()
}

function submitNewTask() {
    const form = document.getElementById('taskForm')
    let newTask = new Task(Object.fromEntries(new FormData(form).entries()))
    let project = getProjectFromName(newTask['project'])
    setActiveProject(project.id)
    addTask(newTask)
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

let prevBtn = null
const btnSelected = (e) => {
    if (e.target.nodeName === 'LI') {
        e.target.classList.add('active-date')
        if (prevBtn !== null) {
            prevBtn.classList.remove('active-date')
        }
        prevBtn = e.target
    }
}




