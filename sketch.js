let theScreen;
let ROWS;
let COLS;
let cellSize;

let blocks;
let block;
let ground

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
  blocks.h = cellSize;

  //blocks.addAni("block", ground);  
  //blocks.ani.scale = 0.1;

  
  
  world.gravity.y = 10


}


function draw() {
  clear();
  background(color(0, 125, 250));
  displayGrid(theScreen);

  loopFuctions();
}

function loopFuctions() {

  if (block)
  if (blocks.collides(blocks)) {
    blocks.color = "red"
  }
  else {
    blocks.color = "blue"
  }
  if (mouse.presses()) {
    new blocks.Sprite(mouse.x, mouse.y);

    //blocks.x = (mouse.x+1) * blocks.w-cellSize/2;
  //blocks.y = height-((ROWS-mouse.y)*blocks.h-15);
  }

  if (mario.colliding(blocks)) {
		mario.color = 'red';
	} 
  else {
    mario.color = "blue"
  }

  if (mario.collides(blocks) > 10) {
		mario.vel.y = -5;
  }
  

  //mario.debug = mouse.pressing();
  

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
      mario.vel.y = 25;
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






