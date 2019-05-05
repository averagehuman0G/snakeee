//Things to work on:
//food that doesn't spawn on the snake
//print "game over on the board"
//mobile friendly

const startX = 0;
const startY = 0;

let direction;
let foodX;
let foodY;
let snakePoints;
let snake;
let filling;

//inital direction is right and will start at the top left
function newGame() {
    makeGrid();
    makeFood();
    direction = 'R';
    snakePoints = new Set();
    snake = new Snake(startX, startY);
    filling = false;
    //always draw out a snake head at the beggining of the game
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, squareSize, squareSize);
}

const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const squareSize = 64;
const gridSize = 640;
const squaresInGrid = gridSize / squareSize;


const pinUrl = 'pin.png';
const pin = new Image();

pin.src = pinUrl;
pin.onload = function () {
    newGame();
}



function keyPressed(e) {
    e.preventDefault();
    if(e.keyCode === 37 && direction !== "R") {
        direction = "L";
    } else if(e.keyCode === 38 && direction !== "D") {
        direction = "U";
    } else if(e.keyCode === 39 && direction !== "L") {
        direction = "R";
    } else if(e.keyCode === 40 && direction !== "U") {
        direction = "D";
    }
}

document.addEventListener('keydown', keyPressed);


function makeFood() {
    foodX = Math.floor(Math.random() * squaresInGrid) * squareSize;    
    foodY = Math.floor(Math.random() * squaresInGrid) * squareSize;
    ctx.drawImage(pin, foodX, foodY);
}

function drawSquare(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, squareSize, squareSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, squareSize, squareSize);
}

function makeGrid() {
    for(let i = 0; i < gridSize; i += squareSize) {
        for(let j = 0; j < gridSize; j+= squareSize) {
            drawSquare(i, j);
        }
    }
}


function printSnakePart(x, y) {
    ctx.fillStyle = filling ? 'red' : 'black'; 
    filling = !filling;
    ctx.fillRect(x, y, squareSize, squareSize);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, squareSize, squareSize);
    //debugger;
}


function drawSnake() {
    //we have printed the entire snake
        //all we need to do is before you print the new head
        //check if it is valid
        //if it is then print it
            //check if we ate the food or we didn't
        //if it isn't then game over

    let newX = snake.head.x; 
    let newY = snake.head.y;

    
    //then build and attach the new head

    if(direction === "L") {
        newX -= squareSize;
    } else if(direction === "U") {
        newY -= squareSize;
    } else if(direction === "R") {
        newX += squareSize;
    } else if(direction === "D") {
        newY += squareSize;
    }

    let headKey = newX + ',' + newY;

    if(!valid(newX, newY) || snakePoints.has(headKey)) {
        gameOver();    
    } else {
        printSnakePart(newX, newY);
        snakePoints.add(headKey);
        snake.addHead(newX, newY);
        //if we eat the food then grow otherwise just move
        if(foodX === newX && foodY === newY) {
            //just add to the head of the snake;
            //make new food
            makeFood();
        } else {
            const tailX = snake.tail.x;
            const tailY = snake.tail.y;
            const tailKey = tailX + ',' + tailY;

            snakePoints.delete(tailKey);
            snake.removeTail();
            //empty's out the previous grid with the drawing of the snake
            drawSquare(tailX, tailY);
        }
    }

}

const restartBtn = document.getElementById('restart');

restartBtn.addEventListener('click', function () {
    newGame();
    game = setInterval(drawSnake, 150);
});

function gameOver() {
    clearInterval(game);
}

function valid(x, y) {
    return x >= 0 && x < gridSize && x % squareSize === 0 && y >= 0 && y < gridSize && y % squareSize === 0;
}

let game = setInterval(drawSnake, 150);