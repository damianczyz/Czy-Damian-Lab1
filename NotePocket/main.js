class Notes{
    constructor(){
        this.notesArray = []
        this.addNote = new AddNote(this)
        this.notesContainer = document.querySelector('#notes')
        this.pinnedArea = document.querySelector('div.pinnNote')
        this.getAllNotesFromLocalStorage()
        this.init() 
    }
    


    saveToLS() {
        localStorage.setItem('notes', JSON.stringify(this.notesArray))
    }

    getAllNotesFromLocalStorage() {
        if (JSON.parse(localStorage.getItem('notes')) != null)
            this.notesArray = JSON.parse(localStorage.getItem('notes'))
    }

    init() {
        this.notesArray.forEach(note => {
            this.createNote(note)
        })
    }


    

    createNewNote(title, content, color) {
        let note = new Note(title, content, color)
        this.createNote(note)
        this.notesArray.push(note)
        this.setNoteId(note)
        
        this.saveToLS()
    }

    createNote(note) {
        let noteDiv = this.createNoteDiv(note.color)
        if(note.pinned == true){
            this.pinnedArea.appendChild(noteDiv)
        }
        else{
            this.notesContainer.appendChild(noteDiv)
        }

        let topSide = this.createTopSide()
        noteDiv.appendChild(topSide)

        let title = this.createTitle(note.title)
        topSide.appendChild(title)

        let icons = this.createIcons()
        topSide.appendChild(icons)

        let iconRemove = this.createIconRemove(noteDiv, note)
        icons.appendChild(iconRemove)

        let iconPinn = this.createIconPinn(note)
        icons.appendChild(iconPinn)


        let content = this.createNoteContent(note.content)
        noteDiv.appendChild(content)

        let date = this.createNoteDate(note.date)
        noteDiv.appendChild(date)

    }

    createNoteDiv(color){
        let note = document.createElement('div')
        note.classList.add('note')
        note.style.backgroundColor = color
        return note
    }

    createTopSide(){
        let topSide = document.createElement('div')
        topSide.classList.add('topSide')
        return topSide
    }

    createTitle(noteTitle){
        
        let title = document.createElement('div')
        title.classList.add('noteTitle')
        title.innerText = noteTitle
        return title
    }

    createIcons(){
        let icons = document.createElement('div')
        icons.id = 'icons'
        return icons
    }

    createIconRemove(noteDiv,note){
        let removeIcon = document.createElement('i')
        removeIcon.className = 'far fa-times-circle'
        removeIcon.classList.add('iconRemove')
        removeIcon.addEventListener('click', () => this.removeNote(noteDiv, note.id))
        return removeIcon
    }

    createIconPinn(note){
        let pinnIcon = document.createElement('i')
        pinnIcon.className = 'fas fa-thumbtack'
        pinnIcon.classList.add('iconPinn')
        if(note.pinned==true){
            pinnIcon.classList.add('pinnNote')
            pinnIcon.style.color = '#CDEDF5'
        }else {
            pinnIcon.classList.remove('pinnNote')
        }
        pinnIcon.addEventListener('click', () => this.pinNote(note,pinnIcon))
        return pinnIcon
    }

    createNoteContent(contentNote){
        let content = document.createElement('div')
        content.classList.add('noteContent')
        content.innerText = contentNote
        return content
    }

    createNoteDate(date){
        let dateNote = document.createElement('div')
        dateNote.classList.add('noteDate')
        dateNote.innerText = date 
        return dateNote
    }


    saveToLocaleStorage(){
        this.saveToLS()
        location.reload()
    }


    setNoteId(note){
        const index = this.notesArray.indexOf(note)
        note.id = index
        return note
    }

    removeNote(noteDiv, noteId){
        noteDiv.parentNode.removeChild(noteDiv)

        let searchedNote = this.notesArray.find(note => {
            return note.id === noteId
        })

        let index = this.notesArray.indexOf(searchedNote)
        if(index>-1){
            this.notesArray.splice(index,1)
        }
        this.saveToLocaleStorage()
    }

    pinNote(note,pin){
        if(note.pinned == false){
            note.pinned = true
            pin.style.color = '#CDEDF5'
        }
        else{
            note.pinned = false
        }
        this.saveToLocaleStorage()
    }


}


