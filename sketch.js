let theScreen;
let ROWS;
let COLS;
let cellSize;

let blocks;
let ground;
let direction = "right";
let facing;

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
  
  mario.addAni("walking", walk);
  mario.ani.scale = 0.4;
 
  mario.addAni("standing", stand);
  mario.addAni("jumping", jump);
  mario.x = 50;
  mario.y = height-1.4*50-200;
  mario.height = 65;
  mario.width = 35


/// blocks
  blocks = new Group();
  blocks.w = 50;
  blocks.h = 45

  blocks.ani.scale = 0.9;
  while (blocks.length < 2) {
		let block = new blocks.Sprite();

    
    
    block.collider = "static"
    
    block.addAni("block", ground);  
		block.x =  blocks.length * 100;
    block.y = 100
    
	}
}


function draw() {
  background(color(0, 125, 250));
  displayGrid(theScreen);

  blocks.debug = mouse.pressing();

  mario_move();
}

//function make_blocks() {
  
//}

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

function displayGrid(grid) {
  for (let y = ROWS; y > 2; y--) {
    for (let x = 0; x < COLS; x++) {
      fill(color(0, 125, 250));
      
      rect(x*cellSize, y*cellSize, cellSize, cellSize);

    }
  }
}

function mousePressed() {
  //
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






