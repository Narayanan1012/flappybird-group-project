let ctx;
let canvas;

// Set the game's dimensions
const boardWidth = 360;
const boardHeight = 640;

// bird
let birdHeight = 24;
let birdWidth = 34;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

// Images
const birdImg = new Image();
const topPipeImg = new Image();
const bottomPipeImg = new Image();

window.onload = function () {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    birdImg.src = "./flappybird.png";
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";

    birdImg.onload = function () {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    requestAnimationFrame(update);
};

function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}
