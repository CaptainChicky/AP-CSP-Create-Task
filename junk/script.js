(function () {
//basic lib vars on initialization of html
  let gravity, ball, friction, canvas, ctx
function init() {

  canvas = document.getElementById("GaymeCanvaz");
  ctx = canvas.getContext("2d");


    // world/scene settings
      gravity = 0.5
    friction = 0.98

  //start obj
    ball = {
    bounce: 0.75, // energy lost on bounce (25%)
    radius: 30,
    x: canvas.width / 2,
    y: canvas.height / 2,
    velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
    velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
  }


    window.requestAnimationFrame(update)
  
  }

  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    //=======================
    //draw obj
      ctx.beginPath()
  ctx.fillStyle = 'blue'
  ctx.arc(
    ball.x, ball.y,
    ball.radius,
    0, Math.PI * 2
  )
  ctx.fill()

  //==============================















    
  }

  function update () {
    // queue the next update
    window.requestAnimationFrame(update)

    // logic goes here

    // bottom bound / floor
    if (ball.y + ball.radius >= canvas.height) {
      ball.velY *= -ball.bounce
      ball.y = canvas.height - ball.radius
      ball.velX *= friction
    }
    // top bound / ceiling
    if (ball.y - ball.radius <= 0) {
      ball.velY *= -ball.bounce
      ball.y = ball.radius
      ball.velX *= friction
    }

    // left bound
    if (ball.x - ball.radius <= 0) {
      ball.velX *= -ball.bounce
      ball.x = ball.radius
    }
    // right bound
    if (ball.x + ball.radius >= canvas.width) {
      ball.velX *= -ball.bounce
      ball.x = canvas.width - ball.radius
    }

    // reset insignificant amounts to 0
    if (ball.velX < 0.01 && ball.velX > -0.01) {
      ball.velX = 0
    }
    if (ball.velY < 0.01 && ball.velY > -0.01) {
      ball.velY = 0
    }

    // add gravity
    ball.velY += gravity

    // update ball position
    ball.x += ball.velX
    ball.y += ball.velY

    // draw after logic/calculations
    draw()
  }



//initialize function after html is completely loade
document.addEventListener("DOMContentLoaded", init)

  })()