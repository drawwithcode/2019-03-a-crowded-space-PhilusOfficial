var myBall;
var score = 0;
var inPlay = 1;

function preload(){
  // put preload code here
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  myBall = new Ball(width/2, height/2, 40);
}

function draw() {
  //let's create the court
  push();
  background('black');
  fill('black');
  strokeWeight(20);
  stroke('white');
  line(0, 100, width, 100);
  line(0, height-100, width, height-100);
  line(width/2, 100, width/2, height-100);
  pop();
  //make the ball move
  myBall.move();
  myBall.display();

  //let's create the players
  noStroke();
  if (mouseY>180 && mouseY <height-170) {
    rect(200, mouseY, 20, 140)
    rect(width-200, mouseY, 20, 140)
  }
  else if (mouseY<180) {
    rect(200, 180, 20, 140)
    rect(width-200, 180, 20, 140)
  }
  else if (mouseY>height-170) {
    rect(200, height-180, 20, 140)
    rect(width-200, height-180, 20, 140)
  }
  //display score and instructions
  textSize(30);
  text("Score: " + score, width-210, 60);
  fill('white')
  text("Move your mouse to play", 100, 60);
}

//--------------------------------------------------------------------------------------------------------------------------

//let's create our ball
function Ball(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.diameter = _diameter;
  this.color = 'white';
  this.speed = 2 + score/10;

  var yIncrease = 5*random()+this.speed;
  var xIncrease = this.speed*random()+9;

//define the ball
  this.display = function ()  {
    fill(this.color)
    ellipse(this.x, this.y, this.diameter)
  }
//make the ball move
  this.move = function () {
    this.x += xIncrease;
    this.y += yIncrease;

    if(this.y > height-130 || this.y < 130) {
      yIncrease = -yIncrease
    }

    if(this.x > width-230 && this.x <width-220 && this.y > mouseY-70 && this.y<mouseY+70) {
      xIncrease = -xIncrease
      score += 1
    }


    if(this.x < 230 && this.x >220 && this.y > mouseY-70 && this.y<mouseY+70) {
      xIncrease = -xIncrease
      score += 1
    }
//make the game over
    if (this.x>width ||this.x<0) {
      push();
      inPlay = 0;
      strokeWeight(10);
      stroke('white');
      fill(0);
      rectMode(CENTER);
      rect(width/2,height/2-25,600,250);
      noStroke();
      fill('white');
      textAlign(CENTER);
      textSize(30);
      text('Click anywhere to restart', width/2, height/2 + 30);
      textSize(90);
      text('YOU LOSE!', width/2, height/2 - 30);
      pop();
    }
    else inPlay=1;
  }
}

function mouseClicked() {
  if (inPlay==0){location.reload()}

}
