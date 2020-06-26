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
    {
        name: 'blackbird',
        scientificName: 'Turdus merula',
        songs: [1, 2, 3]
    },
    {
        name: 'robin',
        scientificName: 'Erithacus rubecula',
        songs: [4, 5, 6]
    },
    {
        name: 'magpie',
        scientificName: 'Pica pica',
        songs: [7, 8, 9]
    },
    {
        name: 'house sparrow',
        scientificName: 'Passer domesticus',
        songs: [10, 11, 12]
    },
    {
        name: 'blue tit',
        scientificName: 'Cyanistes caeruleus',
        songs: [13, 14, 15]
    },
    {
        name: 'skylark',
        scientificName: 'Alauda arvensis',
        songs: [16, 17, 18]
    },
    {
        name: 'cuckoo',
        scientificName: 'Acuculus canorus',
        songs: [19, 20, 21]
    },
    {
        name: 'starling',
        scientificName: 'Sturnus vulgaris',
        songs: [22, 23, 24]
    },
    {
        name: 'Eurasian wren',
        scientificName: 'Troglodytes troglodytes',
        songs: [25, 26, 27]
    },
    {
        name: 'song thrush',
        scientificName: 'Turdus philomelos',
        songs: [28, 29, 30]
    },
    {
        name: 'herring gull',
        scientificName: 'Larus argentatus',
        songs: [31, 32, 33]
    },
    {
        name: 'nightingale',
        scientificName: 'Luscinia megarhynchos',
        songs: [34, 35, 36]
    },
    {
        name: 'European green woodpecker',
        scientificName: 'Picus viridis',
        songs: [37, 38, 39]
    },
    {
        name: 'red kite',
        scientificName: 'Milvus milvus',
        songs: [40, 41, 42]
    },
    {
        name: 'Western barn owl',
        scientificName: 'Tyto alba',
        songs: [43, 44, 45]
    },
    {
        name: 'canada goose',
        scientificName: 'Branta canadensis',
        songs: [46, 47, 48]
    },
    {
        name: 'Eurasian bittern',
        scientificName: 'Botaurus stellaris',
        songs: [49, 50, 51]
    },
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

    // setup the button content
    firstButton.textContent = birdArray[fourUnique[0]].name
    secondButton.textContent = birdArray[fourUnique[1]].name
    thirdButton.textContent = birdArray[fourUnique[2]].name
    fourthButton.textContent = birdArray[fourUnique[3]].name

    randomSelection = birdArray[fourUnique[random(4)]]
    console.log(randomSelection)
    randomSong = randomSelection.songs[random(3)]
    console.log(randomSong)

    note = new Audio(`./public/what-bird-is-that/birds/${randomSong}.mp3`)
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
            message.textContent = `Correct, it's a ${randomSelection.name}, \(${randomSelection.scientificName}\)`
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
        window.requestAnimationFrame(step) 
        audio()
    } else {
        note.pause()
        note.currentTime = 0
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
    window.requestAnimationFrame(step) 
    audio()
})

firstButton.addEventListener('click', function(event) {
    checker(birdArray[fourUnique[0]], event)
})
secondButton.addEventListener('click', function(event) {
    checker(birdArray[fourUnique[1]], event)
})
thirdButton.addEventListener('click', function(event) {
    checker(birdArray[fourUnique[2]], event)
})
fourthButton.addEventListener('click', function(event) {
    checker(birdArray[fourUnique[3]], event)
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