let theScreen;
let ROWS;
let COLS;
let cellSize;

let groundBlocks = [];
let block;
let groundImg;
let img;
let direction = "right";
let facing;

let mario;
let walk;
let stand;
let jump;


let blockGravity;
let doApply = false;
let grid;

function preload() {
  groundImg = loadImage("ground.png");
  walk = loadAnimation(
    "walk/1.png", 
    "walk/2.png");
  stand = loadAnimation("walk/0.png");
  jump = loadAnimation("jump.png");

}


function setup() {
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);

  cellSize = 50;
  ROWS = height/cellSize-0.78;
  COLS = width/cellSize -0.9;

  theScreen = create2dArray();

  // start sprite in the center of the screen
  mario = new Sprite();
  
  mario.addAni("walking", walk);
  mario.ani.scale = 0.4;
 
  mario.addAni("standing", stand);
  mario.addAni("jumping", jump);
  mario.x = 50;
  mario.y = height-1.4*50;
 
  createTerrain();
}


function draw() {
  background(color(0, 125, 250));
  displayGrid(theScreen);

  mario_move();
  
  
  //drawBlocks();
 // blockFall();

}

function mario_move(){
  mario.ani = "walking";
  if (kb.pressing("up")) {
    if (direction === "right") {
      mario.mirror.x = true;

    }
    mario.ani = "jumping";
    mario.ani.scale = 0.4;
    let maxJump = mario.y;
    if (mario.y > maxJump-100){
      mario.vel.y = -3;
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
  else {
    mario.ani = "standing";
    mario.vel.x = 0;
    mario.ani.scale = 0.4;
    mario.vel.y = 0;
  }
}

function makeBlock(xPlace, levY, numOfB) {
  block = {
    x : xPlace,
    y :  height-levY*cellSize-15,
    size : 40,
    numOfB: numOfB,
  };
  groundBlocks.push(block); 

  for (let o = 1; o < block.numOfB-1; o++) {
    theScreen[0][Math.floor(ROWS-block.y/50+o)] = o+100-1;
  }
}

function drawBlocks() { 
  for (let block of groundBlocks){
    for (let i = 0; i < block.numOfB; i++) {
      image(groundImg, block.x*cellSize+ cellSize * i+ cellSize/2, block.y, cellSize, 50);
    }
  }
}

function displayGrid(grid) {
  for (let y = ROWS; y > 2; y--) {
    for (let x = 0; x < COLS; x++) {
      fill(color(0, 125, 250));
      
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

    }
  }
}

function createTerrain() {
  makeBlock(0, 0, 16);  
  
}

//function mousePressed() {
  //let x = Math.floor(mouseX / cellSize);
  //let y = Math.floor(mouseY / cellSize);

 // if (y >= 2) {
  //  makeBlock(x, ROWS-y, 1);
  //}
  
  
 //// checkBelow(Math.floor(ROWS-y));

//}
        
function checkBelow(yPos) {
  for (let e = 0; e < 10; e++){
    if (yPos <= 0) {
      console.log("at bottom");
      doApply = false;
    }
    else if (theScreen[yPos-1-e][Math.floor(mouseX/ cellSize)] < 100) {
      console.log("nothing below");
      doApply = true;

    }
    else {
      console.log("BLOCK BELOW");
      doApply = false;
    }
  }
  
}

function blockFall() {
  if (doApply === true) {
    blockGravity = 1;
    for (let block of groundBlocks) {
      if (block.y === height - cellSize*0.32) { //|| theScreen[block.y][block.x]<=0
        doApply = false;
      }
      else {
        doApply = true;
      }
    }
  }
  else {
    blockGravity = 0;
  }
  block.y += blockGravity;
  
  
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






