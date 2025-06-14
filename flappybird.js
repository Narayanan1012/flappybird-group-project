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
let gravity = 0.25;
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

//audio
let wingsound = new Audio("./sfx_wing.wav");
let pointsound = new Audio("./sfx_point.wav");
let clashsound = new Audio("./sfx_hit.wav");
let bgm =  new Audio("./bgm_mario.mp3");

// game
let gameOver = false;
let gameStarted = false;
let score = 0;

window.onload = function () {
    bgm.loop= true;
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
    
    if(!gameStarted){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(birdImgs[birdImgsIndex],bird.x, bird.y, bird.width, bird.height);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Press Space To Start", 40, 250);
        return;
    }
    
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
        pipe.x -= 2.5;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        //Collision Detection
        if (detectCollision(bird, pipe)){
            gameOver = true;
            clashsound.play();
        }

        if(!pipe.passed && pipe.img === bottomPipeImg && pipe.x + pipe.width < bird.x) {
           pipe.passed = true;
           score++;
           pointsound.currentTime = 0;
           pointsound.play();

        }
    }
    //Game over message
    if(bird.y + bird.height >= boardHeight || bird.y < 0){
        gameOver = true;
        clashsound.play();
    }

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 40);

    if(gameOver){
        bgm.pause();
        ctx.drawImage(birdImgs[birdImgsIndex],bird.x, bird.y, bird.width, bird.height);
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
        if(!gameStarted){
            gameStarted = true;
            bgm.play();
        }
        wingsound.play();
        velocityY = jumpPower;
    }
}
function tmoveBird() {
    if(!gameStarted){
        gameStarted= true;
        bgm.play()
    }
    velocityY = jumpPower;
    wingsound.play();
}

// Create pipe pair
function placePipe() {
    if (gameOver || !gameStarted) {
        return;
    }

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
         gameStarted = false;
         bgm.currentTime = 0;
}
    
