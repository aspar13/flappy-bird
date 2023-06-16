class Obstacle {
  
  constructor() {
    let spacing = random(100,height/2)
    // let spacing = 150;
    var center = random(spacing, height - spacing);

    this.top = center - spacing / 2;
    this.bottom = height - (center + spacing / 2);
    this.x = width;
    this.size = 45;
    this.speed = 5;
    this.color = false;
  }

  display() {
    fill(20, 255, 90);

    if (this.color) {
      fill(255, 50, 25);
    }
    rect(this.x, 0, this.size, this.top, 13);
    rect(this.x, height - this.bottom, this.size, this.bottom, 13);
  }

  move() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x < -this.size;
  }

  hits(bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.size) {
        this.color = true;
        return true;
      }
    }
    return false;
  }
}
