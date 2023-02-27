var backgroundImg;
var BG;
var jasonimg;
var jason;
var crowAnimation;
var crow;
var obstacle1img;
var obstacle2img;
var obstacle3img;
var obstacle;
var score = 0;
var downAnimation;
var falldownAnimation;
var crowGroup;
var stoneGroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var invisibleGround;
var stopCrow;

function preload(){
  backgroundImg = loadImage("bg.jpg")
 jasonimg = loadAnimation("p1.png","p2.png","p3.png","p4.png","p5.png","p6.png")
 crowAnimation = loadAnimation("crow1.png","crow2.png","crow3.png")
 obstacle1img = loadImage("obstacle1.png");
 obstacle2img = loadImage("obstacle2.png");
 obstacle3img = loadImage("obstacle3.png");
 downAnimation = loadAnimation("down1.png","down2.png","down3.png","down4.png","down5.png","down6.png","down7.png")
 falldownAnimation = loadAnimation("fall9.png")
 stopCrow = loadAnimation("crow1.png")

}
function setup(){
  createCanvas(800,690)
// creating the background
BG = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
BG.addImage(backgroundImg);
BG.scale = 2.3;

//making PC and adding animation
jason = createSprite(65,windowHeight-100,100,100);
jason.addAnimation("jasonimg",jasonimg);
jason.addAnimation("falldownAnimation", falldownAnimation);
jason.addAnimation("downAnimation", downAnimation);
jason.scale = 0.5;
jason.debug = true;
jason.setCollider("circle" , 0 , 80 ,100)

invisibleGround = createSprite(windowWidth/2,windowHeight,windowWidth,10)


score = 0 ; 
crowGroup = new Group();
stoneGroup = new Group();
}
function draw(){

  if(gamestate === PLAY){
    spawnCrows();
    spanObstacles()
    if(jason.isTouching(crowGroup)||jason.isTouching(stoneGroup)){
      gamestate = 0;
    }

    if(BG.x<110){
      BG.x = BG.width/2 
      
      
    };
    if(keyDown("space")){
      jason.velocityY = -10
      
    }
  jason.velocityY = jason.velocityY+0.5;
    BG.velocityX = -5
    
  }
  else if(gamestate === 0){
    BG.velocityX = 0;
    crowGroup.setVelocityXEach(0) ;
    stoneGroup.setVelocityXEach(0);
    jason.changeAnimation("falldownAnimation", falldownAnimation);
    crow.changeAnimation("stopCrow", stopCrow);
    jason.scale = 1.5;
    jason.setCollider("circle" , 0 , 80 ,100)



  }
  jason.collide(invisibleGround);
background("blue");
drawSprites();
fill("red")
textSize(20);
text("Score: "+ score,30,20);




}
// crating crows
function spawnCrows(){
if(frameCount%100 === 0){
  // creating crow 
  crow = createSprite(800,300,20,20)
  crow.addAnimation("crowAnimation",crowAnimation);
  crow.addAnimation("stopCrow", stopCrow);
  crow.velocityX = -7
  crow.y = random(400,600)
  crow.lifeTime = 150;
  crowGroup.add(crow);
  
  
}
}
// creating obstacles
function spanObstacles(){
  if(frameCount%250 === 0){
    obstacle = createSprite(850,660,15,15);
    obstacle.debug = true;
   // obstacle.addImage("obstacle1img" , obstacle1img);
    obstacle.velocityX = -5;
    var n = Math.round(random(1,3));
    switch(n){
      case 1 : obstacle.addImage("obstacle1img",obstacle1img);
      break;
      case 2 : obstacle.addImage("obstacle2img" , obstacle2img);
      break;
      case 3 : obstacle.addImage("obstacle3img" , obstacle3img);
      break;
      default:break;
      obstacle.lifeTime = 400;
      stoneGroup.add(obstacle);
    
    }
  }
}
