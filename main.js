let momAudio, dadAudio, sisAudio, broAudio;

let momBox, dadBox, broBox, sisBox;

let squareSize;

let s = 0;

function preload() {
  momAudio = loadSound("audio/Mom.mp3");
  dadAudio = loadSound("audio/Dad.mp3");
  sisAudio = loadSound("audio/Marlena.mp3");
  broAudio = loadSound("audio/Noah.mp3");

  squareSize = windowWidth * 0.15;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);

  sisBox = createVector(
    random(squareSize / 2, width * 0.2),
    random(squareSize / 2, height * 0.5)
  );
  broBox = createVector(
    random(width * 0.3, width * 0.4),
    random(height * 0.5, height - squareSize)
  );
}

function draw() {
  background(100);

  fill(255);

  rect(sisBox.x, sisBox.y, squareSize, squareSize);

  rect(broBox.x, broBox.y, squareSize, squareSize);

  rect(width * 0.6, height * 0.5, squareSize, squareSize);
  rect(width * 0.8, height * 0.5, squareSize, squareSize);
  hoverSis(sisBox.x, sisBox.y);
  hoverBro(broBox.x, broBox.y);
}

function hoverSis(x, y) {
  let d = dist(mouseX, mouseY, x, y);

  if (d < squareSize / 2) {
    push();
    noFill();
    strokeWeight(s);
    stroke(0);
    s += 0.01;
    rect(x, y, squareSize, squareSize);
    pop();
  }

  if (d < squareSize / 2 && !sisAudio.isPlaying()) {
    sisAudio.play();
  } else if (d > squareSize / 2 && sisAudio.isPlaying()) {
    sisAudio.pause();
  }
}

function hoverBro(x, y) {
  let d = dist(mouseX, mouseY, x, y);
  if (d < squareSize / 2 && !broAudio.isPlaying()) {
    broAudio.play();
  }
  if (d > squareSize / 2 && broAudio.isPlaying()) {
    broAudio.pause();
  }
}
