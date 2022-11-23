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

let direction = "";

let img = rStand;
let standImg = "R";
let mario;

class Ground {
  constructor() {
    this.width = windowWidth;
    this.height = windowHeight;
    this.size = 50;
    this.x;
    this.y = height - this.size;
  }

  display() {
    for (let x = 0; x < this.width; x+=this.size) {
      image(groundImg, x, this.y, this.size, this.size);
    }
  }
}

class Mario {
  constructor() {
    this.jump = 0;
    this.speed = 5;
    this.size = 60;
    this.x = 30;
    this.y = 0;
    this.friction = 0.01;
    this.gravity = 0.09;
    this.hop = -5;
  }

  display() {
    if (direction === "") {
      image(rStand, this.x, this.y, this.size/1.7, this.size);
    }
  }

  move(direction) {
    if (direction === "right") {
      standImg = "R";
      mario.x += mario.speed;
      if (standImg === "R"){
        image(rWalk, this.x, this.y, this.size/1.7, this.size);
      }
    }
    if (direction === "left") {
      standImg = "L";
      mario.x -= mario.speed;
      if (standImg === "L") {
        image(lWalk, this.x, this.y, this.size/1.7, this.size); 
      }
    }
  }
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
  mario = new Mario();
  createCanvas(windowWidth, windowHeight);
  mario.jump = height - 50 - mario.size;
  mario.y = height - 50 - mario.size;
  let block = new Ground;
  groundBlocks.push(block);
}

function draw() {
  background(color(0, 125, 250));
  for (let i = 0; i < groundBlocks.length; i++) {
    groundBlocks[i].display();
  }
  mario.display();
  handleKeys();  
}

function handleKeys() {
  if (keyIsDown(39)) { 
    mario.move("right");
  }
  else {
    if (standImg === "R") {
      img = rStand;
    }
  }

  if (keyIsDown(37)) { 
    mario.move("left");
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
  
}
