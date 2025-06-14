// Get the canvas element from the HTML file

let ctx;
let canvas;
// Set the game's dimensions
const boardWidth = 360;
const boardHeight = 640;

//bird
let birdHeight=24;
let birdWidth=34;
let birdX=boardwidth/8;
let birdY=boardHeight/2;
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height  : birdHeight
}
//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardwidth;
let pipeY = 0;

// Create Image objects to hold our pictures

const birdImg = new Image();
const topPipeImg = new Image();
const bottomPipeImg = new Image();

// This is the main starting point of our game.
// It will run only after the entire HTML page has finished loading.
window.onload = function() {
    // Tell the browser which image files to load
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");
    birdImg.src = "./flappybird.png";
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";
    birdImg.onload = function(){
        ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    }
    // Start the game's animation loop. The 'update' function will now run continuously.
    requestAnimationFrame(update);
    
}
function update(){


    requestAnimationFrame(update);

    ctx.clearRect(0,0,board.width,board.height);

    
    ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
}
