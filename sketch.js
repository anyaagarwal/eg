var ball,position,database;
function preload(){
    habwebp=loadImage("hot air balloon.png");
    bg=loadImage("bg.webp");
}
function setup(){
    createCanvas(777,777);
    database=firebase.database();
    console.log(database);
   
    
    
  ball= createSprite(250,250,10,10);
    ball.addImage(habwebp);

    var ballPosition=database.ref('ball/position');
    ball.scale=1;

    ballPosition.on("value",readPosition,showError);

}



function draw(){
    background(bg);

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-7,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(7,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-7);
            ball.scale=ball.scale+0.007;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+7);
            ball.scale=ball.scale-0.007;
        }
    }
    
    
    drawSprites();
}

function showError(){
    console.log("error in writing position");
}

function readPosition(data){
  position=data.val();
  console.log(position.x);
  ball.x=position.x;
  ball.y=position.y;
}
function writePosition(x,y){
    database.ref("ball/position").set({
        x : position.x + x,
        y : position.y + y
    });
    
}
