window.onload = function() {
    start();
  };

function start(){
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");




//load images

var bird= new Image();
var bg= new Image();
var fg= new Image();
var pipeNorth= new Image();
var pipeSouth= new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//some vars
var gap = 85;

var bx = 10;
var by = 150;

var score = 0;

var gravity = 0.9;
//audio

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


//on key down

function flap(){
    by -= 40;
    fly.play();
}

document.addEventListener("keydown", moveUp);

function moveUp(){
    flap();
}

//pipe coords

var pipe = [];

pipe[0] = {
    x: cvs.clientWidth,
    y: 0
}


//draw images
function draw(){
    var constant = pipeNorth.height+gap;


    
    ctx.drawImage(bg,0,0);
    
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 20){
            pipe.push({
                x:cvs.clientWidth,
                y:Math.floor(Math.random() * (pipeNorth.height - 100))-pipeNorth.height + 100
            });
        }

        // detect collision
        if(bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && 
            (by <= pipe[i].y + pipeNorth.height || by+bird.height >= pipe[i].y+constant) || by + bird.height >= cvs.height- fg.height){
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
    }



    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bx,by);

    by +=gravity


    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score, 10, cvs.height-20)

    requestAnimationFrame(draw);
}

draw();
}