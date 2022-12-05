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
let rJump;

//left mario sprites
let lStand;
let lJump;

let direction = "right";

let img = rStand;
let imgW;
let standImg = "R";
let mario;

let numOfFrames = 3;
let lefts = [];
let frames = [];
let whichFrame = 0;

class Ground {
  constructor() {
    //this.width = windowWidth;
    //this.height = windowHeight;
    //this.size = 50;
    //this.y = height - this.size;
  }

  display() {
    for (let x = 0; x < width; x+=50) {
      image(groundImg, x, 519, 50, 50);
    }
  }
}

class Mario {
  constructor() {
    //this.size = 60;
    this.x = 30;
    //this.y = windowHeight;
    //this.speed = 5;
    //this.gravity = 0
  }

  move() {
    if (direction === "right" || direction === "none") {
      img = rStand
    }
    if (direction = "left") {
      img = lStand 
    }
    image(img, this.x, height-110, 60/1.7, 60)
  }

  update() {
    imageMode(CENTER);
    if (frameCount % 7 === 0) {
      whichFrame += 1;
      if (direction === "right"){
        if (width > this.x) {
          this.x +=30;
        }
        else {
          this.x = 0
        }
      }
      //else if (direction === "left"){
        //if (width >= this.x) {
          //if (this.x <= 0) {
            //this.x = width;
          //}
          //this.x -=30;
        //}
      //}
    }
    if (whichFrame === frames.length) {
      whichFrame = 0;
      
    }
    image(frames[whichFrame], this.x, height-110, 60/1.7, 60);
  }

  applyForces() {
    if (this.y > height - this.size - 50) {
      this.y = height - this.size - 50
      this.gravity = 0; 
    } 
    // bounce off top wall
    if (this.y <= height - this.size - 50 - 100) {
      this.gravity *= -.75;
    }
    
    if (this.gravity !== 0){
      if (standImg === "R") {
        img = rJump
      }
      if (standImg === "L") {
        img = lJump
      }
    }
    this.y += this.gravity;
  }
}



function preload() {
  groundImg = loadImage("ground.png");

  for (let i = 0; i< numOfFrames; i++) {
    let filename = 'walk-r/' + i + '.png';
    let right = loadImage(filename);
    frames.push(right);
  }
  
  rStand =  loadImage("standing/rStand.png");
  rJump = loadImage("mario-r-jump.png");

  lStand =  loadImage("standing/lStand.png");
  lJump = loadImage("mario-l-jump.png");
}

function setup() {
  mario = new Mario();
  createCanvas(windowWidth, windowHeight);
  
  let block = new Ground;
  groundBlocks.push(block);
  //mario.y = height - groundBlocks[0].size - mario.size;
}

function draw() {
  background(color(0, 125, 250));
  handleKeys();
  for (let i = 0; i < groundBlocks.length; i++){
    groundBlocks[i].display();
  }
  
  //mario.applyForces();
  
}

function handleKeys() {
  if (keyIsDown(38)) { 
    mario.gravity = -1 * mario.speed* 0.8;
    frameCount = 0;
  }
  if (keyIsDown(37)) { 
    direction = "left"
    mario.update();
  }
  else if (keyIsDown(39)) { 
    direction = "right"
    mario.update();
  }
  else {
    mario.move()
  }
}

