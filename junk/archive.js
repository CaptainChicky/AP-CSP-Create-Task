//some drawing tests

  //outline test
  ctx.beginPath()
  ctx.strokeStyle = "blue"
  ctx.strokeRect(50, 35, 50, 50)

  //fill test1
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.fillRect(125, 35, 50, 50)

  //fill test2
  ctx.fillStyle = 'green';
  ctx.fillRect(100, 100, 240, 190);

  //test3
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.fillStyle = 'blue'
  ctx.lineWidth = 5
  ctx.rect(200, 35, 50, 50)
  ctx.fill()
  ctx.stroke()

  //test4
  ctx.beginPath()
  ctx.rect(275, 35, 50, 50)
  ctx.fill()
  ctx.stroke()

//===========================
//===========================
//coordinate system drawing
  // draws a grid
  function createGrid () {
    // draw a line every *step* pixels
    const step = 50

    // our end points
    const width = canvas.width
    const height = canvas.height

    // set our styles
    ctx.save()
    ctx.strokeStyle = 'gray' // line colors
    ctx.fillStyle = 'black' // text color
    ctx.font = '14px Monospace'
    ctx.lineWidth = 0.35

    // draw vertical from X to Height
    for (let x = 0; x < width; x += step) {
      // draw vertical line
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()

      // draw text
      ctx.fillText(x, x, 12)
    }

    // draw horizontal from Y to Width
    for (let y = 0; y < height; y += step) {
      // draw horizontal line
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()

      // draw text
      ctx.fillText(y, 0, y)
    }

    // restore the styles from before this function was called
    ctx.restore()
  }
//invokes fucntion
  createGrid();'
    
//======================
//======================
//drawing squares
  //class for future calling reference
  class DrawRectangle {
    //arguments to pass into class
    //values to stop null input and errors
    constructor(
      x = 0,
      y = 0,
      width = 0,
      height = 0,
      fillColor = "",
      strokeColor = "",
      strokeWidth = 2
    ) 
    { //put inputs into constructor
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.fillColor = fillColor;
      this.strokeColor = strokeColor;
      this.strokeWidth = strokeWidth;
    }

    //prep funcs for fun ig
    get area() {
      return this.width * this.height;
    }

    // gets the X position of the left side
    get left() {
      // origin is at top left so just return x
      return this.x;
    }

    // get X position of right side
    get right() {
      // x is left position + the width to get end point
      return this.x + this.width;
    }

    // get the Y position of top side
    get top() {
      // origin is at top left so just return y
      return this.y;
    }

    // get Y position at bottom
    get bottom() {
      return this.y + this.height;
    }

    // draw rectangle to screen
    draw() {
      // destructuring
      const { x, y, width, height, fillColor, strokeColor, strokeWidth } = this;

      // saves the current styles set elsewhere
      // to avoid overwriting them
      ctx.save();

      // set the styles for this shape
      ctx.fillStyle = fillColor;
      ctx.lineWidth = strokeWidth;

      // create the *path*
      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.rect(x, y, width, height);

      // draw the path to screen
      ctx.fill();
      ctx.stroke();

      // restores the styles from earlier
      // preventing the colors used here
      // from polluting other drawings
      ctx.restore();
    }
  }

//insert constant for square
  const mySquare = new DrawRectangle(400, 85, 50, 50, "gold");
//log square properties
  console.log(mySquare);
//draw it
  mySquare.draw();

//===============================
//===============================
// lets use the helper methods to
// draw shapes on the sides of mySquare
const childrenSquares = [
  // top side square - align x with mySquare's left side
  // align bottom with top of mySquare
  new DrawRectangle(mySquare.left, mySquare.top - 50, 50, 50, 'red'),

  // right side square - align x with right side of mySquare
  // align top with mySquare top
  new DrawRectangle(mySquare.right, mySquare.top, 50, 50, 'green'),

  // bottom square
  new DrawRectangle(mySquare.left, mySquare.bottom, 50, 50, 'blue'),

  // left square
  new DrawRectangle(mySquare.left - 50, mySquare.top, 50, 50, 'magenta')
]

// draw all of the child squares by looping over them
childrenSquares.forEach(square => square.draw())

//==============================
//==============================
// Quadratic Bézier curve
ctx.beginPath();
ctx.moveTo(50, 20);
ctx.quadraticCurveTo(230, 30, 50, 100);
ctx.stroke();

// Start and end points
ctx.fillStyle = 'blue';
ctx.beginPath();
ctx.arc(50, 20, 5, 0, 2 * Math.PI);   // Start point
ctx.arc(50, 100, 5, 0, 2 * Math.PI);  // End point
ctx.fill();

// Control point
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(230, 30, 5, 0, 2 * Math.PI);
ctx.fill();


//circles
  // usual setup
ctx.save()
ctx.strokeStyle = 'red'
ctx.fillStyle = 'black'

// text specific styles
ctx.font = 'bold 16px Monospace'
ctx.textAlign = 'left'
ctx.textBaseline = 'alphabetic'

// draw stroked text to screen
ctx.strokeText('Stroked Text', 50, 250)

// calculate the width of this text using current font/styles
const textWidth = ctx.measureText('Stroked Text').width

// X = previous X position + width + 25px margin
ctx.fillText('Filled Text', 50 + textWidth + 25, 250)

ctx.restore()



  // TRIANGLES
// usual setup
ctx.save()
ctx.strokeStyle = 'black'
ctx.fillStyle = 'orangered'

// Filled Triangle
ctx.beginPath()
ctx.moveTo(50, 400) // starting point
ctx.lineTo(50, 350) // left side
ctx.lineTo(100, 400) // hypotenuse / long side
ctx.fill() // closes the bottom side & fills

// stroked triangle
ctx.beginPath()
ctx.moveTo(150, 400) // starting point
ctx.lineTo(200, 400) // bottom side
ctx.lineTo(200, 350) // right side
ctx.closePath() // hypotenuse/long side (remember to close path for strokes!)
ctx.stroke()

ctx.restore()



//==========================
  function make_base()
{
  base_image = new Image();
  base_image.src = './dino1.png';
  base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0, 44 * 10, 24 * 10);
  }
  //pixelate image
    ctx.imageSmoothingEnabled = false; 
    ctx.mozImageSmoothingEnabled = false; 
    ctx.webkitImageSmoothingEnabled = false; 
    ctx.msImageSmoothingEnabled = false; 
}

make_base();






















//=============================
  
let x = canvas.width/2
let y = canvas.height/2
  
function updatePosition(offset) {
  let rad = angle * (Math.PI/180);
  position.x += (Math.sin(rad) * offset);
  position.y -= (Math.cos(rad) * offset);

  if (position.x < 0) {
    position.x = 399;
  } else if (position.x > 399) {
    position.x = 0;
  }

  if (position.y < 0) {
    position.y = 399;
  } else if (position.y > 399) {
    position.y = 0;
  }
}
function refresh() {
  let x = position.x - (shipSize.width/2);
  let y = position.y - (shipSize.height/2);
  let transform = "translate(" + x + " " + y + ") rotate(" + angle + " 15 15) ";

  spaceship.setAttribute("transform", transform);
}
window.addEventListener("keydown", function(event) {
  if (event.defaultPrevented) {
    return; // Do nothing if event already handled
  }

  switch(event.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "back"
      updatePosition(-moveRate);
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "forward"
      updatePosition(moveRate);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      angle -= turnRate;
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      angle += turnRate;
      break;
  }

  refresh();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
}, true);
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================
//=================================




















import { getRandomInt, updateeggcoords, eggs } from './eggs.js'

(function () {  
//basic lib vars on initialization of html
let canvas, ctx

function init() {
//set up the canvas
canvas = document.getElementById("cv2");
ctx = canvas.getContext("2d");

//log,canvas posotion kf mojse click
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

//collision detection
//returns true if there is any overlap
//params: x,y,w,h of two rectangles
function intersects(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (w2 !== Infinity && w1 !== Infinity) {
    w2 += x2;
    w1 += x1;
    if (isNaN(w1) || isNaN(w2) || x2 > w1 || x1 > w2) return false;
  }
  if (y2 !== Infinity && h1 !== Infinity) {
    h2 += y2;
    h1 += y1;
    if (isNaN(h1) || isNaN(y2) || y2 > h1 || y1 > h2) return false;
  }
  return true;
}

  
//position vars for dino typically
let dinox = (canvas.width/2)-75
let dinoy = (canvas.height/2)-35
  
//draw the dino on load with nearest neighbor sampling
let dino
function drawDino(){
  dino = new Image(); 
  dino.src = './sprites/dino1.png';
  dino.onload = function(){
    ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
  }
  //pixelate image
    ctx.imageSmoothingEnabled = false; 
    ctx.mozImageSmoothingEnabled = false; 
    ctx.webkitImageSmoothingEnabled = false; 
    ctx.msImageSmoothingEnabled = false; 
}
drawDino();
  

//todo: make screen wrap better by having sprite show on other side
//key controls for dino
window.addEventListener('keydown', function(e) {
      //right
  if (e.keyCode == 68 || e.keyCode == 39) {
        ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
        dinox=dinox+5
        ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
        collect();
  }
  //left
  if (e.keyCode == 65 || e.keyCode == 37) {
        ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
        dinox=dinox-5
        ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
        collect();
  }
  //up
  if (e.keyCode == 87  || e.keyCode == 38) {
        ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
        dinoy=dinoy-5
        ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
        collect();
  }
  //down
  if (e.keyCode == 83 || e.keyCode == 40) {
        ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
        dinoy=dinoy+5
        ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
        collect();
  }

  //screen wrap
  if (dinox < 0) {
    dinox = 799;
    ctx.clearRect(0, dinoy, 44 * 3, 24 * 3);
    collect();
  } else if (dinox > 799) {
    dinox = 0;
    ctx.clearRect(725, dinoy, 44 * 3, 24 * 3);
    collect();
  }

  if (dinoy < 0) {
    dinoy = 599;
    ctx.clearRect(dinox, 0, 44 * 3, 24 * 3);
    collect();
  } else if (dinoy > 599) {
    dinoy = 0;
    ctx.clearRect(dinox, 540, 44 * 3, 24 * 3);
    collect();
  }
}, true)









function makeEggBase(index){

  const egg = new Image();
  const eggObj = eggs[index - 1];

  egg.src = eggObj.src;

  ctx.clearRect(eggObj.x, eggObj.y, 10 * 3, 14 * 3);

  egg.onload = function(){
    if (index = 3) {ctx.drawImage(egg, eggObj.x, eggObj.y, 22 * 3, 28 * 3);}
    else {ctx.drawImage(egg, eggObj.x, eggObj.y, 10 * 3, 14 * 3);}
  }

    ctx.imageSmoothingEnabled = false; 
    ctx.mozImageSmoothingEnabled = false; 
    ctx.webkitImageSmoothingEnabled = false; 
    ctx.msImageSmoothingEnabled = false; 

  collect();
  updateeggcoords(index);
}


  

let intlist = {};
  
function makeEggs(egg1num, egg2num, egg3num){
    for (let i=1; i <=egg1num; i += 1) { 
      intlist['egg1int' + i] = 0;
      intlist[i-1] = setInterval(makeEggBase(1), 1000);
    }
    for (let j=1; j <=egg2num; j += 1) { 
      intlist['egg2int' + j] = 0;
      intlist[egg1num + j - 1] = setInterval(makeEggBase(2), 1000);
    }
    for (let k=1; k <=egg3num; k += 1) { 
      intlist['egg3int' + k] = 0;
      intlist[egg1num + k - 1] = setInterval(makeEggBase(3), 1000);
    }
}




  
  



var score = 0;

function collect() {




  //todo: for loop that loops through this entire thing for multiply eggs.

  //collision detection with 5 px grace buffer  
  if (intersects(dinox + 5, dinoy + 5, 44 * 3 + 5, 24 * 3 + 5, eggs[0].x, eggs[0].y, 10 * 3, 14 * 3) == true){
    
    //stops the egg timer that moves it
    clearInterval(egg1int);
    
    //increases score and logs it
    score = score + 25;
    console.log("score: " + score);

    //clears egg and restores dino if needed
    ctx.clearRect(eggs[0].x, eggs[0].y, 10 * 3, 14 * 3);
    ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);

    //sets the egg coords at a location out of reach 
    //to not increase score indefinetely
    eggs.forEach((eggs) => {
      if (eggs.id == 1) {
        eggs["x"] = -69;
        eggs["y"] = -69;
      }
    });
  }










  //collision detection with 5 px grace buffer  
  if (intersects(dinox + 5, dinoy + 5, 44 * 3 + 5, 24 * 3 + 5, egg2x, egg2y, 10 * 3, 14 * 3) == true){
    
    //stops the egg timer that moves it
    clearInterval(egg2int);
    
    //increases score and logs it
    score = score + 25;
    console.log("score: " + score);

    //clears egg and restores dino if needed
    ctx.clearRect(egg2x, egg2y, 10 * 3, 14 * 3);
    ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);

    //sets the egg coords at a location out of reach 
    //to not increase score indefinetely
    egg2x = -69;
    egg2y = -69;
  }






    if (intersects(dinox + 5, dinoy + 5, 44 * 3 + 5, 24 * 3 + 5, egg3x, egg3y, 22 * 3, 28 * 3) == true){
    
    //stops the egg timer that moves it
    clearInterval(egg3int);
    
    //increases score and logs it
    score = score + 50;
    console.log("score: " + score);

    //clears egg and restores dino if needed
    ctx.clearRect(egg3x, egg3y, 22 * 3, 28 * 3);
    ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);

    //sets the egg coords at a location out of reach 
    //to not increase score indefinetely
    egg3x = -69;
    egg3y = -69;
  }








  
}




  
}
  
//initialize function after html is completely loade
document.addEventListener("DOMContentLoaded", init)

})()