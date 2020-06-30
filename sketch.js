//Global Variables
var jungle, ground, monkey, monkeyGroup, banana, bananaGroup, rocks, rockGroup, score, gameover, restart;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var hitcount = 0;

function preload(){
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground.jpg");
  jungleImage = loadImage("jungle.jpg");
  
  bananaImage = loadImage("Banana.png");
  rocksImage = loadImage("stone.png");
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
}


function setup() {
  createCanvas(600,300);
  
  jungle = createSprite(300,150,600,300);
  jungle.addImage("jungleImage", jungleImage);
  jungle.scale = 0.6;
  
  ground = createSprite(300,295,600,10);
  ground.visible = false;
  
  monkeyGroup = new Group();
  bananaGroup = new Group();
  rocksGroup = new Group ();
  
  monkey = createSprite(50,100,25,25);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.125;
  monkeyGroup.add(monkey);
  
  score = 0;
  
  gameover = createSprite(300,125,50,50);
  gameover.addImage("gameoverImage",gameoverImage);
  
  restart = createSprite(300,175,50,50);
  restart.addImage("restartImage", restartImage);
}


function draw(){ 
  monkey.collide(ground);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.debug = true;
  monkey.setCollider('rectangle', 0, 0, 250,600);
  
  if(gameState === PLAY){
    gameover.visible = false;
    restart.visible = false;
    
    if(keyDown("space")&& monkey.y >= 239 ){
    monkey.velocityY = -15;   
    }

    if(monkeyGroup.isTouching(bananaGroup)){
      score++;
      banana.remove();
    }

    switch(score){
      case 5: monkey.scale = 0.130;
        break;
      case 10: monkey.scale = 0.135;
        break;
      case 15: monkey.scale = 0.140;
        break;
      case 20: monkey.scale = 0.145;
        break;
      case 25: monkey.scale = 0.150;
         break;
      default: break;   
    }

    bananafunction();
    rockfunction();

    if(rocksGroup.isTouching(monkeyGroup) && hitcount === 0){
      monkey.scale = 0.125;
      hitcount = hitcount + 1;
      rocks.remove();
    }
    
    if(rocksGroup.isTouching(monkeyGroup) && hitcount === 1){
      monkey.scale = 0.125;
      banana.remove();
      rocks.remove();
      gameState = END;
      hitcount = 0;
    }
    
    console.log(hitcount);
  }
  
  if(gameState === END){
    gameover.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
      gameState = PLAY;
      score = 0;
    }
  }
  
  drawSprites();
  
  stroke("white")
  fill("white");
  textSize(20);
  text('Score: '+ score, 250, 100);
  
}

function bananafunction(){
  if(World.frameCount%100 === 0){
    banana = createSprite(600,random(150,250),25,25);
    banana.addImage("bananaImage",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -7;
    banana.lifetime = 90;
    bananaGroup.add(banana);
  }
}

function rockfunction(){
  if(World.frameCount%175 === 0){
    rocks = createSprite(600,265,25,25);
    rocks.addImage("rocksImage",rocksImage);
    rocks.scale = 0.225;
    rocks.velocityX = -7;
    rocks.lifetime = 90;
    rocksGroup.add(rocks);
  }
}