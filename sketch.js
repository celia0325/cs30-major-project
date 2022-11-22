// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let groundImg;

function preload() {
  groundImg = loadImage("ground.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(color(0, 150, 255));
  displayGround();
}

function displayGround() {
  for (let i = 0; i < width; i+=100) {
    image(groundImg, i, height+100, 100, 100);
  }
}


