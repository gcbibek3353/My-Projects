const canvas = document.getElementById("myGame");
const context = canvas.getContext("2d");

// buttons 
const buttons = document.getElementById("buttons");
const leftCom = document.getElementById("left-com");
const rightCom = document.getElementById("right-com");
const leftUser = document.getElementById("left-user");
const rightUser = document.getElementById("right-user");

// Draw rectangle
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);
}

// Computer paddle object
const com={
    x:canvas.width/2-50/2,
    y:10,
    width:80,
    height:10,
    color:"white",
    score:0
}

// User paddle object
const user={
    x:canvas.width/2-50/2,
    y:canvas.height-10-10,
    width:80,
    height:10,
    color:"white",
    score:0
}

// center line function
function centerLine(){
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2)
    context.strokeStyle = "white"
    context.stroke();
}

// Draw Circle 
function drawCircle(x,y,r,color){
    context.fillStyle=color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false)
    context.closePath();
    context.fill()
}

// ball aray
const ball ={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:1,
    velocityX:5,
    velocityY:5,
    color:"white"
}

// score function
function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font = "32px Courier";
    context.fillText(text,x,y);
}

// Render the game 
function render(){
    // make canvas 
        drawRect(0,0,400,600,"black");

        //make computer paddle 
            drawRect(com.x,com.y,com.width,com.height,com.color);

        //making  user paddle 
            drawRect(user.x,user.y,user.width,user.height,user.color);

            // making centerLine
            centerLine();
             
            //creating  Ball 
            drawCircle(ball.x,ball.y,ball.radius,ball.color);

            // creating Scores 
            drawText(com.score,20,canvas.height/2 - 30);
            drawText(user.score,20,canvas.height/2 + 50);
}

// control the user panel 
// canvas.addEventListener("mousemove",movepaddle);
// function movepaddle(e){
//     let rect = canvas.getBoundingClientRect();
//     user.x = e.clientX - rect.left-user.width/2;
// }

// control paddle
window.addEventListener("keydown",control);
function control(e){
    if(e.keyCode===37){
        if(com.x>50){
            com.x -=80
        }
    }
    else if(e.keyCode===39){
        if(com.x<300){
            com.x += 80;
        }
    }

    if(e.keyCode===65){
        if(user.x>50){
            user.x -=80
        }
    }
    else if(e.keyCode===68){
        if(user.x<300){
            user.x += 80;
        }
    }
}
// control paddles by buttons
leftCom.addEventListener('click',function(){
    if(com.x>50){
        com.x -=80
    }
})
rightCom.addEventListener('click',function(){
    if(com.x<300){
        com.x += 80;
    }
})
leftUser.addEventListener('click',function(){
    if(user.x>50){
        user.x -=80
    }
})
rightUser.addEventListener('click',function(){
    if(user.x<300){
        user.x += 80;
    }
})

// collision detection 
function collision(b,p){ // b is ball and p is player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right>b.left && p.left < b.right && b.bottom > p.top &&b.top<p.bottom;  
}

// reset ball 
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed=1;
    ball.velocityY= -ball.velocityY;
}

// Result Div display 
function showGameOver(){
    canvas.style.display = "none";
    const can = document.getElementById('can');
    can.style.display = "none";
    buttons.style.display="none";

    const result = document.getElementById("result");
    result.style.display = "flex";
}

// update 
function update(){
    ball.x += ball.velocityX*ball.speed;
    ball.y+=ball.velocityY*ball.speed;

    // Control computer paddle 
    // let computerLevel = 0.1;
    // com.x += (ball.x - (com.x+com.width/2)) + computerLevel;
    // if(ball.speed>2){
    //     com.x += ball.x + 100;
    // }


    // reflect the ball 
    if(ball.x+ball.radius>canvas.width||ball.x-ball.radius<0){
        ball.velocityX = -ball.velocityX;
    }
    //  if collision happens 
    let player = (ball.y<canvas.height/2)?com : user;
    if(collision(ball,player)){
        ball.velocityY=-ball.velocityY;
        // ball.speed+=0.1;
    }

    // points 
    if(ball.y-ball.radius<0){
        user.score++;
        resetBall();
    }
    else if(ball.y+ball.radius>canvas.height){
        com.score++;
        resetBall();
    }

    //  GAme over  
    if(user.score>4 || com.score>4){
        clearInterval(loop);
        showGameOver();
    }
}

// start the game 
function start(){
    update();
    render();
}
// loop 
const loop = setInterval(start,1000/50);