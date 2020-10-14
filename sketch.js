
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,ground,bg,backImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(600, 600);
  backImage = createSprite(0,0,600,600);
  backImage.addImage("jungle",bg);
  backImage.scale = 1.2;
  
  monkey = createSprite(80,240,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale = 0.1;
  
  //ground = createSprite(300,250,600,10);
  //ground.visible = false;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  monkey.velocityY = 0;
  if (gameState === PLAY){
    backImage.velocityX = -6;
  
    if(backImage.x<0){
      backImage.x = backImage.width/2;
    } 
    //if (keyDown("space") && monkey.y>295){
      //monkey.velocityY = -12;
    //}
    if (keyDown(UP_ARROW)) {
    monkey.velocityY = -2;
    }
    if (keyDown(DOWN_ARROW)) {
    monkey.velocityY = 2;
    }
    //monkey.velocityY = monkey.velocityY + 1;
    survivalTime = Math.round(frameCount/80);
    
    if (obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.1;
      backImage.velocityX = 0;
    }
    if (obstacleGroup.isTouching(monkey) && monkey.scale===0.1){
      gameState = END;
    }
    if (foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    create_obstacle();
    create_food();
    switch(score) {
      case 10: monkey.scale = 0.12;
              break;
      case 20: monkey.scale = 0.14;
              break;
      case 30: monkey.scale = 0.16;
              break;
      case 40: monkey.scale = 0.18;
              break;
      case 50: monkey.scale = 0.20;
              break;
      default: break;
    }
  }
  if (gameState === END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  //monkey.collide(ground);
  drawSprites();
  stroke("white");
  fill("white");
  textSize(16);
  text("Survival Time: " + survivalTime,400,50);
  text("Bananas: " + score,50, 50);
  
}
function create_food(){
  if(frameCount % 180 === 0){
     banana = createSprite(500,Math.round(random(190,300)),20,20);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -6;
     banana.lifetime = 80;
     foodGroup.add(banana);
  }
}
function create_obstacle(){
  if(frameCount % 100 === 0){
     obstacle = createSprite(500,Math.round(random(190,300)),20,20);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -6;
     obstacle.lifetime = 80;
     obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",0,0,170);
  }
}  