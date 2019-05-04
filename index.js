function SnakeNode(x, y) {
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
}

function Snake(x, y) {
    const newNode = new SnakeNode(x, y);
    this.head = newNode;
    this.tail = newNode;
}

Snake.prototype.addHead = function (x, y) {
    const node = new SnakeNode(x, y);

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
};

Snake.prototype.removeTail = function () {
    this.tail = this.tail.prev; 
    this.tail.next = null;
}


//inital direction is right and will start at the top left
let direction = 'R';
let foodX = null;
let foodY = null;
let snakePoints = new Set();

const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const squareSize = 64;
const gridSize = 640;
const squaresInGrid = gridSize / squareSize;


const pinUrl = 'pin.png';
const pin = new Image();

pin.onload = function () {
    makeFood();
}
pin.src = pinUrl;


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
    const randomX = Math.floor(Math.random() * squaresInGrid) * squareSize;    
    const randomY = Math.floor(Math.random() * squaresInGrid) * squareSize;
    foodX = randomX;
    foodY = randomY;
    ctx.drawImage(pin, randomX, randomY);
}

function drawSquare(x, y) {
    ctx.strokeRect(x, y, squareSize, squareSize);
}

function makeGrid() {
    for(let i = 0; i < gridSize; i += squareSize) {
        for(let j = 0; j < gridSize; j+= squareSize) {
            drawSquare(i, j);
        }
    }
}

makeGrid();
makeFood();

const startX = 0;
const startY = 0;

let snake = new Snake(startX, startY);
let filling = false;

function printSnakePart(x, y) {
    ctx.fillStyle = filling ? 'red' : 'black'; 
    filling = !filling;
    ctx.fillRect(x, y, squareSize, squareSize);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, squareSize, squareSize);
}


function drawSnake() {
    //false is black and red is true;
    let node = snake.head; 

    let newX = snake.head.x; 
    let newY = snake.head.y;

    if(direction === "L") {
        console.log('going left')
        newX -= squareSize;
    } else if(direction === "U") {
        console.log('going up')
        newY -= squareSize;
    } else if(direction === "R") {
        console.log('going right')
        newX += squareSize;
    } else if(direction === "D") {
        console.log('going down')
        newY += squareSize;
    }


    let setKey = newX + ',' + newY;
    if(!valid(newX, newY) || snakePoints.has(setKey)) {
        //if we hit the outside or ourselves then gameover
        gameOver();    
    }

    printSnakePart(newX, newY);
    
    //if we eat the food then grow otherwise just move
    if(foodX === newX && foodY === newY) {
        //just add to the head of the snake;
        snake.addHead(newX, newY);
        snakePoints.add(setKey);
        //make new food
        makeFood();
    } else {
        
        const tailX = snake.tail.x;
        const tailY = snake.tail.y;
        const tailKey = tailX + ',' + tailY;

        snakePoints.add(setKey);
        snakePoints.delete(tailKey);

        snake.addHead(newX, newY);
        snake.removeTail();
        ctx.fillStyle = 'white';
        ctx.fillRect(tailX, tailY, squareSize, squareSize);
        ctx.strokeStyle = 'black';
        drawSquare(tailX, tailY);
        
        //remove the tail from the snake
    }
    
}

let game = setInterval(drawSnake, 100);

function gameOver() {
    clearInterval(game);
}

function valid(x, y) {
    return x >= 0 && x < gridSize && x % squareSize === 0 && y >= 0 && y < gridSize && y % squareSize === 0;
}