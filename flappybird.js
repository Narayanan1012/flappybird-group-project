let ctx;
let canvas;

// Game dimensions
const boardWidth = 360;
const boardHeight = 640;

// Bird
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

let velocityY = 0;
let gravity = 0.2;
let jumpPower = -8;

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeGap = 150;
let pipeSpawnTimer = 0;

// Images
const birdImg = new Image();
const topPipeImg = new Image();
const bottomPipeImg = new Image();

window.onload = function () {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    canvas.width = boardWidth;
    canvas.height = boardHeight;

    birdImg.src = "./flappybird.png";
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";

    birdImg.onload = function () {
        ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    };

    document.addEventListener("keydown", moveBird);
    document.addEventListener("touchstart", tmoveBird);

    requestAnimationFrame(update);
};

function update() {
    requestAnimationFrame(update);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bird movement
    velocityY += gravity;
    bird.y += velocityY;
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Pipe logic
    pipeSpawnTimer++;
    if (pipeSpawnTimer > 90) {
        placePipe();
        pipeSpawnTimer = 0;
    }

    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x -= 2;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
    
}

// Bird jump
function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        velocityY = jumpPower;
    }
}
function tmoveBird() {
    velocityY = jumpPower;
}

// Create pipe pair
function placePipe() {
    let randomPipeY = -pipeHeight / 4 - Math.random() * (pipeHeight / 2);

    let topPipe = {
        img: topPipeImg,
        x: boardWidth,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight
    };

    let bottomPipe = {
        img: bottomPipeImg,
        x: boardWidth,
        y: randomPipeY + pipeHeight + pipeGap,
        width: pipeWidth,
        height: pipeHeight
    };

    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);
}
