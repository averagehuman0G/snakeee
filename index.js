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

function Snake(x, y) {
    let snakeNode = new SnakeNode(x, y);
    this.head = snakeNode;
    this.tail = snakeNode;
}

function SnakeNode(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
    this.prev = null;
}

Snake.prototype.addHead = function (x, y) {
    const nextElem = this.head;
    const newHead = new SnakeNode(x, y);
    this.head = newHead;
    newHead.next = nextElem;
    nextElem.prev = newHead;
}

Snake.prototype.removeTail = function () {
    const oldTail = this.tail;
    const newTail = oldTail.prev;
    oldTail.prev = null;
    this.tail = newTail;
}

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


for(let i = 0; i < gridSize; i += squareSize) {
    for(let j = 0; j < gridSize; j+= squareSize) {
        drawSquare(i, j);
    }
}
makeFood();

const startX = 0;
const startY = 0;

let snake = new Snake(startX, startY);

function drawSnake() {
    let snakeOutline = 'white'; 
    //false is black and red is true;
    let filling = false;
    let node = snake.head; 
    //iterate through the list drawing a rectangle and filling the rectangle    
    while(node) {
        ctx.fillStyle = filling ? 'red' : 'black'; 
        filling = !filling;
        ctx.fillRect(node.x, node.y, squareSize, squareSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(node.x, node.y, squareSize, squareSize);
        node = node.next;
    }
    let newX = snake.head.x; 
    let newY = snake.head.y;
    console.log(direction);
    if(direction === "L") {
        //add a new head going to the left
        newX = snake.head.x - squareSize;
    } else if(direction === "U") {
        newY = snake.head.y - squareSize;
    } else if(direction === "R") {
        newX = snake.head.x + squareSize;
    } else if(direction === "D") {
        newY = snake.head.y + squareSize;
    }
    let setKey = newX + ',' + newY;
    if(!valid(newX, newY) || snakePoints.has(setKey)) {
        //if we hit the outside or ourselves then gameover
        gameOver();    
    }
    //if we eat the food then grow otherwise just move
    if(foodX === newX && foodY === newY) {
        //just add to the head of the snake;
        snake.addHead(newX, newY);
    } else {
        //remove the tail from the snake
        snake.addHead(newX, newY);
        snake.removeTail();
    }
    snakePoints.add(setKey);
}

let game = setInterval(drawSnake, 100);

function gameOver() {
    clearInterval(game);
}

function valid(x, y) {
    return x >= 0 && x < gridSize && x % squareSize === 0 && y >= 0 && y < gridSize && y % squareSize === 0;
}