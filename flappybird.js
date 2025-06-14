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
let birdImgs = []; //animation change
let birdImgsIndex = 0;
let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

let velocityY = 0;
let gravity = 0.2;
let jumpPower = -6;

// Pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeGap = 150;
let pipeSpawnTimer = 0;

// Images

const topPipeImg = new Image();
const bottomPipeImg = new Image();

// game
let gameOver = false;
let score = 0;

window.onload = function () {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");

    canvas.width = boardWidth;
    canvas.height = boardHeight;

    //animation change
    for(let i = 0; i < 4; i++){
        let birdImg = new Image();
        birdImg.src = `./flappybird${i}.png`;
        birdImgs.push(birdImg);
    }

    topPipeImg.src = "./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";

   

    document.addEventListener("keydown", moveBird);
    document.addEventListener("touchstart", tmoveBird);

    canvas.addEventListener("click", function(){
        if(gameOver) restartGame();
    });

    requestAnimationFrame(update);
    setInterval(animateBird,100);
};
function animateBird(){
    //animation
    
    
    birdImgsIndex++;
    birdImgsIndex %=4;  //to keep for only 4 images
}

function update() {
    requestAnimationFrame(update);
    
    if (gameOver) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bird movement
    velocityY += gravity;
    bird.y += velocityY;
    ctx.drawImage(birdImgs[birdImgsIndex],bird.x, bird.y, bird.width, bird.height); //animation change

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

        //Collision Detection
        if (detectCollision(bird, pipe)){
            gameOver = true;
        }

        if(!pipe.passed && pipe.img === bottomPipeImg && pipe.x + pipe.width < bird.x) {
           pipe.passed = true;
           score++;
        }
    }
    //Game over message
    if(bird.y + bird.height >= boardHeight || bird.y < 0){
        gameOver = true;
    }

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 40);

    if(gameOver){
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", 90, 250);
        ctx.font = "20px Arial";
        ctx.fillText("Click to Restart", 105, 290);
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
        height: pipeHeight,
        passed: false
    };

    let bottomPipe = {
        img: bottomPipeImg,
        x: boardWidth,
        y: randomPipeY + pipeHeight + pipeGap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);
}
    
//Detection Collision Function
function detectCollision(a,b){
        return(
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
}
    
// Restart Game
function restartGame(){
        bird.y = boardHeight / 2;
        velocityY = 0;
        pipeArray = [];
        score = 0;
         gameOver = false;
}
    
