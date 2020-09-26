var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1

  bananaGroup = createGroup();
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4
  ground.x = ground.width / 2
  console.log(ground.x)

}


function draw() {
  background(220)
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: " + score, 500, 50);

  stroke("black");
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time: " + survivalTime, 100, 50);

  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  if (keyWentDown("space")) {
    monkey.velocityY = -10
  }
  monkey.velocityY = monkey.velocityY + 0.9
  monkey.collide(ground);
  createBanana();
  spawnObstacles();
  drawSprites();

}



function createBanana() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400, 350, 20, 20);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1
    banana.addImage(bananaImage);
    banana.velocityX = -10
    banana.serLifetime = 50;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(20, 20, 20, 20);
    obstacle.velocityX = -(6 + score / 100)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.setLifetime = 50
    obstacle.collide(ground)

  }
}