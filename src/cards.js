import { format, parseISO } from 'date-fns'
import { getActiveProjectFromId } from './projects'
import { tasks } from './todos' 


function renderCards() {
    const todoContainer = document.querySelector('.todo-grid')
    let project = getActiveProjectFromId()
    console.log(project.name)
    clearElement(todoContainer)
    const projectTitleDiv = document.querySelector('.title')
    projectTitleDiv.textContent = project.name
    let projectTasks = tasks.filter(task => task.project === project.name)
    if(projectTasks != '') {
        console.log('tasks found: ' + JSON.stringify(projectTasks))
        projectTasks.forEach(task => createCard(task))
    }
}

function createCard(task) {
    if (task === null) return
    const cardDiv = document.createElement('div')
    cardDiv.classList = 'todo-card'

    const controlDiv = document.createElement('div')
    const deleteBtn = document.createElement('button')
    const editBtn = document.createElement('button')
    controlDiv.classList = 'control-div'
    deleteBtn.classList = 'delete-btn'
    deleteBtn.id = task.id
    editBtn.classList = 'edit-btn'
    editBtn.id = task.id

    controlDiv.appendChild(editBtn)
    controlDiv.appendChild(deleteBtn)

    const checkDiv = document.createElement('div')
    checkDiv.classList = 'check-div'
    const checkbox = document.createElement('input')
    checkbox.classList = 'checkbox'
    checkbox.type = 'checkbox'
    checkbox.name = 'done'
    checkbox.id = task.id
    checkDiv.appendChild(checkbox)

    const nameDiv = document.createElement('p')
    nameDiv.classList = 'task-name'
    nameDiv.id = 'task' + task.id
    nameDiv.textContent = task.name
    const descriptionDiv = document.createElement('p')
    descriptionDiv.classList = 'task-description'
    descriptionDiv.textContent = task.description
    descriptionDiv.id = 'description' + task.id
    if (task.done === true) {
        nameDiv.classList.add('completed')
        descriptionDiv.classList.add('completed')
        checkbox.checked = true
    } else {
        checkbox.checked = false
    }

    const detailsCont = document.createElement('div')
    detailsCont.classList = 'details-cont'
    const detailsDiv = document.createElement('div') 
    detailsDiv.classList = 'details-div'

    if (task.dueDate !== '') {
        const dateDiv = document.createElement('p')
        dateDiv.classList = 'task-date'
        dateDiv.textContent = format(parseISO(`${task.dueDate}`), 'dd MMM')
        detailsDiv.appendChild(dateDiv)
    }
    
    const projectDiv = document.createElement('p')
    projectDiv.classList = 'task-project'
    projectDiv.textContent = task.project

    detailsDiv.appendChild(projectDiv)

    const priorityDiv = document.createElement('p')
    priorityDiv.classList = 'task-priority'
    priorityDiv.textContent = task.priority

    detailsCont.appendChild(detailsDiv)
    detailsCont.appendChild(priorityDiv)

    cardDiv.appendChild(checkDiv)
    cardDiv.appendChild(nameDiv)
    cardDiv.appendChild(controlDiv)
    cardDiv.appendChild(descriptionDiv)
    cardDiv.appendChild(detailsCont)

    const todoGrid = document.querySelector('.todo-grid')
    todoGrid.appendChild(cardDiv)
    cardDiv.id = 'card' + task.id
}

function editCardCompleted(id) {
    const selectedTaskName = document.getElementById(`task${id}`)
    selectedTaskName.classList.add('completed')
    const selectedTaskDescr = document.getElementById(`description${id}`)
    selectedTaskDescr.classList.add('completed')
    console.log(selectedTaskName)
}

function editCardUncompleted(id) {
    const selectedTaskName = document.getElementById(`task${id}`)
    selectedTaskName.classList.remove('completed')
    const selectedTaskDescr = document.getElementById(`description${id}`)
    selectedTaskDescr.classList.remove('completed')
    console.log(selectedTaskName)
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export { renderCards, editCardCompleted, editCardUncompleted, clearElement}