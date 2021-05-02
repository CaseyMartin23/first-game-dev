const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
let numberOfResources = 300;

// mouse
const mouse = {
  x: undefined,
  height: undefined,
  width: 0.1,
  height: 0.1,
};

let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener("mouseleave", () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

console.log(canvasPosition);

// game board
const controlsBar = {
  width: canvas.width,
  height: cellSize,
};

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

const createGrid = () => {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      gameGrid.push(new Cell(x, y));
    }
  }
};
createGrid();

const handleGameGrid = () => {
  for (let idx = 0; idx < gameGrid.length; idx++) {
    gameGrid[idx].draw();
  }
};

// projectiles
// defenders
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
  }
}

canvas.addEventListener("click", () => {
  const gridPositionX = mouse.x - (mouse.x % cellSize);
  const gridPositionY = mouse.y - (mouse.y % cellSize);
  if (gridPositionY < cellSize) return;

  for (let index = 0; index < defenders.length; index++) {
    if (
      defenders[index].x === gridPositionX &&
      defenders[index].y === gridPositionY
    ) {
      return;
    }
  }

  let defenderCost = 100;
  if (numberOfResources >= defenderCost) {
    defenders.push(new Defender(gridPositionX, gridPositionY));
    numberOfResources -= defenderCost;
  }
});

const handleDefenders = () => {
  for (let index = 0; index < defenders.length; index++) {
    defenders[index].draw();
  }
};

// enemies
class Enemy {
  constructor(verticalPosition) {
    this.x = canvas.width;
    this.y = verticalPosition;
    this.width = cellSize;
    this.height = cellSize;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
  }
  update() {
    this.x -= this.movement;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
  }
}

// resources
// utilities
const handleGameStatus = () => {
  ctx.fillStyle = "gold";
  ctx.font = "30px Arial";
  ctx.fillText(`Resources: ${numberOfResources}`, 20, 55);
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);

  handleGameGrid();
  handleDefenders();
  handleGameStatus();

  window.requestAnimationFrame(animate);
};
animate();

const collision = (first, second) => {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  )
    return true;
};
