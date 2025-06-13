// Get the canvas element from the HTML file
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Set the game's dimensions
const boardWidth = 360;
const boardHeight = 640;
canvas.width = boardWidth;
canvas.height = boardHeight;

// Create Image objects to hold our pictures
const backgroundImg = new Image();
const birdImg = new Image();
const topPipeImg = new Image();
const bottomPipeImg = new Image();

// This is the main starting point of our game.
// It will run only after the entire HTML page has finished loading.
window.onload = function() {
    // Tell the browser which image files to load
    backgroundImg.src = "./flappybirdbg.png";
    birdImg.src = "./flappybird.png";
    topPipeImg.src = "./toppipe.png";
    bottomPipeImg.src = "./bottompipe.png";

    // Start the game's animation loop. The 'update' function will now run continuously.
    requestAnimationFrame(update);
}
