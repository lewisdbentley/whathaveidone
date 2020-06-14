document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startButton = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let score = 0
    let timerId
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ]
    
    // The Tetraminos
    const lTetramino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [width*2, 1, width+1, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ]
    
    const zTetramino = [
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1]
    ]
    
    const tTetramino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]
    
    const oTetramino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]
    
    const iTetramino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]
    
    const theTetraminos = [
        lTetramino, zTetramino, tTetramino, oTetramino, iTetramino
    ]
    
    let currentPosition = 4
    let currentRotation = 0
    
    // randomly select a tetramino's first rotation
    let random = Math.floor(Math.random()*theTetraminos.length)
    let current = theTetraminos[random][0]
    
    // draw the tetramino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetramino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }
    
    // undraw the tetramino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetramino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }
    
    // make the tetramino mvoe down every second
    // timerId = setInterval(moveDown, 1000)
    
    // move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    
    // assign functions to keycodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        }
        if(e.keyCode === 38) {
            rotate()
        }
        if(e.keyCode === 39) {
            moveRight()
        }
        if(e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)
    
    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start a new tetramino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetraminos.length)
            current = theTetraminos[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }
    
    // move the tetramino left unless there end of grid or there is a blockage
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    
        if(!isAtLeftEdge) {
            currentPosition -= 1
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1
        }    
        draw()
    }
    
    // move the tetramino left unless there end of grid or there is a blockage
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1)
    
        if(!isAtRightEdge) {
            currentPosition += 1
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1
        }
        draw()
    }
    
    // rotate the tetramino by moving to next item in array
    function rotate() {
        undraw()
        currentRotation++
        if(currentRotation === current.length ) { // if the current rotation is the last one go back to beginning
            currentRotation = 0
        }
        current = theTetraminos[random][currentRotation]
        draw()
    }
    
    // show p next tetramino in mini grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0
    
    // the tetraminos without rotations
    const upNextTetraminos = [
        [1, displayWidth+1, displayWidth*2+1, 2], // lTetramino
        [displayWidth*2, displayWidth+1, displayWidth*2+1, displayWidth+2], // zTetramino
        [1, displayWidth, displayWidth+1, displayWidth+2],// tTetramino
        [0, 1, displayWidth, displayWidth+1],// oTetramino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]// iTetramino
    ]
    
    // display the shape in the mni-grid display
    function displayShape() {
        // remove trace of tetramino from the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetramino')
            square.style.backgroundColor = ''
        })
        //add a class of tetramino to displaySquares from upNextTetraminos[nextRandom]
        upNextTetraminos[nextRandom].forEach(square => {
            displaySquares[displayIndex + square].classList.add('tetramino')
            displaySquares[displayIndex + square].style.backgroundColor = colors[nextRandom]
        })
    
    }
    
    //event listener for start button
    startButton.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 500)
            nextRandom = Math.floor(Math.random() * theTetraminos.length)
            displayShape()
        }
    })
    
    //add score
    function addScore() {
        for(let i = 0; i < 199; i+= width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetramino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver() {
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'end'
            clearInterval(timerId)
            document.removeEventListener('keyup', control)
        }
    }
})