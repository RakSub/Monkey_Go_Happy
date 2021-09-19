var backImage, backgr;
var player, player_running;
var ground, ground_img;
var FoodGroup, bananaImage;
var obstaclesGroup, stoneImage;
var score = 0;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

  // score = 0;
}

function draw() {
  background(0);
  //displaying score
  fill(255);

  if (gameState === PLAY) {
    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space") && player.y >= 160) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    spawnFood();

    spawnObstacles();

    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score += 2;
      player.scale += 0.009;
    }

    if (obstaclesGroup.isTouching(player)) {
      gameState = END;
    }

    player.collide(ground);
  } else if (gameState === END) {
    player.visible = false;
    backgr.velocityX = 0;
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    textSize(30);
    fill(255);
    text("Game Over!", 300, 220);
  }

  drawSprites();
  textSize(20);

  text("Score: " + score.toString(), 700, 50);
}

function spawnFood() {
  //write code here to spawn the bananas
  if (frameCount % 100 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    //assign lifetime to the variable
    banana.lifetime = 300;

    //adjust the depth
    player.depth = banana.depth + 1;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the stones
  if (frameCount % 190 === 0) {
    var stone = createSprite(600, 250, 40, 10);
    stone.y = Math.round(random(300, 365));
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -4;

    //assign lifetime to the variable
    stone.lifetime = 300;

    //adjust the depth
    player.depth = stone.depth + 1;

    //add each stone to the group
    obstaclesGroup.add(stone);
  }
}
