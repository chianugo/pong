const INITIAL_VELCITY = 0.025;
const VELCOITY_INCREASE = 0.00001;
export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      // to prevent ball going straight up or down or straight side to side
      const heading = randomNumberBetween(0, 2 * Math.PI); // random number between 0 and 360 degress in radians
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    this.velocity = INITIAL_VELCITY;
  }

  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  // Getters and Setters for x and y postion
  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }

  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }

  update(delta) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity = Math.min(this.velocity + VELCOITY_INCREASE * delta, 7); // div by 2 causes trailing
    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
      document.documentElement.style.setProperty(
        "--hue",
        randomNumberBetween(0, 360)
      );
    }

    if (rect.right >= window.innerWidth || rect.left <= 0) {
      this.direction.x *= -1;
      document.documentElement.style.setProperty(
        "--hue",
        randomNumberBetween(0, 360)
      );
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
