import { createGrid } from "./grid.js";

(function () {
  //basic lib vars on initialization of html
  let canvas, ctx;

  function init() {
    //set up the canvas
    canvas = document.getElementById("GaymeCanvaz");
    ctx = canvas.getContext("2d");

    //color canvas
    function colorcanvas() {
      ctx.save();
      ctx.fillStyle = "cyan";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      createGrid();
      ctx.restore();
    }
    colorcanvas();
  }

  //initialize function after html is completely loade
  document.addEventListener("DOMContentLoaded", init);
})();