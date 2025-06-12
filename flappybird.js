//samantha.world//sdd
<!DOCTYPE html>
<html>
<head>
    <title>Flappy Bird Setup</title>
    <style>
        canvas {
            background: #70c5ce;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="360" height="640"></canvas>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const boardWidth = canvas.width;
        const boardHeight = canvas.height;

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

        // Draw initial setup
        backgroundImg.onload = function() {
            draw();
        };

        function draw() {
            ctx.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);
            ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
            ctx.drawImage(pipe.topImg, pipe.x, pipe.y, pipe.width, pipe.height);
            ctx.drawImage(pipe.bottomImg, pipe.x, pipe.y + pipe.height + 100, pipe.width, pipe.height);
        }
    </script>
</body>
</html>
