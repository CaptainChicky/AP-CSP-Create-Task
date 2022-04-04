let canvas, ctx;
canvas = document.getElementById("GaymeCanvaz");
ctx = canvas.getContext("2d");

//get random int btwen 5 and max
export function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 5;
}

let x = getRandomInt(800) - 15;
let y = getRandomInt(600) - 20;

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
export { eggs };

export function updateeggcoords(eggnum) {
  x = getRandomInt(800) - 15;
  y = getRandomInt(600) - 20;
  
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
  
  eggs.forEach((eggs) => {
    if (eggs.id == eggnum) {
      eggs["x"] = x;
      eggs["y"] = y;
    }
  });
}
