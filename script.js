let canvas = document.querySelector(".canvas");
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


// Game Snake
const gameSnake = () => {
    let gamearea = document.querySelector(".canvas");
    context = gamearea.getContext("2d");
    initSnake();
};
gameSnake();