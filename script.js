import Ball from "./Ball.js";

const ball = new Ball(document.getElementById("ball"));

let lastTime;
function update(time) {
  if (lastTime) {
    //make sure last time is not null before updating
    const delta = time - lastTime;
    ball.update(delta);
    // Update Loop
  }
  lastTime = time;
  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
