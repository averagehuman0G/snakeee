//implement a linkedlist (just what I need)
//use html5 canvas
const canvas = document.getElementById('snake-canvas');
const ctx = canvas.getContext('2d');
const squareSize = 64;
const gridSize = 608;

function drawSquare(x, y) {
    ctx.strokeRect(x, y, squareSize, squareSize);
}

for(let i = 0; i < gridSize; i += squareSize) {
    for(let j = 0; j < gridSize; j+= squareSize) {
        drawSquare(i, j);
    }
}
const startX = 0;
const startY = 0;

function drawSnake() {
    
}