let bird;
let obstacle = [];
let obs = 0;

function setup() {
  createCanvas(windowWidth, windowHeight - 23);
  bird = new Bird();
  obstacle.push(new Obstacle());
}

function draw() {
  background(0);
  bird.display();
  bird.gForce();

  if (frameCount % 70 == 0) {
    obstacle.push(new Obstacle());
  }

  for (let i = obstacle.length - 1; i >= 0; i--) {
    obstacle[i].display();
    obstacle[i].move();

    if (keyIsPressed && key === "y") {
      let obstacle = [];
      obs = 0;
      loop();
    }

    if (obstacle[i].hits(bird)) {
      // console.log("HIT")
      fill("#FF5733");
      textSize(30);
      obstacle[i].display()
      text("Press 'Y' to play again", width / 2 - 150, height / 2);
      noLoop();
    }

    if (obstacle[i].offscreen()) {
      obstacle.splice(i, 1);
      obs += 1;
    }
  }

  fill(114, 188, 225);
  textSize(25);
  text("Obstacle =" + String(obs), width - 200, 60);
}

function keyPressed() {
  if (key == " ") {
    bird.fly();
  }

  if (key == "y") {
    obstacle = [];
    loop();
    obs = 0;
  }
}
