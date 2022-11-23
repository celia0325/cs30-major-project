// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let groundImg;
let groundBlocks =[];

//right mario sprite
let rStand;
let rWalk;
let rJump;
let rHit;

//left mario sprites
let lStand;
let lWalk;
let lJump;
let lHit;

let img;
let standImg = "R";

class Ground {
  constructor() {
    this.width = windowWidth;
    this.height = windowHeight;
    this.size = 50;
    this.x;
    this.y = height - this.size;
  }

  display() {
    for (let x = 0; x < this.width; x+=50) {
      image(groundImg, x, this.y, this.size, this.size)
    }
  }
}

let mario = {
  jump : 0,
  speed: 5,
  size: 60,
  x : 30,
  y : 0,
}

function preload() {
  groundImg = loadImage("ground.png");
  
  rStand =  loadImage("mario-right.png");
  rWalk =  loadImage("mario-r-walk.png");
  rJump =  loadImage("mario-r-jump.png");
  rHit =  loadImage("mario-r-hit.png");

  lStand =  loadImage("mario-left.png");
  lWalk =  loadImage("mario-l-walk.png");
  lJump =  loadImage("mario-l-jump.png");
  lHit =  loadImage("mario-l-hit.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mario.jump = height - 50 - mario.size;
  mario.y = height - 50 - mario.size;
  img = rStand;
  let block = new Ground
  groundBlocks.push(block);
}

function draw() {
  background(color(0, 125, 250));
  for (let i = 0; i < groundBlocks.length; i++) {
    groundBlocks[i].display();
  }
  image(img, mario.x, mario.y, mario.size/1.7, mario.size)
  handleKeys();  
}

function handleKeys() {
  if (keyIsDown(39)) { 
    standImg = "R";
    mario.x += mario.speed;
    if (standImg === "R"){
      img = rWalk;
    }
  }
  else {
    if (standImg === "R") {
      img = rStand;
    }
  }

  if (keyIsDown(37)) { 
    standImg = "L";
    mario.x -= mario.speed;
    if (standImg === "L") {
      img = lWalk; 
    }
  }
  else {
    if (standImg === "L") {
      img = lStand;
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
   marioJumps();
  }
}


function marioJumps() {
  if (mario.y >= 410) {
    while (mario.y >= 410) {
      mario.y -= 1;
    }
    if (standImg === "R") {
      img = rJump;
    }
    else if (standImg === "L") {
      img = lJump;  
    }
  }
  else if (mario.y < 460){
    while (mario.y < 460) {
      mario.y += 1;
    }
  }
}
