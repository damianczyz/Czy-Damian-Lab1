const TOOLS = {
    BRUSH: 'brush',
    PENCIL: 'pencil',
}

const current = document.querySelector('.js-current-tool');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let loadImage = document.getElementById('load')
const image = new Image()
const btnRedFilter = document.getElementById('redFilter')
const btnBlackAndWhiteFilter = document.getElementById('blackAndWhite')
const brightness = document.getElementById('brightness')
const red = document.querySelector('[data-color = "red"]')
const green = document.querySelector('[data-color = "green"]')
const blue = document.querySelector('.blue')
const orange = document.querySelector('.orange')
const black = document.querySelector('.black')
const colors = [... document.querySelectorAll('div[data-color]')]
const btnReset = document.querySelector('#reset')
let tool = null

let drawing = false

const loadInputHandler = (e) => {

    const imageFile = e.target.files[0]
    image.setAttribute('src', URL.createObjectURL(imageFile))
    image.addEventListener('load', function(){
        ctx.drawImage(image, 0, 0, 1250, 600)
    })
}

loadImage.onchange = loadInputHandler

brightness.addEventListener('input', function() {
    var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    for(let i = 0; i<canvasData.data.length; i+=4) {
        canvasData.data[i] += 255 * (brightness.value/100)
        canvasData.data[i+1] += 255 * (brightness.value/100)
        canvasData.data[i+2] += 255 * (brightness.value/100)

    }
  ctx.putImageData(canvasData, 0, 0)
})


btnRedFilter.addEventListener('click', function(){
    var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for(var i = 0; i < pixelData.data.length; i += 4) {

        pixelData.data[i + 1] = 0
        pixelData.data[i + 2] = 0
      }

      ctx.putImageData(pixelData, 0, 0)
})

btnBlackAndWhiteFilter.addEventListener('click', function(){
    var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    for(var i = 0; i < pixelData.data.length; i += 4) {

        var blackWhite = 0.2 * pixelData.data[i] +  0.72 * pixelData.data[i + 1] + 0.07 * pixelData.data[i + 2]
      
        pixelData.data[i] = blackWhite
        pixelData.data[i + 1] = blackWhite
        pixelData.data[i + 2] = blackWhite
      }

      ctx.putImageData(pixelData, 0, 0)
})



function removeActive() {
    document.querySelectorAll('.js-tool').forEach(t => t.classList.remove('selected'))
}

function setActive(element) {
    element.classList.add('selected')
}

document.querySelectorAll('.js-tool')
    .forEach(t => t.addEventListener('click', ev => {
        const selectedTool = ev.target
        tool = selectedTool.getAttribute('data-tool')
        removeActive();
        setActive(selectedTool);
        current.textContent = tool;
    }))

canvas.addEventListener('mousemove', (ev) => {
    if (tool === TOOLS.PENCIL && drawing) {
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.strokeStyle = changeColor()
        ctx.lineTo(ev.offsetX, ev.offsetY)
        ctx.stroke()
    } else if (tool === TOOLS.BRUSH && drawing) {
        ctx.lineWidth = 5
        ctx.lineCap = 'round'
        ctx.strokeStyle = changeColor()
        ctx.lineTo(ev.offsetX, ev.offsetY)
        ctx.stroke()
    }
})

const resetCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


btnReset.addEventListener('click', resetCanvas)

const changeColor = () =>{
    for (let i = 0; i<colors.length; i++){
        if((colors[i].classList.contains('active')) && (colors[i].classList.contains('red')))
        ctx.strokeStyle = '#E94F4A'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('blue')))
        ctx.strokeStyle = '#6E90EE'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('orange')))
        ctx.strokeStyle = '#FFA41B'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('black')))
        ctx.strokeStyle = 'black'
        else if((colors[i].classList.contains('active')) && (colors[i].classList.contains('green')))
        ctx.strokeStyle = '#3DA20B'
    }
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
    else if(e.target.dataset.color === "black"){
        black.classList.add('active')
    }

}


red.addEventListener('click', changeActiveDot)
green.addEventListener('click', changeActiveDot)
blue.addEventListener('click', changeActiveDot)
orange.addEventListener('click', changeActiveDot)
black.addEventListener('click', changeActiveDot)

canvas.addEventListener('pointerdown', (ev) => {
    if ([TOOLS.BRUSH, TOOLS.PENCIL].includes(tool)) {
        if (!drawing) {
            drawing = true
        }
    }
})

canvas.addEventListener('pointerup', () => {
    drawing = false
    ctx.beginPath()
})