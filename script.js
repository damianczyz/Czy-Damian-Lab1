const boomSound = document.querySelector('#boom')
const clapSound = document.querySelector('#clap')
const hihatSound = document.querySelector('#hihat')
const kickSound = document.querySelector('#kick')
const openhatSound = document.querySelector('#openhat')
const rideSound = document.querySelector('#ride')
const snareSound = document.querySelector('#snare')
const tinkSound = document.querySelector('#tink')
const tomSound = document.querySelector('#tom')


const channel1Rec = document.querySelector('#ch1RecBttn')
const channel1Play = document.querySelector('#ch1PlayBttn')

const channel2Rec = document.querySelector('#ch2RecBttn')
const channel2Play = document.querySelector('#ch2PlayBttn')

const channel3Rec = document.querySelector('#ch3RecBttn')
const channel3Play = document.querySelector('#ch3PlayBttn')

const channel4Rec = document.querySelector('#ch4RecBttn')
const channel4Play = document.querySelector('#ch4PlayBttn')

const channel1 = []
const channel2 = []
const channel3 = []
const channel4 = []

let channel1StartTime = 0
let channel2StartTime = 0
let channel3StartTime = 0
let channel4StartTime = 0

document.body.addEventListener('keypress', playAudio)
document.body.addEventListener('keypress', playAudio2)
document.body.addEventListener('keypress', playAudio3)
document.body.addEventListener('keypress', playAudio4)


    document.querySelector('#ch1RecBttn').addEventListener('click', ch1Rec)

    document.querySelector('#ch1PlayBttn').addEventListener('click', ch1Play)

    document.querySelector('#ch2RecBttn').addEventListener('click', ch2Rec)

    document.querySelector('#ch2PlayBttn').addEventListener('click', ch2Play)

    document.querySelector('#ch3RecBttn').addEventListener('click', ch3Rec)

    document.querySelector('#ch3PlayBttn').addEventListener('click', ch3Play)

    document.querySelector('#ch4RecBttn').addEventListener('click', ch4Rec)

    document.querySelector('#ch4PlayBttn').addEventListener('click', ch4Play)

    function ch1Rec() {
        channel1StartTime = Date.now()
        }

    function ch2Rec() {
        channel2StartTime = Date.now()
        }

    function ch3Rec() {
        channel3StartTime = Date.now()
        }

    function ch4Rec() {
        channel4StartTime = Date.now()
        }


    function ch1Play() {
        channel1.forEach(el => { 
        setTimeout(playSound, el.time, el.code)
        })
        }

        function ch2Play() {
        channel2.forEach(el => { 
        setTimeout(playSound, el.time, el.code)
        })
        }

        function ch3Play() {
        channel3.forEach(el => { 
        setTimeout(playSound, el.time, el.code)
        })
        }

        function ch4Play() {
        channel4.forEach(el => { 
        setTimeout(playSound, el.time, el.code)
        })
        }

        function playSound(code) {
            switch (code) {
                case 'KeyA':
                    boomSound.currentTime = 0
                    boomSound.play()
                    break
                case 'KeyS':
                    clapSound.currentTime = 0
                    clapSound.play()
                    break
                case 'KeyD':
                    hihatSound.currentTime = 0
                    hihatSound.play()
                    break
                case 'KeyF':
                    kickSound.currentTime = 0
                    kickSound.play()
                    break
                case 'KeyG':
                    openhatSound.currentTime = 0
                    openhatSound.play()
                    break
                case 'KeyH':
                    rideSound.currentTime = 0
                    rideSound.play()
                    break
                case 'KeyJ':
                    snareSound.currentTime = 0
                    snareSound.play()
                    break
                case 'KeyK':
                    tinkSound.currentTime = 0
                    tinkSound.play()
                    break
                case 'KeyL':
                    tomSound.currentTime = 0
                    tomSound.play()
                    break
            }
        }

        function playAudio(e) {
            playSound(e.code)
            const time = Date.now() - channel1StartTime
            channel1.push({
                code: e.code,
                time: time
            })
        }

        function playAudio2(e) {
            playSound(e.code)
            const time = Date.now() - channel2StartTime
            channel2.push({
                code: e.code,
                time: time
            })
        }

        function playAudio3(e) {
            playSound(e.code)
            const time = Date.now() - channel3StartTime
            channel3.push({
                code: e.code,
                time: time
            })
        }

        function playAudio4(e) {
            playSound(e.code)
            const time = Date.now() - channel4StartTime
            channel4.push({
                code: e.code,
                time: time
            })
        }


