let img;
function preload() {
  img = loadImage("flappybird-animation.gif");
}


class Bird{
  
  constructor(){
    this.y = height/2
    this.x = 30;
    this.size = 30
    
    
    this.gravity = 1;
    this.lift = -6
    this.velocity =0;
    }
  
  display(){
    // fill(255)
    // ellipse(this.x, this.y, this.size, this.size )
    image(img, this.x, this.y);
  }
  
  gForce(){
    
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;
    
    if(this.y > height-this.size/2){
      this.y = height-this.size/2;
      this.velocity = 0;
    }
    
    if(this.y < this.size/2){
      this.y = this.size/2;
      this.velocity = 0;
    }
  }
  
  fly(){
    this.velocity += this.lift*4;
  }
}