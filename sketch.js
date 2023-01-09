let theScreen;
let ROWS;
let COLS;
let cellSize;

let numOfFrames = 3;

let rights = [];
let lefts = [];
let rStand;
let lStand;
let rJump;
let lJump;
let whichFrame = 0;
let frameSwitch = 5; //if the frame count is divisble by this # it will switch what sprite is shown

let yMin;
let groundBlocks = [];
let block;
let groundImg;
let img;
let direction = "right";
let facing;

let mario;

let grid;

function preload() {
  groundImg = loadImage("ground.png");

  for (let i = 0; i < numOfFrames; i++) {
    let rWalk = "right-walk/" + i + ".png";
    let right = loadImage(rWalk);
    rights.push(right);
  }

  for (let i = 0; i < numOfFrames; i++) {
    let lWalk = "left-walk/" + i + ".png";
    let left = loadImage(lWalk);
    lefts.push(left);
  }

  rStand =  rights[0];
  rJump = loadImage("mario-r-jump.png");

  lStand =  lefts[0];
  lJump = loadImage("mario-l-jump.png");
}


function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  cellSize = 50;
  ROWS = height/cellSize-0.78;
  COLS = width/cellSize -0.9;

  theScreen = create2dArray();

  // start sprite in the center of the screen
  mario = new Mario();
  img = rStand;
  createTerrain();
}


function draw() {
  background(color(0, 125, 250));
  displayGrid(theScreen);
  handleKeys();
  
  
  drawBlocks();
  mario.applyForces();
}

class Mario {
  constructor() {
    this.height = 60;
    this.width = 35;
    this.walkSpeed = 18;
    this.jumpSpeed = 5;
    this.x = 30;
    this.y = height-68;
    this.gravity = 0;
  }

  move() {   
    if (frameCount % frameSwitch === 0) {
      whichFrame += 1;
      if (direction === "right"){
        if (width > this.x) {
          this.x +=this.walkSpeed;
        }
        else {
          this.x = 0;
        }
        facing = rights;
      }
      else if (direction === "left"){
        if (width > this.x) {
          if (this.x <= 0) {
            this.x = width;
          }
          this.x -=this.walkSpeed;
        }
        facing = lefts;
      }
    }
  
    
    if (whichFrame === rights.length) {
      whichFrame = 0;
      this.width = 35;
    }

    if (whichFrame === 1) {
      this.width = 38;
    }
    else if (whichFrame === 2) {
      this.width = 40;
    }

    if (direction === "right") {
      image(rights[whichFrame], this.x, this.y, this.width, this.height);
    }
    else {
      image(lefts[whichFrame], this.x, this.y, this.width, this.height);
    }
  }


  jump() {
    this.y-=1;
    image(img, this.x, this.y, this.width, this.height);
  }

  display() {
    image(img, this.x, this.y, this.width, this.height);
  }

  applyForces() {
    if (this.y >= height - 68) {
      this.y = height - 68;
      this.gravity = 0; 
    } 
    // bounce off top wall
    if (this.y <= height - 68 - 150) {
      this.gravity *= -0.75;
    }
    this.y += this.gravity;
  }

  onGround() {
    for (let block of groundBlocks){
      //.log (dist(block.x, block.y, this.x, this.y) <= this.width+10) 

      //groundBlocks.splice(groundBlocks.indexOf(block), 1);
      
    }
  }
}

function create2dArray() {
  let emptyArray = [];
  for (let y = 0; y < ROWS; y ++) {
    emptyArray.push([]);
    for (let x = 0; x < COLS; x ++) {
      emptyArray[y].push(x);
    }
  }
  return emptyArray;
}



function handleKeys() {
  if (keyIsDown(38)) { 
    mario.gravity = -1 * mario.jumpSpeed;
    mario.width = 45;
    direction = "up";
    mario.jump();
    frameCount = 0;
  }
  else if (keyIsDown(37)) { 
    direction = "left";
    mario.move();
  }
  else if (keyIsDown(39)) {
    direction = "right";
    mario.move();
  }
  else {
    if (direction === "up") {
      mario.width = 45;
      if (img === rStand){
        img = rJump;
      }
      else if (img === lStand){
        img = lJump;
      }
    }
    else if (direction === "right") {
      img = rStand;
    }
    else if (direction === "left") {
      img = lStand;      
    }
    mario.display();
  }
}


function makeBlock(xPlace, levY) {
  block = {
    x : xPlace*cellSize-cellSize/2+ cellSize,
    y :  height-levY*cellSize-15,
    size : 40,
  };
  groundBlocks.push(block);
}

function drawBlocks() { 
  for (let block of groundBlocks){
    image(groundImg, block.x, block.y, cellSize, 50);
  }
}

function displayGrid(grid) {
  for (let y = ROWS; y > 0; y--) {
    for (let x = 0; x < COLS; x++) {
      fill(color(0, 125, 250));
      
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

    }
  }
}

function createTerrain() {
  makeBlock(0, 0);
  makeBlock(5,0);
  makeBlock(5, 1);
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / 50);

  makeBlock(x, ROWS-y);
  theScreen[x][Math.floor(ROWS-y)] = x+100;

  //checkBelow(Math.floor(ROWS-y, 0));

  checkBelow(5,0);
}
        

function checkBelow(yPos, count) {
  if (yPos === 0) {
    console.log("count");
  }
  else {
    if (theScreen[Math.floor(mouseX/ cellSize)][yPos-1] < 100) {
      console.log("no")
      //return checkBelow(yPos-1, count+1);   
    }
    console.log("cheese");
  }
}






