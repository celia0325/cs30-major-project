// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let groundImg;
<<<<<<< HEAD
let groundBlocks =[];

class Ground {
  constructor() {
    this.width = windowWidth;
    this.height = windowHeight;
    this.size = 50;
    this.x;
    this.y = this.height-this.size;
  }

  display() {
    for (let x = 0; x < this.width; x+=50) {
      image(groundImg, x, this.y, this.size, this.size)
    }
  }
}

let mario = {
  speed: 5,
  size: 60,
  x : 30,
  y : 460,
}

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

function preload() {
  groundImg = loadImage("ground.png")

  rStand =  loadImage("mario-right.png");
  rWalk =  loadImage("mario-r-walk.png");
  rJump =  loadImage("mario-r-jump.png");
  rHit =  loadImage("mario-r-hit.png");

  lStand =  loadImage("mario-left.png");
  lWalk =  loadImage("mario-l-walk.png");
  lJump =  loadImage("mario-l-jump.png");
  lHit =  loadImage("mario-l-hit.png");
=======

function preload() {
  groundImg = loadImage("ground.png");
>>>>>>> 523603f2746384c9e27e0b8b796c888d846eea57
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = rStand;
  let block = new Ground
  groundBlocks.push(block);
}

function draw() {
<<<<<<< HEAD
  background(color(0, 125, 250));
  for (let i = 0; i < groundBlocks.length; i++) {
    groundBlocks[i].display();
  }
  image(img, mario.x, mario.y, mario.size/1.7, mario.size);
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
=======
  background(color(0, 150, 255));
  displayGround();
}

function displayGround() {
  for (let i = 0; i < width; i+=100) {
    image(groundImg, i, height+100, 100, 100);
>>>>>>> 523603f2746384c9e27e0b8b796c888d846eea57
  }
}


<<<<<<< HEAD
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
  
=======
>>>>>>> 523603f2746384c9e27e0b8b796c888d846eea57
