/* eslint-disable no-undef */
// Celia Newell
// November 19, 2022
// extra for experts:
// Developing gravity in p5.js; learning how to use p5.play


let mario;
let walk, stand, jump;
let littlem, tinyj;

let cellSize = 50;
let direction = "right";

// enemies, would like more
let  enemy, enemies, goomba;

// building pieces
let ground, blocks, block;
let mystery_box, boxes, box;
let aBrick, bricks, brick;

// coins and powerups
let powerUp_ani, powerUp;
let coin, coin_ani;

let flag, flag_pole;
let cloud, clouds;

let numOfB;
let ROWS;
// if mario collides with enemy
let mario_hit = false;
  
// loaads sprite animation images
function preload() {
  clouds = loadAnimation("pieces/cloud.png");
  flag = loadAnimation("pieces/marioflag.png");
  ground = loadAnimation("pieces/ground.png");
  mystery_box = loadAnimation("pieces/box.png");
  coin_ani = loadAnimation("pieces/mariocoin.png");
  aBrick = loadAnimation("pieces/coin_brick.png");
  powerUp_ani = loadAnimation("pieces/mushroom.png");

  enemy = loadAnimation("pieces/goomba.png");

  walk = loadAnimation(
    "walk/1.png", 
    "walk/2.png");
  jump = loadAnimation("walk/3.png")
  stand = loadAnimation("walk/0.png");
  ministand = loadAnimation("mini walk/0.png")
  miniwalk = loadAnimation(
    "mini walk/0.png", 
    "mini walk/1.png");
  minijump = loadAnimation("mini walk/2.png")
}

function setup() {
  // drawing clouds
  for (let c = -3; c < 15; c++) {
    cloud = new Sprite(c*300, random(250, height-200));
    cloud.collider = "s";
    cloud.addAni("cloud", clouds);
    cloud.ani.scale = 0.25;
    cloud.height = 10;
  }


  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  ROWS = height/cellSize-0.78;  
  
  // make and add mario animation
  mario = new Sprite();
  mario.collider = "k";
  
  mario.addAni("walking", walk);
  mario.ani.scale = 0.4;
  
  mario.addAni("standing", stand);
  mario.addAni("jumping", jump);
  mario.addAni("shrink", ministand);
  mario.addAni("mini walk", miniwalk);
  mario.addAni("shrink jump", minijump);
  mario.x = 50;
  mario.y = height/3;
  mario.height = 65;
  mario.width = 35;

  // make enemy
  enemies = new Group();
  enemies.w = 40;
  enemies.h = 35;
  enemies.visible = false;
  
  
  // making groups for blocks, mystery boxes and bricks
  blocks = new Group();
  blocks.w = cellSize-1;
  blocks.h = cellSize-0.25;

  boxes = new Group();
  boxes.w = cellSize;
  boxes.h = cellSize-0.25;

  bricks = new Group();
  bricks.w = cellSize;
  bricks.h = cellSize-0.25;

  // making coin, powerup and end flag pole 
  coin = new Sprite(0,0);
  coin.static = true;
  coin.d = 0.1;
  coin.addAni("coin", coin_ani);
  coin.ani.scale = 0.25;
  coin.visible = false;

  powerUp = new Sprite(0,0);
  powerUp.static = true;
  powerUp.w = cellSize-5;
  powerUp.addAni("powerUp", powerUp_ani);
  powerUp.ani.scale = 0.05;
  powerUp.visible = false;

  flag_pole = new Sprite(2075, height-200);
  flag_pole.collider = "s";
  flag_pole.addAni("flag", flag);
  flag_pole.ani.scale = 0.5;
  flag_pole.w = 10;

  //makes new blocks and places them
  make_blocks(-8, 10, 50);
  make_blocks(-8, 9, 1);
  block.visible = false;
  make_blocks(-8, 8, 1);
  block.visible = false;

  // makes and places a new brick and a new mystery box
  make_box(7,7);
  make_brick(6,7);
}
  
function draw() {
  // keeps sprites upright
  mario.rotation = 0;
  block.rotation = 0;
  powerUp.rotation = 0;
  enemies.rotation = 0;
  
  background(color(0, 125, 250));
  loopFuctions();
}
  
function make_blocks(x, y, numOfB) {
  // adaptable to make future improvements like custom levels
  for (let n = 1; n < numOfB+1; n++) {
    block = new blocks.Sprite();
    block.addAni("ground", ground);
    block.collider = "k";
    
    block.ani = ground;  
    block.ani.scale = 0.88;
    
    block.x = (x+n) * blocks.w-cellSize/2;
    block.y = height- (ROWS-y)*block.h-15;
  }
  
}

function make_brick(x, y) {
  // adaptable to make future improvements like custom levels
  brick = new bricks.Sprite();
  brick.addAni("coin brick", aBrick);
  brick.ani.scale = 0.09;
 
  brick.static = true;
  brick.x = (x+1) * brick.w-cellSize/2;

  brick.y = height-((ROWS-y)*brick.h-15);
}

function make_box(x, y) {
  // adaptable to make future improvements like custom levels
  box = new boxes.Sprite();
  box.addAni("mystery box", mystery_box);
  box.ani.scale = 0.7;
  box.static = true;  
  box.x = (x+1) * box.w-cellSize/2;
  box.y = height-((ROWS-y)*box.h-15);
}
  
// places goomba when mouse is pressed at mouse x and the last placed block's y
function mousePressed() {
  goomba = new enemies.Sprite(mouse.x, block.y);
  goomba.addAni("goomba", enemy);
  goomba.ani.scale = 0.25;
  enemies.visible = true;
}

// all events needed to repeat in draw
function loopFuctions() {
  mario_move();
  camera.x = mario.x; // allows screen to follow mario's movements
  if (block.y >= height-15) {
    blocks.collider = "s";
  }
  // mario's gravity dependent on collision with blocks
  if (mario.colliding(blocks) > 2) {
    world.gravity.y = 10;
    mario.static = false;
    
  }
  else {
    mario.kinetic = true;
    world.gravity.y = 20;
  }

  // all collisions
  if (mario.colliding(powerUp) > 0) {
    powerUp.remove();
    mario_hit = false;
    console.log(mario_hit);
  }

  if (enemies.visible === true) {
    goomba.vel.x = -2;
  }

  // removes coin when mario touches it
  if (mario.overlaps(coin)) {
    coin.remove();
  }

  // moves coin and makes it visible
  if (mario.colliding(bricks) > 0) {
    coin.visible = true;
    coin.x = brick.x;
    coin.y = brick.y-cellSize;
  }

  // moves powerup and makes it visible
  if (mario.colliding(boxes) > 0) {
    powerUp.visible = true;
    powerUp.x = box.x;
    powerUp.y = box.y-cellSize;
  }
  // shrinks mario if hit by enemy
  if (mario.collides(enemies)){
    mario_hit = true;
  }
  // moves powerup only when visible
  if (powerUp.visible === true) {
    powerUp.dynamic = true;
    powerUp.vel.x = 2.4;
  }
}

// sets mario's movements and sprite animation based on collision and keyboard commands
function mario_move(){
  if (mario_hit === false){
    mario.ani = "walking";
    mario.h = 65;
  }
  else {
    mario.ani = "mini walk";
    mario.ani.scale = 0.1
    mario.h = 38;
  }
  if (kb.pressed("up")) {
    if (direction === "left") {
      mario.mirror.x = true;
    }
    if (mario_hit === false){
      mario.ani = "jumping";
      mario.ani.scale = 0.4;
    }
    else {
      mario.ani = "shrink jump";
      mario.ani.scale = 0.25;
    }
    if (mario.y < 200){
      mario.vel.y = 10;
    }
    else {
      mario.vel.y = 45;
    }
  }
  else if (kb.pressing("right")) {
    direction ="right";
    mario.mirror.x = false;
    mario.vel.x = 3;
  }
  else if (kb.pressing("left")) {
    direction = "left";
    mario.mirror.x = true;
    mario.vel.x = -3;
  }
  else if (kb.pressing("space")) {
    mario.collider = "d";
  }
  else {
    if (mario_hit === false){
      mario.ani = "standing";
      mario.ani.scale = 0.4;
    }
    else {
      mario.ani = "shrink";
      mario.h = 40;
      mario.ani.scale = 0.1;
    }
  }
}





