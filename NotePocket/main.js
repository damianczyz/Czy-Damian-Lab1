let notes = []

const form = document.querySelector('form')
const txtTitle = document.querySelector('#titleNote')
const txtContent = document.querySelector('#contentNote')
const div = document.querySelector('#notes')
const listItems = document.getElementsByClassName('note')
const red = document.querySelector('[data-color = "red"]')
const green = document.querySelector('[data-color = "green"]')
const blue = document.querySelector('.blue')
const orange = document.querySelector('.orange')
const pink = document.querySelector('.pink')
const input = document.querySelector('#inputSearch')
const noteTitles = document.getElementsByClassName('noteTitle')
const colors = [... document.querySelectorAll('div[data-color]')]



const removeNote = (e) => {
    const index = e.target.parentNode.parentNode.parentNode.id
    notes.splice(index,1)
    renderNotes()
}


const renderNotes = () => {
    div.textContent = ""
    notes.forEach((note, index) => {
        div.appendChild(note)
        note.id = index
    })
}

const addNote = (e) => {
    e.preventDefault()
    const titleNote = txtTitle.value
    const contentNote = txtContent.value
    if (titleNote === "") return
    const note = document.createElement('div')
    note.className = 'note'
    notes.push(note)
    renderNotes()
    div.appendChild(note)

    // Title
    const topSide = document.createElement('div')
    const title = document.createElement('div')
    const icons = document.createElement('div')
    const remove = document.createElement('i')
    const pinn = document.createElement('i')
    topSide.className = 'topSide'
    icons.id = 'icons'
    remove.className = 'far fa-times-circle'
    remove.classList.add('iconRemove')
    pinn.className = 'fas fa-thumbtack'
    pinn.classList.add('iconPinn')
    title.className = 'noteTitle'
    title.innerHTML = titleNote
    note.appendChild(topSide)
    topSide.appendChild(title)
    topSide.appendChild(icons)
    icons.appendChild(remove)
    icons.appendChild(pinn)

    // Content
    const content = document.createElement('div')
    content.className = 'noteContent'
    content.innerHTML = contentNote
    note.appendChild(content)

    // Data
    const date = new Date()
    const dateNote = document.createElement('div')
    dateNote.className = 'noteDate'
    dateNote.innerHTML = `Data dodania: ${date.getHours()}:${date.getMinutes()} | ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    note.appendChild(dateNote)

    txtTitle.value = ""
    txtContent.value = ""

    for (let i = 0; i<colors.length; i++){
        if((colors[i].classList.contains('active')) && (colors[i].classList.contains('red')))
            note.style.backgroundColor = '#E94F4A'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('blue')))
            note.style.backgroundColor = '#6E90EE'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('orange')))
            note.style.backgroundColor = '#FFA41B'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('pink')))
            note.style.backgroundColor = 'pink'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('green')))
            note.style.backgroundColor = '#3DA20B'
    }

    note.querySelector('i').addEventListener('click', removeNote)
    // note.querySelector('i:last-child').addEventListener('click', pinnNote)

}




const changeActiveDot = (e) => {
    colors.forEach(color => color.classList.remove('active'))

    if(e.target.dataset.color === "red"){
        red.classList.add('active')
    }
    else if(e.target.dataset.color === "green"){
        green.classList.add('active')
    }
    else if(e.target.dataset.color === "blue"){
        blue.classList.add('active')
    }
    else if(e.target.dataset.color === "orange"){
        orange.classList.add('active')
    }
    else if(e.target.dataset.color === "pink"){
        pink.classList.add('active')
    }

}


red.addEventListener('click', changeActiveDot)
green.addEventListener('click', changeActiveDot)
blue.addEventListener('click', changeActiveDot)
orange.addEventListener('click', changeActiveDot)
pink.addEventListener('click', changeActiveDot)

localStorage.setItem('notes', JSON.stringify(notes))
notes = JSON.parse(localStorage.getItem('notes'))


form.addEventListener('submit', addNote)