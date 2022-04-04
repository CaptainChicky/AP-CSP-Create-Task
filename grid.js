//coordinate system setup
let canvas, ctx;
canvas = document.getElementById("GaymeCanvaz");
ctx = canvas.getContext("2d");

//draws a grid
export function createGrid() {
  //draw a line every step pixels
  const step = 50;

  //our end points
  const width = canvas.width;
  const height = canvas.height;

  //set our styles
  ctx.save();
  ctx.strokeStyle = "gray"; //line colors
  ctx.fillStyle = "black"; //text color
  ctx.font = "bold 14px monospace"; //font
  ctx.lineWidth = 0.35;

  //draw vertical from x to height
  //not <= because the 800 will get cut off regardless
  for (let x = 0; x < width; x += step) {
    // draw vertical line
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();

    //draw text
    ctx.fillText(x, x, 12);
  }

  //draw horizontal from y to width
  //<= because the 600 is visible on the bottom
  for (let y = 0; y <= height; y += step) {
    //draw horizontal line
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    //draw text
    ctx.fillText(y, 0, y);
  }

  //restore the styles from before this function was called
  ctx.restore();
}