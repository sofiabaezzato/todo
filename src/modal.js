import { getActiveProjectFromId } from './projects'
import { tasks } from './todos'

function success() {
    if(document.getElementById('taskName').value === '') {
        document.querySelector('.save-btn').disabled = true
        return false
    } else {
        document.querySelector('.save-btn').disabled = false
        return true
    }
}

function populateModal(index) {
    if (tasks) {
        let task = tasks[index]
        console.log(task)
        const nameDiv = document.getElementById('taskName')
        nameDiv.value = task.name
        const descriptionDiv = document.getElementById('taskDescription')
        descriptionDiv.textContent = task.description
        const projectDiv = document.getElementById('selectProject')
        projectDiv.value = task.project
        const priorityDiv = document.getElementById('selectPriority')
        priorityDiv.value = task.priority
        const dateDiv = document.getElementById('datePicker')
        dateDiv.value = task.dueDate
        const saveBtn = document.querySelector('.save-btn')
        saveBtn.id = task.id
    } else {
        console.log('No tasks saved')
    }
}

export { success, populateModal }
