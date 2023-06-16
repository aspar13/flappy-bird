const TOTAL = 700;
let savedBirds = [];
let birds = [];
let obstacle = [];
let counter = 0;
let slider;
let gen = 0;
let obs = 0;

// function  windowResized() {
//   resizeCanvas()
// }

function setup() {
  createCanvas(windowWidth, windowHeight-23);
  slider = createSlider(1, 100, 1);
  slider.style("padding", "0");
  slider.style("margin", "0");
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = new Bird();
  }
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    if (counter % 70 == 0) {
      obstacle.push(new Obstacle());
    }

    counter++;
    for (let i = obstacle.length - 1; i >= 0; i--) {
      obstacle[i].move();

      for (let j = birds.length - 1; j >= 0; j--) {
        if (obstacle[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j, 1)[0]);
          // console.log("HIT")
        }
      }
      if (obstacle[i].offscreen()) {
        obstacle.splice(i, 1);
        obs += 1;
      }
    }

    for (let j = birds.length - 1; j >= 0; j--) {
      if (birds[j].offScreen()) {
        savedBirds.push(birds.splice(j, 1)[0]);
      }
    }

    for (let bird of birds) {
      bird.think(obstacle);
      bird.gForce();
    }

    if (birds.length === 0) {
      counter = 0;
      gen += 1;
      obs = 0;
      nextGeneration();
      obstacle = [];
    }
  }

  background(0);

  for (let bird of birds) {
    bird.display();
  }

  for (let obstac of obstacle) {
    obstac.display();
  }

  fill(114, 188, 225);
  textSize(25);
  text("Generation =" + String(gen), width - 200, 30);
  text("Birds =" + String(birds.length), width - 200, 60);
  text("Obstacle =" + String(obs), width - 200, 90);
}
