let theScreen;
let ROWS;
let COLS;
let cellSize;

let blocks;
let ground;
let direction = "right";
let maxJump;

let mario;
let walk;
let stand;
let jump;

let blockGravity;
let doApply = false;
let grid;

let numOfB;

function preload() {
  ground = loadAnimation("ground.png");
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
  //mario.collider = "k";
  
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
  blocks.h = 50;
  
  make_blocks(0, 9);
  make_blocks(1, 9);
  make_blocks(2, 9);
}


function draw() {
  background(color(0, 125, 250));
  displayGrid(theScreen);

  if (mario.colliding(blocks)) {
    world.gravity.y = 1;
  }
  else {
    world.gravity.y = 20
  }

  mario.debug = mouse.pressing();
  

  mario_move();
}

function make_blocks(x, y) {
  let block = new blocks.Sprite();

    
    
  block.collider = "k";
    
  block.addAni("block", ground);  
  block.ani.scale = 0.88;
  block.x = (x+1) * blocks.w-cellSize/2;
  block.y = height-((ROWS-y+1)*block.h-35);
    
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
      world.gravity.y = 200;
    }
    else {
      world.gravity.y = - 75;
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
    mario.ani = "standing"
    console.log(world.gravity.y);
  }
  else if (kb.pressing("space")) {
    mario.ani = "walking";
  }
  else {
    mario.ani = "standing";
    mario.vel.x = 0;
    mario.ani.scale = 0.4;
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

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);
  console.log(x,y);
  make_blocks(x, y, 20);
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






