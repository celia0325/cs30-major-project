let blinkLeft = true;

// same thing on the right but using millis() instead
let blinkRight = false;
let interval =   200;   // in milliseconds
let prevTime;           // stores the last time the
                        // light was turned on/off

function setup() {
  createCanvas(windowWidth, windowHeight);

  // record the current time for the millis() example
  prevTime = millis();
}


function draw() {
  background(50);

  // show the current frame count in the console
  // (note how this value just gets larger and larger)
  console.log(frameCount);

  // FRAME COUNT
  // (see the info at the top for the benefits and
  // drawbacks of this method for controlling events)

  // every 30 frames, switch the 'blinkLeft' variable
  // between true and false
  if (frameCount % 20 === 0) {
    blinkLeft = !blinkLeft;
  }

  // if 'blinkLeft' is true, draw a blue 'light'
  if (blinkLeft) {
    drawLight(width/4, height/2, color(0,150,255));
  }

  // MILLISECONDS
  // check if enough time has passed since the last
  // event and, if it has, switch the light on/off
  // this syntax is a bit confusing: we check if the
  // current time millis() is greater than the previous
  // time plus the interval we specified
  if (millis() > prevTime + interval) {
    
    // if so, flip the variable...
    blinkRight = !blinkRight;
    
    // ...and reset the timer to the current time
    prevTime = millis();
  }

  // if the light should be on, draw it using the
  // same function we used for the right side!
  if (blinkRight) {
    drawLight(width-width/4, height/2, color(255,0,250));
  }
}


// a function that draws a 'light' at a specified
// location and color – this is a good use for a
// function since it's code we want to use more
// than once but can be customized with arguments
function drawLight(x, y, c) {
  let r = red(c);
  let g = green(c);
  let b = blue(c);
  for (let i=0; i<10; i++) {
    let dia =   map(i, 0,9, 200,30);
    let alpha = map(i, 0,9, 20,255);
    fill(r,g,b, alpha);
    noStroke();
    circle(x, y, dia);
  }
}

