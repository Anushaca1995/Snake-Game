let canvas = document.querySelector(".game-area");
let width = canvas.width;
let height = canvas.height;
let length = [];
let food = {};
let flag;
let score = 0;
let pause = 0;
let direction = 'right';
let conf = {
  cw: 8,
  size: 4,
  fps: 250
};
let context = "";
let snake_dir = "";

const getPressKey = (key) => {
  snake_dir = key;
}

// Init Snake
const initSnake = () => {
  // Itaration in Snake Conf Size
  for (var i = 0; i < conf.size; i++) {
    // Add Snake Cells
    length.push({
      x: i,
      y: 0
    });
  }
};

// Init Food  
const initFood = () => {
  // Add food on stage
  food = {
    x: Math.round(Math.random() * (width - conf.cw) / conf.cw),
    y: Math.round(Math.random() * (height - conf.cw) / conf.cw),
  };
};

// Restart Stage
const restart = () => {
  length = [];
  food = {};
  score = 0;
  direction = 'right';
  initSnake();
  initFood();
};

const getRestart = () => {
  restart();
}

// Draw Stage
const drawStage = () => {
  // Check Keypress And Set Stage direction
  let keyPress = snake_dir;
  if (typeof (keyPress) != 'undefined') {
    direction = keyPress;
  }
  // Draw blue Stage
  context.fillStyle = "#D6C0D4";
  //create filled rectangle context.fillRect(x,y,width,height);
  context.fillRect(0, 0, width, height);
  // Snake Position
  var nx = length[0].x;
  var ny = length[0].y;
  // Add position by stage direction
  switch (direction) {
    case 'right':
      nx++;
      break;
    case 'left':
      nx--;
      break;
    case 'up':
      ny--;
      break;
    case 'down':
      ny++;
      break;
  }
  // Check Collision
  if (collision(nx, ny) == true) {
    if (flag) {
      alert("Game over");
      flag = 0;
    }
    restart();
    return;
  }
  // Logic of Snake food
  if (nx == food.x && ny == food.y) {
    var tail = {
      x: nx,
      y: ny
    };
    score++;
    initFood();
  } else {
    var tail = length.pop();
    tail.x = nx;
    tail.y = ny;
  }
  length.unshift(tail);
  // Draw Snake
  for (var i = 0; i < length.length; i++) {
    var cell = length[i];
    drawCell(cell.x, cell.y);
  }
  // Draw Food
  flag = 1;
  drawCell(food.x, food.y);
  document.querySelector(".score").innerText = "Score: " + score;
};

// Draw Cell
const drawCell = (x, y) => {
  context.fillStyle = '#071C02';
  context.beginPath();
  context.arc((x * conf.cw + 6), (y * conf.cw + 6), 3, 0, 2 * Math.PI, false);
  context.fill();

};

// Check Collision with walls
const collision = (nx, ny) => {
  if (nx == -1 || nx == 37 || ny == -1 || ny == 19) {
    return true;
  }
  return false;
}

// Game Snake
const gameSnake = () => {
  context = canvas.getContext("2d");
  initSnake();
  initFood();
  setInterval(() => {
    drawStage();
  }, conf.fps);
};

gameSnake();