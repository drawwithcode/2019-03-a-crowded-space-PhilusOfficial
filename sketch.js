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
  push();
  background('black');
  fill('black');
  strokeWeight(20);
  stroke('white');
  line(0, 100, width, 100);
  line(0, height-100, width, height-100);
  line(width/2, 100, width/2, height-100);
  pop();

  myBall.move();
  myBall.display();

  noStroke();
  if (mouseY>170 && mouseY <height-170) {
    rect(200, mouseY, 20, 120)
    rect(width-200, mouseY, 20, 120)
  }
  else if (mouseY<170) {
    rect(200, 160, 20, 120)
    rect(width-200, 160, 20, 120)
  }
  else if (mouseY>height-170) {
    rect(200, height-160, 20, 120)
    rect(width-200, height-160, 20, 120)
  }

  textSize(30);
  text("Score: " + score, width-210, 60);
  fill('white')
  text("Move your mouse to play", 100, 60);
}

//--------------------------------------------------------------------------------------------------------------------------

function Ball(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.diameter = _diameter;
  this.color = 'white';
  this.speed = 2 + score/10;

  var yIncrease = 5*random()+this.speed;
  var xIncrease = this.speed*random()+9;

  this.display = function ()  {
    fill(this.color)
    ellipse(this.x, this.y, this.diameter)
  }

  this.move = function () {
    this.x += xIncrease;
    this.y += yIncrease;

    if(this.y > height-130 || this.y < 130) {
      yIncrease = -yIncrease
    }

    if(this.x > width-230 && this.x <width-200 && this.y > mouseY-50 && this.y<mouseY+50) {
      xIncrease = -xIncrease
      score += 1
    }


    if(this.x < 230 && this.x >200 && this.y > mouseY-50 && this.y<mouseY+50) {
      xIncrease = -xIncrease
      score += 1
    }

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
   location.reload()
}
