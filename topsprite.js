import { updateeggcoords, eggs } from "./eggs.js";
import { gameover } from "./timer.js";
//the import statements will bring useful functions here

(function () {
  //basic lib vars on initialization of html
  let canvas, ctx;

  //this funciton will run as soon as all HTML is loaded
  function init() {
    //set up the canvas
    canvas = document.getElementById("cv2");
    ctx = canvas.getContext("2d");

    //log,canvas posotion of mojse click
    function getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      console.log("x: " + x + " y: " + y);
      document.getElementById("mouseclickcoords").innerHTML =
        "Mouse click coordinates" +
        "<br />" +
        "x: " +
        x +
        "<br />" +
        " y: " +
        y;
    }

    //sets mouse click position to 0 at initial display
    document.getElementById("mouseclickcoords").innerHTML =
      "Mouse click coordinates" + "<br />" + "x: " + 0 + "<br />" + " y: " + 0;
    canvas.addEventListener("mousedown", function (e) {
      getCursorPosition(canvas, e);
    });

    //collision detection
    //returns true if there is any overlap
    //params: x,y,w,h of two rectangles
    //Not my code, was borrowed from StackOverflow:
    //https://stackoverflow.com/questions/6082667/a-javascript-and-canvas-engine-that-is-in-need-of-collision-detection/
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
    let dinox = canvas.width / 2 - 75;
    let dinoy = canvas.height / 2 - 35;

    //draw the dino at dinox, dinoy with nearest neighbor sampling
    let dino;
    function drawDino() {
      dino = new Image();
      dino.src = "./sprites/dino1.png";
      dino.onload = function () {
        ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
      };
      //pixelate image
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
    }
    drawDino();

    //here we will start with a score invoke so we can use this score later easily
    let score = 0;
    //update the html with initial score ofc
    document.getElementById("score").innerHTML = "Score: " + score;

    //somehow when you dont move the dino and the last egg lands on it
    //instead of teleporting out of board, it still teleorts to one last area
    //and if you move the dino to that area you can get more score, despite
    //console logging that all of the coordinates are -69.
    //compeltely restart the construction of this and find a way to debug this
    //it was fixed thru a hardcoding of coordinates after score detection
    function collect() {
      //first two eggs intersect detection with dino looped through a for loop
      for (let i = 1; i <= 2; i += 1) {
        //collision detection with 5 px grace buffer
        if (
          intersects(
            dinox + 5,
            dinoy + 5,
            44 * 3 + 5,
            24 * 3 + 5,
            eggs[i - 1].x,
            eggs[i - 1].y,
            10 * 3,
            14 * 3
          ) == true
        ) {
          clearInterval(eggint[i - 1]);
          ctx.clearRect(eggs[i - 1].x, eggs[i - 1].y, 10 * 3, 14 * 3);
          eggs.forEach((eggs) => {
            if (eggs.id == i) {
              eggs["x"] = -69;
              eggs["y"] = -69;
            }
          });
          drawDino();

          score = score + 25;
          console.log("score: " + score);
          document.getElementById("score").innerHTML = "Score: " + score;
        }
      }

      //collision detection with 5 px grace buffer
      if (
        intersects(
          dinox + 5,
          dinoy + 5,
          44 * 3 + 5,
          24 * 3 + 5,
          eggs[2].x,
          eggs[2].y,
          22 * 3,
          28 * 3
        ) == true
      ) {
        //stops the egg timer that moves it
        clearInterval(eggint[2]);

        //clears egg if needed
        ctx.clearRect(eggs[2].x, eggs[2].y, 22 * 3, 28 * 3);

        //sets the egg coords at a location out of reach
        //to not increase score indefinetely
        eggs.forEach((eggs) => {
          if (eggs.id == 3) {
            eggs["x"] = -69;
            eggs["y"] = -69;
          }
        });

        //restores dino
        drawDino();

        //increases score and logs it
        score = score + 50;
        console.log("score: " + score);
        document.getElementById("score").innerHTML = "Score: " + score;
      }
    }

    //key controls for dino
    //note that e.keycode is depreciated so switch over to something else later
    window.addEventListener(
      "keydown",
      function (e) {
        //right
        if (e.keyCode == 68 || e.keyCode == 39) {
          ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
          dinox = dinox + 5;
          ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
          collect();
        }
        //left
        if (e.keyCode == 65 || e.keyCode == 37) {
          ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
          dinox = dinox - 5;
          ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
          collect();
        }
        //up
        if (e.keyCode == 87 || e.keyCode == 38) {
          ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
          dinoy = dinoy - 5;
          ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
          collect();
        }
        //down
        if (e.keyCode == 83 || e.keyCode == 40) {
          ctx.clearRect(dinox, dinoy, 44 * 3, 24 * 3);
          dinoy = dinoy + 5;
          ctx.drawImage(dino, dinox, dinoy, 44 * 3, 24 * 3);
          collect();
        }

        //screen wrap
        if (dinox < -44 * 3) {
          dinox = 799;
          ctx.clearRect(0, dinoy, 44 * 3, 24 * 3);
          collect();
        } else if (dinox > 799) {
          dinox = -44 * 3;
          ctx.clearRect(725, dinoy, 44 * 3, 24 * 3);
          collect();
        }

        if (dinoy < -24 * 3) {
          dinoy = 599;
          ctx.clearRect(dinox, 0, 44 * 3, 24 * 3);
          collect();
        } else if (dinoy > 599) {
          dinoy = -24 * 3;
          ctx.clearRect(dinox, 540, 44 * 3, 24 * 3);
          collect();
        }
      },
      true
    );

    //starts off this so there is no blank div
    function seteggcoordhtml() {
      document.getElementById("eggcoords").innerHTML =
        "Egg 1 coordinates:" +
        "<br />" +
        "(" +
        eggs[0].x +
        ", " +
        eggs[0].y +
        ")" +
        "<br />" +
        "Egg 2 coordinates:" +
        "<br />" +
        "(" +
        eggs[1].x +
        ", " +
        eggs[1].y +
        ")" +
        "<br />" +
        "Egg 3 coordinates:" +
        "<br />" +
        "(" +
        eggs[2].x +
        ", " +
        eggs[2].y +
        ")";
    }
    seteggcoordhtml();

    //here is the egg constructor
    function makeEggBase(index) {
      const egg = new Image();
      const eggObj = eggs[index - 1];

      egg.src = eggObj.src;

      if (eggObj.type == "super") {
        ctx.clearRect(eggObj.x, eggObj.y, 22 * 3, 28 * 3);
      } else if (eggObj.type == "regular") {
        ctx.clearRect(eggObj.x, eggObj.y, 10 * 3, 14 * 3);
      }

      egg.onload = function () {
        if (eggObj.type == "super") {
          ctx.drawImage(egg, eggObj.x, eggObj.y, 22 * 3, 28 * 3);
        } else if (eggObj.type == "regular") {
          ctx.drawImage(egg, eggObj.x, eggObj.y, 10 * 3, 14 * 3);
        }
      };
      //pixel sampling
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;

      collect();
      updateeggcoords(index);
    }

    //for loop for setting up the intervals
    //the intervals allow the egg to choose a random coordinate every 1000ms
    var eggint = [];
    for (let i = 1; i <= 3; i += 1) {
      eggint[i - 1] = setInterval(makeEggBase, 1000, i);
    }

    //harded coded fix for the bug detailed in the collect();
    function eggcheckint() {
      if (score >= 100) {
        eggs.forEach((eggs) => {
          eggs["x"] = -69;
          eggs["y"] = -69;
        });

        //still in if statememnt, this stop sthe
        //game from using too much resoruces
        //by checking if the score is greater or
        //equal to 100 and then stopping the loop
        clearInterval(cringe);

        //after the loop is stopped, we will log the
        //last coordinates, which should all be -69
        console.log("===============================");
        for (let i = 1; i <= 3; i += 1) {
          console.log(
            "Egg " +
              i +
              " coordinates: " +
              "(" +
              eggs[i - 1].x +
              ", " +
              eggs[i - 1].y +
              ")"
          );
        }
        console.log("===============================");

        //updates the coords one last time
        seteggcoordhtml();
        gameend();
      }
    }
    var cringe = setInterval(eggcheckint, 10);
    //the game end function that will end the game
    //it calls gameover(); draw function from timer.js
    //then it sets all egg coordinates to the default coordinate
    function gameend() {
      gameover();
      for (let i = 0; i <= 2; i += 1) {
        clearInterval(eggint[i]);
      }
      eggs.forEach((eggs) => {
        eggs["x"] = -69;
        eggs["y"] = -69;
      });
      seteggcoordhtml();
    }
    //here is the time limit for the game. its 10 seconds or 10000ms for now
    setTimeout(gameend, 10000);
  }

  //initialize function after html is completely loade
  document.addEventListener("DOMContentLoaded", init);
})();
