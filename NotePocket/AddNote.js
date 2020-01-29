class AddNote{
    constructor(notes){
        this.notes = notes
        this.title = document.querySelector('#titleNote')
        this.content = document.querySelector('#contentNote')
        this.red = document.querySelector('.red').addEventListener('click', this.changeActiveDot)
        this.defaultColor = document.querySelector('.red')
        this.orange = document.querySelector('.orange').addEventListener('click', this.changeActiveDot)
        this.green = document.querySelector('.green').addEventListener('click', this.changeActiveDot)
        this.blue = document.querySelector('.blue').addEventListener('click', this.changeActiveDot)
        this.pink = document.querySelector('.pink').addEventListener('click', this.changeActiveDot)
        this.colors = [... document.querySelectorAll('div[data-color]')]

        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault()
            this.notes.createNewNote(this.title.value, this.content.value, this.setColor())
            this.title.value = ""
            this.content.value = ""
            this.colors.forEach(color => color.classList.remove('active'))
            this.defaultColor.classList.add('active')
        })
    }

    changeActiveDot = (e) => {
        const red = document.querySelector('.red')
        const pink = document.querySelector('.pink')
        const orange = document.querySelector('.orange')
        const blue = document.querySelector('.blue')
        const green = document.querySelector('.green')
        const colors = [... document.querySelectorAll('div[data-color]')]

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

    setColor(){
        const colors = [... document.querySelectorAll('div[data-color]')]

        for(let i = 0; i<colors.length;i++){
            if((colors[i].classList.contains('active')) && (colors[i].classList.contains('red')))
                return '#E94F4A'
            else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('blue')))
                return '#6E90EE'
            else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('orange')))
                return '#FFA41B'
            else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('pink')))
                return 'pink'
            else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('green')))
                return '#3DA20B'
        }
    }


}