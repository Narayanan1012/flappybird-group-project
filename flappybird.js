const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boardWidth = 360;
const boardHeight = 640;

// Set the canvas dimensions in JavaScript
canvas.width = boardWidth;
canvas.height = boardHeight;

// Load images
const backgroundImg = new Image();
backgroundImg.src = "./flappybirdbg.png";

const birdImg = new Image();
birdImg.src = "./flappybird.png";

const topPipeImg = new Image();
topPipeImg.src = "./toppipe.png";

const bottomPipeImg = new Image();
bottomPipeImg.src = "./bottompipe.png";

// Bird setup
const bird = {
    x: boardWidth / 8,
    y: boardHeight / 2,
    width: 34,
    height: 24,
    img: birdImg
};

// Pipe setup
const pipe = {
    x: boardWidth,
    y: 0,
    width: 64,
    height: 512,
    topImg: topPipeImg,
    bottomImg: bottomPipeImg
};

// Draw initial setup only after the main background image has loaded
backgroundImg.onload = function() {
    draw();
};

function draw() {
    ctx.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);
    ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
    
    // Example pipe drawing
    let openingSpace = 120; // The space between the top and bottom pipe
    ctx.drawImage(pipe.topImg, pipe.x, pipe.y, pipe.width, pipe.height);
    ctx.drawImage(pipe.bottomImg, pipe.x, pipe.y + pipe.height + openingSpace, pipe.width, pipe.height);
}
