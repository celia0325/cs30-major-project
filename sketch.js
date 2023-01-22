let theScreen;
let ROWS;
let COLS;
let cellSize;
let blocks;
let boxes
let ground;
let block;
let direction = "right";
let box;

let coin;
let needcoin = true;
let coin_ani;

let mystery_box;
let bricks;
let brick;
let brick1;
let new_piece;
  
let mario;
let walk;
let stand;
let jump;
  
let blockGravity;
let doApply = false;
let grid;
let numOfB;
  
function preload() {
  ground = loadAnimation("pieces/ground.png");
  mystery_box = loadAnimation("pieces/box.png");
  coin_ani = loadAnimation("pieces/mariocoin.png");
  brick1 = loadAnimation("pieces/coin_brick.png");
  powerUp_ani = loadAnimation("pieces/mushroom.png")

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
  mario.collider = "k";
  
  mario.addAni("walking", walk);
  mario.ani.scale = 0.4;
  
  mario.addAni("standing", stand);
  mario.addAni("jumping", jump);
  mario.x = 50;
  mario.y = height-1.45*50-300;
  mario.height = 65;
  mario.width = 35;
  
  
  /// blocks
  blocks = new Group();
  blocks.w = cellSize;
  blocks.h = cellSize-0.25;

  boxes = new Group();
  boxes.w = cellSize;
  boxes.h = cellSize-0.25;

  bricks = new Group();
  bricks.w = cellSize;
  bricks.h = cellSize-0.25;


  coin = new Sprite(0,0);
  coin.static = true
  coin.d = 0.1
  coin.addAni("coin", coin_ani)
  coin.ani.scale = 0.25
  coin.visible = false;

  powerUp = new Sprite(0,0);
  powerUp.static = true
  powerUp.w = cellSize-5
  powerUp.addAni("powerUp", powerUp_ani)
  powerUp.ani.scale = 0.05
  powerUp.visible = false;
  
  make_blocks(0, 10, 20);

  make_box(7,7);
  make_brick(6,7)
}
  
  
function draw() {
  mario.rotation = 0;
  block.rotation = 0;
  powerUp.rotation = 0
  
  background(color(0, 125, 250));
  displayGrid(theScreen);
  
  loopFuctions();
  
  powerUp.debug = mouse.pressing();
  
  
  mario_move();
}
  
function make_blocks(x, y, numOfB) {
  for (let n = 1; n < numOfB+1; n++) {
    block = new blocks.Sprite();
    
    block.addAni("ground", ground);
    block.collider = "k";
    
    block.ani = ground;  
    block.ani.scale = 0.88;
    
    block.x = (x+n) * blocks.w-cellSize/2;

    block.y = height-((ROWS-y)*block.h-15);
  }
  
}

function make_brick(x, y) {
    brick = new bricks.Sprite()
    brick.addAni("coin brick", brick1)
    brick.ani.scale = 0.09
 
    brick.static = true
    brick.x = (x+1) * brick.w-cellSize/2;

    brick.y = height-((ROWS-y)*brick.h-15);
}

function make_box(x, y) {
  box = new boxes.Sprite()
  box.addAni("mystery box", mystery_box)
  box.ani.scale = 0.7

  box.static = true  
  box.x = (x+1) * box.w-cellSize/2;

  box.y = height-((ROWS-y)*box.h-15);
}
  

function displayGrid(grid) {
  for (let y = ROWS; y > 2; y--) {
    for (let x = 0; x < COLS; x++) {
      fill(color(0, 125, 250));
        
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}
  
function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / (cellSize)-0.25);
  console.log(x,y);
  needcoin = true
  //make_brick(x,y)
  
  make_box(x, y);
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

function loopFuctions() {
  if (block.y % 10 === 0){
    console.log(block.y)
  }
  if (block.y >= height-15) {
    blocks.collider = "s"
  }
  if (mario.colliding(blocks) > 2) {
    world.gravity.y = 10;
    mario.static = false;
    
  }
  else {
    mario.kinetic = true;
    world.gravity.y = 20;
  }

  if (mario.overlaps(coin)) coin.remove();
  if (mario.overlaps(powerUp)) powerUp.remove();

  if (mario.colliding(bricks) > 0) {
    console.log(true)
    coin.visible = true
    coin.x = brick.x
    coin.y = brick.y-cellSize
  }

  if (mario.colliding(boxes) > 0) {
    console.log(true)
    powerUp.visible = true
    powerUp.x = box.x
    powerUp.y = box.y-cellSize
    //needcoin = false;
  }
  if (powerUp.visible === true) {
    powerUp.dynamic = true
    powerUp.vel.x = 2.9;
  }

 
  

  mario_move();
}

function mario_move(){
  mario.ani = "walking";
  if (kb.pressing("up")) {
    if (direction === "left") {
      mario.mirror.x = true;
    }
    mario.ani = "jumping";
    mario.ani.scale = 0.4;
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
  else if (kb.pressing("down")) {
    mario.ani = "standing";
    console.log(world.gravity.y);
  }
  else if (kb.pressing("space")) {
    mario.dynamic = true;
  }
  else if (kb.pressing("p")) {

  }
  else {
    
    mario.ani = "standing";
    mario.ani.scale = 0.4;
    marioMove = false;
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






