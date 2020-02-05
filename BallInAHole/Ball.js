class Ball{
    constructor(){
        this.width = 50 + 'px'
        this.height = 50 + 'px'
        this.radius = 50 + '%'
        this.color = 'red'
        this.position = 'absolute'
        this.top = 20 + 'px'
        this.left = 20 + 'px'
        this.ballDiv
    }

    createBallDiv(){
        let ball = document.createElement('div')
        ball.style.width = this.width
        ball.style.height = this.height
        ball.style.borderRadius = this.radius
        ball.style.backgroundColor = this.color
        ball.style.position = this.position
        ball.style.top = this.top
        ball.style.left = this.left
        return ball
    }
}