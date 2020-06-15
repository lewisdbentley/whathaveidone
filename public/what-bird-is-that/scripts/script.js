// define elements to play with
const title = document.getElementById('title')
const play = document.getElementById('play')
const arrow = document.getElementById('arrow')
const next = document.getElementById('next')
const blackbirdButton = document.getElementById('0')
const robinButton = document.getElementById('1')
const magpieButton = document.getElementById('2')
const sparrowButton = document.getElementById('3')
const scoreKeeper = document.getElementById('scoreKeeper')
const totalKeeper = document.getElementById('total')
const percentKeeper = document.getElementById('percent')
const answerButtons = document.getElementById('middle')
const message = document.getElementById('message')

const birdArray = [
    'a blackbird',
    'a robin',
    'a magpie',
    'a sparrow',
]

// define functionality
const audio = function() {
    note.play()
}

function random (max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const setup = function() {
    randomSelection = random(4)
    console.log(randomSelection)
    note = new Audio(`./public/what-bird-is-that/birds/${randomSelection}.mp3`)
    // console.log(randomSelection2)
    // console.log(`the interval of ${intervalArray[interval]}`)
    message.textContent = ''
    blackbirdButton.style.backgroundColor = 'buttonface'
    robinButton.style.backgroundColor = 'buttonface'
    magpieButton.style.backgroundColor = 'buttonface'
    sparrowButton.style.backgroundColor = 'buttonface'
}
setup()

const checker = function(selection, event) {
        let score = Number(scoreKeeper.firstChild.nodeValue)
        let total = Number(totalKeeper.firstChild.nodeValue)
        total++
        totalKeeper.firstChild.nodeValue = total
        const checkAnswer = Boolean(selection === randomSelection)
        event.target.style.backgroundColor = 'red'
        message.textContent = `Incorrect, try again.`
        if (checkAnswer) {
            score++
            scoreKeeper.firstChild.nodeValue = score
            event.target.style.backgroundColor = 'green'
            message.textContent = `Correct, it's ${birdArray[randomSelection]}`
        }
        let percent = Math.floor((score / total) * 100)
        percentKeeper.firstChild.nodeValue = `(${percent}%)`
}

// interactive elements

play.addEventListener('click', function() {
    arrow.removeAttribute('style')
    start = null
    progress = null
    window.requestAnimationFrame(step) 
    audio()
})

next.addEventListener('click', function(){
    arrow.removeAttribute('style')
    note.pause()
    note.currentTime = 0
    start = null
    progress = null
    setup()
})

blackbirdButton.addEventListener('click', function(event) {
    checker(0, event)
})
robinButton.addEventListener('click', function(event) {
    checker(1, event)
})
magpieButton.addEventListener('click', function(event) {
    checker(2, event)
})
sparrowButton.addEventListener('click', function(event) {
    checker(3, event)
})

// animation

let start;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  arrow.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  if (progress < 4000) {
    window.requestAnimationFrame(step);
  }
}