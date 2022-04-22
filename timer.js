//set up canvas and context
let canvas, ctx;
canvas = document.getElementById("go");
ctx = canvas.getContext("2d");

//drawing squares and rectangles
//class for future calling reference
//constructor inputs:
// x, y, width, height, fillColor, strokeColor, strokeWidth
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
  ) {
    //put inputs into constructor
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  //here are prep functions so we can pull these inputs
  //they may prove useful later when we want to draw squares
  //based on previous drawn squares from the constructor
  //gets the area of the drawn rectangle
  get area() {
    return this.width * this.height;
  }

  //gets the x position of the left side
  get left() {
    //origin is at top left so just return x
    return this.x;
  }

  // get x position of right side
  get right() {
    // x is left position + the width to get end point
    return this.x + this.width;
  }

  //get the Y position of top side
  get top() {
    //origin is at top left so just return y
    return this.y;
  }

  //get Y position at bottom
  get bottom() {
    return this.y + this.height;
  }

  //draw rectangle to screen
  draw() {
    //destructuring
    const { x, y, width, height, fillColor, strokeColor, strokeWidth } = this;

    //saves the current styles set elsewhere to avoid overwriting them
    //(as per usual)
    ctx.save();

    //set the styles for this shape
    ctx.fillStyle = fillColor;
    ctx.lineWidth = strokeWidth;

    //create the path of the rectangle border
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.rect(x, y, width, height);

    //draw the path to screen
    ctx.fill();
    ctx.stroke();

    //restore earlier styles so we dont mess anything up
    ctx.restore();
  }
}

//function to set up the end game screen
export function gameover() {
  //first we must put this canvas on the very top
  document.getElementById("go").style.zIndex = "2";

  //now we will create a constant that is the rectangle from the constructor
  //this rectangle will be completely black and fill the entire canvas
  const gorect = new DrawRectangle(
    0,
    0,
    canvas.width,
    canvas.height,
    "black",
    "black",
    0
  );
  //draw this rectangle
  gorect.draw();

  //now we will save contexts to avoid overwriting earlier ones
  ctx.save();
  //setting up text styles
  ctx.strokeStyle = "darkblue";
  ctx.fillStyle = "red";

  //text styles and fonts
  ctx.font = "bold 100px Monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  //draws the game over text
  ctx.fillText("Game Over", canvas.width / 2, 250);
  ctx.strokeText("Game Over", canvas.width / 2, 250);

  //restores our context
  ctx.restore();
}