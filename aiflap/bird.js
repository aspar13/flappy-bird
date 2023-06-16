let img;
function preload() {
  img = loadImage("flappybird-animation.gif");
}

class Bird {
  constructor(brain) {
    this.y = height / 2;
    this.x = 60;
    this.size = 30;

    this.gravity = 1;
    this.lift = -6;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 7, 2);
    }
  }
  display() {
    // fill(255)
    // rect(this.x, this.y, this.size, this.size, 8)
    image(img, this.x, this.y);
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(obstacle) {
    let closest = null;
    let closestDis = Infinity;

    for (let i = 0; i < obstacle.length; i++) {
      let d = obstacle[i].x + obstacle[i].size - this.x;
      if (d < closestDis && d > 0) {
        closest = obstacle[i];
        closestDis = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);

    if (output[0] > output[1]) {
      this.fly();
    }
  }

  offScreen() {
    return this.y > height || this.y < 0;
  }

  gForce() {
    this.score++;

    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;
  }

  fly() {
    this.velocity += this.lift * 4;
  }
}
