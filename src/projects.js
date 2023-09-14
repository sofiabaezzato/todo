import { clearElement, renderCards, renderCardsProject } from "./cards"
import { removeTasksProject } from "./todos"

const listContainer = document.querySelector('.project-menu')
const newProjectForm = document.querySelector('[data-new-project-form]')
const newProjectInput = document.querySelector('[data-new-project-input]')

const LOCAL_STORAGE_PROJECT_KEY = 'task.projects'
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'task.selectedProjectId'
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [{ id: '23761361782', name: 'Inbox'}]
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY) || '23761361782'

listContainer.addEventListener('click', e => {
    if(e.target.className === 'list-name') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRenderProjects()
        renderCardsProject()
    }
})

newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = newProjectInput.value
    if (projectName == null || projectName === '') return
    const project = createProject(projectName)
    newProjectInput.value = null
    projects.push(project)
    renderProjectsToForm(projects)
    saveAndRenderProjects()
})

listContainer.addEventListener('click', e => {
    if(e.target.className === 'remove-project-btn') {
        let projectId = e.target.dataset.projectId
        projects = projects.filter(project => project.id != projectId)
        selectedProjectId = '23761361782'
        let projectRemoved = projects.find(project => project.id === projectId)
        removeTasksProject(projectRemoved.name)
        saveAndRenderProjects()
        renderCards()
        renderProjectsToForm(projects)
    }
})

function createProject(name) {
    return { id: new Date().valueOf().toString(), name: name}
}

function getActiveProjectFromId() {
    return projects.find(project => project.id === selectedProjectId)
}

function getProjectFromName(projectName) {
    return projects.find(project => project.name === projectName)
}

function setActiveProject(id) {
    selectedProjectId = id
    saveAndRenderProjects()
}

function saveAndRenderProjects() {
    saveProjects()
    renderProjects()
}

function saveProjects() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId)
}

function renderProjects() {
    clearElement(listContainer)
    projects.forEach(project => {
        const listElement = document.createElement('li')
        listElement.dataset.projectId = project.id
        listElement.classList.add('list-name')
        listElement.textContent = project.name
        while (selectedProjectId == null) {
            selectedProjectId = '23761361782'
        }
        if (project.id === selectedProjectId) {
            listElement.classList.add('active-list')
        }
        if (project.id != '23761361782') {
            const removeProjectBtn = document.createElement('img')
            removeProjectBtn.classList.add('remove-project-btn')
            removeProjectBtn.src = "../src/img/minus-solid.svg"
            removeProjectBtn.dataset.projectId = project.id
            listElement.appendChild(removeProjectBtn)
        }
        listContainer.appendChild(listElement)
    })
}

function renderProjectsToForm() {
    const selectProjectForm = document.getElementById('selectProject')
    clearElement(selectProjectForm)
    projects.forEach(project => {
        const newOption = document.createElement('option')
        newOption.textContent = project.name
        newOption.setAttribute('value', `${project.name}`)
        selectProjectForm.appendChild(newOption)
    })
}




export { saveAndRenderProjects, renderProjectsToForm, getActiveProjectFromId, getProjectFromName, setActiveProject}