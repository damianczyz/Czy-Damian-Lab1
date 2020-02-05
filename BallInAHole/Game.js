class Game{
    constructor(){
        this.gameStart = false
        this.holes = []
        this.startTime
        this.endTime
        this.speedX = 0
        this.speedY = 0
        this.posX = 20
        this.posY = 20
        this.miliSecondsToSecondsFactor = 1000
        this.container = document.getElementsByClassName("container")[0]
        this.ball = document.querySelector('#ball')
        this.displayTime = document.querySelector('#time')
        this.setStartTimeArrowFunction = () => this.setStartTime();
        this.btnStart = document.querySelector('#start')
        this.btnRestart = document.querySelector('#restart')
        window.addEventListener('deviceorientation', this.changeLocation)
        this.btnStart.addEventListener('click', this.start)
        this.btnRestart.addEventListener('click',this.restart)
    }

    setStartTime() {
        //this.startButton.removeEventListener('click', this.setStartTimeArrowFunction);
        this.startTime = new Date().getTime();
    }

    writeTimeToBoard() {
        let currentTime = (((new Date().getTime()) - this.startTime) / this.miliSecondsToSecondsFactor).toFixed(1)
        this.displayTime.innerText = currentTime + 's';
    }
    

    start = () => {  
        this.gameStart = true  
        this.setStartTimeArrowFunction                             
        for(let i=2;i<(window.innerWidth/100);i++){
            let hole = new Hole()
            hole.holeDiv = hole.createHoleDiv()
            hole.holeDiv.style.left = 100 * i + Math.random() * 75 - 95 + 'px'
            hole.holeDiv.style.top = Math.random() * (window.innerHeight-95) / 2 + 'px'
            this.holes.push(hole.holeDiv)
            this.container.appendChild(hole.holeDiv)
        }
        for(let i=2;i<(window.innerWidth/100);i++){
            let hole = new Hole()
            hole.holeDiv = hole.createHoleDiv()
            hole.holeDiv.style.left = 100 * i + Math.random() * 75 - 95 + 'px'
            hole.holeDiv.style.top = Math.random() * (window.innerHeight) / 2 + window.innerHeight / 2 - 100 + 'px'
            this.holes.push(hole.holeDiv)
            this.container.appendChild(hole.holeDiv)
        }

        let timer = document.createElement('span')
        timer.classList.add('timer')
        timer.innerHTML = new Date().getTime()
        this.container.appendChild(timer)
         
        this.checkHoles();
        this.randomGoodHole(1)
        this.moveBall() 
    }

    restart = () => {       
        this.gameStart=true
        // usunięcie starych dołków
        for(let i=this.container.childElementCount;i>0;i--){     
            if(this.container.childNodes[i].nodeName=="DIV"){
                if(this.container.childNodes[i].id!=="ball"){
                    this.container.removeChild(this.container.childNodes[i])
                }
            }
        }
        //score = 0
        //counter.innerHTML="Score: "+score         // reset punktów
        this.holes=[]
        this.posX = 20
        this.posY = 20
        this.start()            
        document.getElementById("restart").hidden=true
    }

    checkHoles(){                                      //Lepsze rozmieszczenie dziur
    for(let i=0;i<this.holes.length-1;i++){                          // (Pozbycie się wiekszości dziur syjamskich
        for(let j=i+1;j<this.holes.length;j++){
            if(this.holes[j].style.left.slice(0,-2) > this.holes[i].style.left.slice(0,-2)+75 && this.holes[j].style.top.slice(0,-2) > this.holes[i].style.top.slice(0,-2)+75){
                this.holes[j].style.top = this.holes[j].style.top.slice(0,-2)+50+'px';
                this.holes[j].style.left = this.holes[j].style.left.slice(0,-2)+50+'px';
            }
        }
    }
}

    randomGoodHole(i){                               
        let goodHole = Math.floor(Math.random()*this.holes.length)
        if(goodHole == i && i< this.holes.length){
            i++
        }                  // uniknięcie pojawienia się dobrej dziury w tym samym miejscu
        else{
            i--
        }
        this.holes[goodHole].style.backgroundColor = 'green'
        this.holes[goodHole].style.zIndex = -1

    
    }

    changeLocation = (e) => {         
        this.speedX=e.gamma/35
        this.speedY=e.beta/35
    }

    moveBall = () => {                

        if(this.posX + this.speedX < window.innerWidth - 50 && this.posX + this.speedX > 0){  // ograniczenia kulki
            this.posX += this.speedX
            this.ball.style.left = this.posX + 'px'       
        }
        if(this.posY + this.speedY < window.innerHeight - 50 && this.posY + this.speedY > 0){
            this.posY += this.speedY
            this.ball.style.top = this.posY + 'px'
        }
        //Sprawdzanie kolizji z dziurami
        for(let i=0;i<this.holes.length;i++) {
            if(this.posY < Math.floor(this.holes[i].style.top.slice(0,-2)) + 50 && this.posY > this.holes[i].style.top.slice(0,-2)){
                if(this.posX > this.holes[i].style.left.slice(0,-2) && this.posX < Math.floor(this.holes[i].style.left.slice(0,-2)) + 50){
                    if(this.holes[i].style.backgroundColor == 'green'){
                        this.holes.forEach(e=>{if(e.style.backgroundColor == 'orange'){
                            e.style.backgroundColor = ''
                        }})
                        this.holes[i].style.backgroundColor = 'orange'
                        //this.score++
                        // counter.innerHTML="Score: "+score
                        this.randomGoodHole(i)
                    }
                    else if(this.holes[i].style.backgroundColor == 'black'){     
                    this.gameStart = false
                    window.prompt("Game over")
                    document.getElementById("restart").hidden = false
                }
            }
        }
        }
        if(this.gameStart==true){
            this.writeTimeToBoard();
            window.requestAnimationFrame(this.moveBall)
        }
    }


}