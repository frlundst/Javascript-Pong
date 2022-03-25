class Ball {
    constructor(size, x, y, xv, yv) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
    }
}

class Player {
    constructor(xs, ys, x, y, yv, score) {
        this.xs = xs;
        this.ys = ys;
        this.x = x;
        this.y = y;
        this.yv = yv;
        this.score = score;
    }
}

canvas = document.getElementById("pongCanvas");
context = canvas.getContext("2d");
window.addEventListener('keydown', movement, false);

const FPS = 60;
const ball = new Ball(10, canvas.width / 2, canvas.height / 2, 3, 0.5);
const player1 = new Player(5, 50, 0, canvas.height / 2 - 25, 0, 0);
const player2 = new Player(5, 50, canvas.width - 5, canvas.height / 2 - 25, 0, 0);

setInterval(update, 1000 / FPS);

function movement(e){
    var key = e.key;

    //Player1
    if(key === 'w'){
        player1.y = player1.y - 20;
    }
    if(key === 's'){
        player1.y = player1.y + 20;
    }

    //Player2
    if(key === 'ArrowUp'){
        player2.y = player2.y - 20;
    }
    if(key === 'ArrowDown'){
        player2.y = player2.y + 20;
    }
}

function update() {
    //Update ball movement
    ball.x += ball.xv;
    ball.y += ball.yv;

    //Bounce on player1
    if (ball.x <= player1.x && ball.y >= player1.y && ball.y <= player1.y + player1.ys) {
        ball.xv = -ball.xv * 1.05;
        ball.yv = ball.yv * 1.05;
    }

    //Bounce on player2
    if (ball.x >= player2.x && ball.y >= player2.y && ball.y <= player2.y + player2.ys) {
        ball.xv = -ball.xv * 1.05;
        ball.yv = ball.yv * 1.05;
    }

    //Bounce of floor and roof
    if(ball.y >= canvas.height - ball.size || ball.y <= 0){
        ball.yv = -ball.yv;
    }

    //Score
    if(ball.x <= -player2.xs){
        player2.score = player2.score + 1;
        newRound();
    }
    if(ball.x >= canvas.width){
        player1.score = player1.score + 1;
        newRound();
    }

    //Background
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillText(player1.score + ' : ' + player2.score, canvas.width / 2 - 30, 50);

    //Ball
    context.fillStyle = "white";
    context.fillRect(ball.x, ball.y, ball.size, ball.size);

    //Player1
    context.fillStyle = "red";
    context.fillRect(player1.x, player1.y, player1.xs, player1.ys);

    //Player2
    context.fillStyle = "blue";
    context.fillRect(player2.x, player2.y, player2.xs, player2.ys);
}

function newRound(){
    player1.y = canvas.height / 2 - 25;
    player2.y = canvas.height / 2 - 25;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.xv = 3;
    ball.yv = 0.5;
}