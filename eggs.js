//set up canvas and context
let canvas, ctx;
canvas = document.getElementById("GaymeCanvaz");
ctx = canvas.getContext("2d");

//get random int btwen 5 and max
export function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 5;
}

//sets up the initial coordinates of the eggs
let x = getRandomInt(800) - 15;
let y = getRandomInt(600) - 20;

//our list of egg objects
let eggs = [
  {
    id: 1,
    type: "regular",
    src: "./sprites/egg1.png",
    x: x,
    y: y
  },

  {
    id: 2,
    type: "regular",
    src: "./sprites/egg2.png",
    x: x,
    y: y
  },

  {
    id: 3,
    type: "super",
    src: "./sprites/egg3.png",
    x: x,
    y: y
  }
];

//export so topsprite can use later
export { eggs };

//this function updates a single egg's coordinates
export function updateeggcoords(eggnum) {
  //grabs the random integer first
  x = getRandomInt(800) - 15;
  y = getRandomInt(600) - 20;

  //based on our argument we change that egg's coords
  eggs.forEach((eggs) => {
    if (eggs.id == eggnum) {
      eggs["x"] = x;
      eggs["y"] = y;
    }
  });

  //we also log it on the console
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

  //and update it on the html
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