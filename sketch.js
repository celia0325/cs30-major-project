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

let ground;
let groundBlocks = [];
let cords;
let groundImg;
let img;
let direction = "right";
let facing;

let mario;
let anotherBlock;

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
  createCanvas(windowWidth, windowHeight);

  cellSize = 50;
  ROWS = height/cellSize;
  COLS = width/cellSize;

  theScreen = create2dArray();

  // start sprite in the center of the screen
  mario = new Mario();
  img = rStand;

  ground = new Ground(10);
}


function draw() {
  background(0);
  displayGrid();
  handleKeys();
  mario.applyForces();
  for (let j = 0; j < groundBlocks; j ++) {
    groundBlocks[j].display(j, 1);
  }
  groundBlocks.push(ground);
}

class Mario {
  constructor() {
    this.height = 60;
    this.width = 35;
    this.walkSpeed = 18;
    this.jumpSpeed = 5;
    this.x = 30;
    this.y = height;
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
    image(img, this.x, this.y, this.width, this.height);
  }

  display() {
    image(img, this.x, this.y, this.width, this.height);
  }

  applyForces() {
    if (this.y > height - this.height - 50) {
      this.y = height - this.height - 50;
      this.gravity = 0; 
    } 
    // bounce off top wall
    if (this.y <= height - this.height - 50 - 110) {
      this.gravity *= -0.75;
    }
    this.y += this.gravity;
  }
}

function create2dArray() {
  let emptyArray = [];
  for (let y = 0; y < ROWS; y ++) {
    emptyArray.push([]);
    for (let x = COLS; x > 0; x --) {
      emptyArray[y].push(0);
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

class Ground {
  constructor(x, numOfB) {
    this.x = x;
    this.numOfB = numOfB;
    this.size = cellSize;
  }

  display(gRow) {
    
    this.y = height - this.size*gRow;
    for (let i = 0; i < this.numOfB; i++){
      image(groundImg, this.x*this.size, this.y, 50, 50);
    }
    
  }
}

function displayGrid() {
  for (let y = ROWS; y > 0; y--) {
    for (let x = 0; x < COLS; x++) {
          
      fill(color(0, 125, 250));
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

    }
  }
}

function onGround() {
  for (let block of groundBlocks) {
    if (block.y > mario.y) {
      console.log(true);
      mario.y += block.size;
    }
  }
}

