"use strict";

var canvas = document.querySelector(".game-area");
var width = canvas.width;
var height = canvas.height;
var length = [];
var food = {};
var flag;
var score = 0;
var pause = 0;
var direction = 'right';
var conf = {
  cw: 8,
  size: 4,
  fps: 250
};
var context = "";
var snake_dir = "";

var getPressKey = function getPressKey(key) {
  snake_dir = key;
}; // Init Snake


var initSnake = function initSnake() {
  // Itaration in Snake Conf Size
  for (var i = 0; i < conf.size; i++) {
    // Add Snake Cells
    length.push({
      x: i,
      y: 0
    });
  }
}; // Init Food  


var initFood = function initFood() {
  // Add food on stage
  food = {
    x: Math.round(Math.random() * (width - conf.cw) / conf.cw),
    y: Math.round(Math.random() * (height - conf.cw) / conf.cw)
  };
}; // Restart Stage


var restart = function restart() {
  length = [];
  food = {};
  score = 0;
  direction = 'right';
  initSnake();
  initFood();
};

var getRestart = function getRestart() {
  restart();
}; // Draw Stage


var drawStage = function drawStage() {
  // Check Keypress And Set Stage direction
  var keyPress = snake_dir;

  if (typeof keyPress != 'undefined') {
    direction = keyPress;
  } // Draw blue Stage


  context.fillStyle = "#D6C0D4"; //create filled rectangle context.fillRect(x,y,width,height);

  context.fillRect(0, 0, width, height); // Snake Position

  var nx = length[0].x;
  var ny = length[0].y; // Add position by stage direction

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
  } // Check Collision


  if (collision(nx, ny) == true) {
    if (flag) {
      alert("Game over");
      flag = 0;
    }

    restart();
    return;
  } // Logic of Snake food


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

  length.unshift(tail); // Draw Snake

  for (var i = 0; i < length.length; i++) {
    var cell = length[i];
    drawCell(cell.x, cell.y);
  } // Draw Food


  flag = 1;
  drawCell(food.x, food.y);
  document.querySelector(".score").innerText = "Score: " + score;
}; // Draw Cell


var drawCell = function drawCell(x, y) {
  context.fillStyle = '#071C02';
  context.beginPath();
  context.arc(x * conf.cw + 6, y * conf.cw + 6, 3, 0, 2 * Math.PI, false);
  context.fill();
}; // Check Collision with walls


var collision = function collision(nx, ny) {
  if (nx == -1 || nx == 37 || ny == -1 || ny == 19) {
    return true;
  }

  return false;
}; // Game Snake


var gameSnake = function gameSnake() {
  var gamearea = document.querySelector(".game-area");
  context = gamearea.getContext("2d");
  initSnake();
  initFood();
  setInterval(function () {
    drawStage();
  }, conf.fps);
};

gameSnake();