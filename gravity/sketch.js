let player, bottom;
let gravity = 0.09;
let hop = -100;

function setup() {
  createCanvas(400, 400);
  player = new Sprites(width / 2-50, height - 50, 50);

  // bottom = (width / 2, height + 5, width, 10);
  //bottom.immovable = true;
}

function draw() {
  background(220);
  //player.collide(bottom);
  //player.velocity.y += gravity;
  player.display();
}

function keyPressed() {
  if (keyCode === 32) { // optional spacebar jump
    jump(player);
  }
  else if (keyCode === 40) { //down
    move(player, 2, 90);
  }
  else if (keyCode === 38) { // up/jump
    move(player, 2, 270);
  }
  else if (keyCode === 39) { //right
    move(player, 2, 0);
  }
  else if (keyCode === 37) { //left
    move(player, 2, 180);
  }
}

function jump(sprite) {
  sprite.velocity.y = hop;
}

function move(sprite, speed, direction) {
  sprite.setSpeed(speed, direction);
}

class Sprites {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.shapeColor = 0;
    this.friction = 0.01;
    this.maxSpeed = 2;
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
  }
}