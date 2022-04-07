import { score, se } from './topsprite.js'
console.log( se() );
console.log( score );

let canvas, ctx;
canvas = document.getElementById("go");
ctx = canvas.getContext("2d");

//drawing squares
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
//draw it


function gameover() {
  document.getElementById("go").style.zIndex = "2";
  
  const gorect = new DrawRectangle(0, 0, canvas.width, canvas.height, "black", "black", 0);
  gorect.draw();

ctx.save()
ctx.strokeStyle = 'darkblue'
ctx.fillStyle = 'red'

// text specific styles
ctx.font = 'bold 100px Monospace'
ctx.textAlign = 'center'
ctx.textBaseline = 'alphabetic'

ctx.fillText('Game Over', canvas.width/2, 250)
ctx.strokeText('Game Over', canvas.width/2, 250)

ctx.restore()
  console.log(score);

}

 setTimeout(gameover, 100);
