//implement a linkedlist (just what I need)
//use html5 canvas
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

function snakeNode(x, y) {
    this.x = x;
    this.y = y;
    this.next = null;
}

function makeFood() {
    const maxNumberOfFood = 10;
    const randomNumberOfFood = Math.floor(Math.random() * maxNumberOfFood + 1);
    for(let i = 0; i < 10; i++) {
        const randomX = Math.floor(Math.random() * squaresInGrid) * squareSize;    
        const randomY = Math.floor(Math.random() * squaresInGrid) * squareSize;
        console.log(randomX, randomY);
        ctx.drawImage(pin, randomX, randomY);
    }
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

function drawSnake() {
    let snakeOutline = 'white'; 
    //false is black and red is true;
    let filling = false;

    //iterate through the list drawing a rectangle and filling the rectangle    
    while(node) {
        ctx.fillStyle = filling ? 'red' : 'black'; 
        filling = !filling;
        ctx.fillStyle(node.x, node.y, squareSize, squareSize);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(node.x, node.y, squareSize, squareSize);
    }

}

let game = setInterval(drawSnake, 100);