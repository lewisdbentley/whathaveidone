// define elements to play with
const title = document.getElementById('title')
const play = document.getElementById('play')
const arrow = document.getElementById('arrow')
const next = document.getElementById('next')
const firstButton = document.getElementById('0')
const secondButton = document.getElementById('1')
const thirdButton = document.getElementById('2')
const fourthButton = document.getElementById('3')
const scoreKeeper = document.getElementById('scoreKeeper')
const totalKeeper = document.getElementById('total')
const percentKeeper = document.getElementById('percent')
const answerButtons = document.getElementById('middle')
const message = document.getElementById('message')

const birdArray = [
    'blackbird',
    'robin',
    'magpie',
    'sparrow',
    'blue tit',
    'skylark',
    'cuckoo',
    'starling',
    'wren',
    'thrush',
    'herring gull',
    'nightingale',
    'green woodpecker',
    'red kite',
    'barn owl',
    'canada goose'
]

const birdAssets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 , 13, 14, 15]

// define functionality
const audio = function() {
    note.play()
}

function random(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function getFourUnique(array) {
    fourUnique = []
    // add the first random bird to new array, and remove it from old array
    const first = array[random(array.length)]
    fourUnique.push(first)
    array = array.filter(bird => bird !== first)
    
    // add the second random bird to new array, and remove it from old array
    const second = array[random(array.length)]
    fourUnique.push(second)
    array = array.filter(bird => bird !== second)

    // add the third random bird to new array, and remove it from old array
    const third = array[random(array.length)]
    fourUnique.push(third)
    array = array.filter(bird => bird !== third)

    // add the fourth random bird to new array, and remove it from old array
    const fourth = array[random(array.length)]
    fourUnique.push(fourth)
    array = array.filter(bird => bird !== fourth)

    return fourUnique
}

const setup = function() {
    // get four random numbers
    fourUnique = getFourUnique(birdAssets)
    console.log(fourUnique)

    // setup the button content
    firstButton.textContent = birdArray[fourUnique[0]]
    secondButton.textContent = birdArray[fourUnique[1]]
    thirdButton.textContent = birdArray[fourUnique[2]]
    fourthButton.textContent = birdArray[fourUnique[3]]

    randomSelection = fourUnique[random(4)]
    console.log(randomSelection)

    note = new Audio(`./public/what-bird-is-that/birds/${randomSelection}.mp3`)
}
setup()

const wipe = function() {
    message.textContent = ''
    firstButton.style.backgroundColor = 'buttonface'
    secondButton.style.backgroundColor = 'buttonface'
    thirdButton.style.backgroundColor = 'buttonface'
    fourthButton.style.backgroundColor = 'buttonface'    
}

const checker = function(selection, event) {
        let score = Number(scoreKeeper.firstChild.nodeValue)
        let total = Number(totalKeeper.firstChild.nodeValue)
        total++
        totalKeeper.firstChild.nodeValue = total
        console.log(selection)
        const checkAnswer = Boolean(selection === randomSelection)
        event.target.style.backgroundColor = 'red'
        message.textContent = `Incorrect, try again.`
        if (checkAnswer) {
            score++
            scoreKeeper.firstChild.nodeValue = score
            event.target.style.backgroundColor = '#6BC74C'
            message.textContent = `Correct, it's a ${birdArray[randomSelection]}`
        }
        let percent = Math.floor((score / total) * 100)
        percentKeeper.firstChild.nodeValue = `(${percent}%)`
}

// interactive elements

play.addEventListener('click', function() {
    if(note.currentTime === 0) {
        arrow.removeAttribute('style')
        start = null
        progress = null
        myReq = window.requestAnimationFrame(step)
        audio()
    } else {
        window.cancelAnimationFrame(myReq)
        note.currentTime = 0
        note.pause()
    }
})

next.addEventListener('click', function(){
    arrow.removeAttribute('style')
    note.pause()
    note.currentTime = 0
    start = null
    progress = null
    wipe()
    setup()
    myReq = window.requestAnimationFrame(step) 
    audio()
})

firstButton.addEventListener('click', function(event) {
    checker(fourUnique[0], event)
})
secondButton.addEventListener('click', function(event) {
    checker(fourUnique[1], event)
})
thirdButton.addEventListener('click', function(event) {
    checker(fourUnique[2], event)
})
fourthButton.addEventListener('click', function(event) {
    checker(fourUnique[3], event)
})

// animation

let start;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  arrow.style.transform = 'translateX(' + Math.min(progress / 10, 200) + 'px)';
  if (progress < 4000) {
    myReq = window.requestAnimationFrame(step);
  }
}