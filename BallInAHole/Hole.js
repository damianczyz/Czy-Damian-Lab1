class Hole{
    constructor(){
        this.width = 75 + 'px'
        this.height = 75 + 'px'
        this.radius = 50 + '%'
        this.color = 'black'
        this.position = 'absolute'
        this.zIndex = -2
        this.holeDiv
    }

    createHoleDiv() {
        let hole = document.createElement('div')
        hole.style.width = this.width
        hole.style.height = this.height
        hole.style.borderRadius = this.radius
        hole.style.backgroundColor = this.color
        hole.style.position = this.position
        hole.style.zIndex = this.zIndex
        return hole
    }
}