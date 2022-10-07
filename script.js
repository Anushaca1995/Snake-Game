let canvas = document.querySelector(".game-area");
let width = canvas.width;
let height = canvas.height;
let length = [];
let food = {};
let score = 0;
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
    for (let index = 0; index < conf.size; index++) {
    // Add Snake Cells
        length.push({
            x: index,
            y: 0
        });
    }
};
//Draw Stage
const drawStage = () => {
  // Check Keypress And Set Stage direction
  let keyPress = snake_dir;
  if (typeof (keyPress) != 'undefined') {
    direction = keyPress;
  }
 // Draw purple Stage
  context.fillStyle = "#D6C0D4";
  //context.fillRect(x,y,width,height);
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
// Draw Snake
  for (var i = 0; i < length.length; i++) {
    var cell = length[i];
    drawCell(cell.x, cell.y);
  }
};
// Draw Cell
const drawCell = (x, y) => {
    context.fillStyle = '#071C02';
    context.beginPath();
    context.arc((x * conf.cw +6 ), (y * conf.cw + 6), 4, 0, 2 * Math.PI, false);
    context.fill();
  
  };



// Game Snake
const gameSnake = () => {
    let gamearea = document.querySelector(".game-area");
    context = gamearea.getContext("2d");
    initSnake();
    setInterval( () => {
        drawStage();
      }, conf.fps);
};
gameSnake();