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

