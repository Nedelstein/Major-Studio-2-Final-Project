//with help from https://www.openprocessing.org/sketch/413567
let allParticles = [];
let maxLevel = 5;
let useFill = false;

let data = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.parent("sketch-holder");
  background(25, 55, 63);
  colorMode(HSB, 360);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  push();
  colorMode(RGB);
  noStroke();
  fill(38, 55, 63, 50);
  rect(0, 0, width, height);
  pop();

  //create and move particles
  for (let i = allParticles.length - 1; i > -1; i--) {
    allParticles[i].move();

    //remove particles that is below the velocity threshold
    if (allParticles[i].vel.mag() < 0.01) {
      allParticles.splice(i, 1);
    }
  }
  if (allParticles.length > 0) {
    data = Delaunay.triangulate(
      allParticles.map(function(pt) {
        return [pt.pos.x, pt.pos.y];
      })
    );
    strokeWeight(0.1);

    for (let i = 0; i < data.length; i += 3) {
      let p1 = allParticles[data[i]];
      let p2 = allParticles[data[i + 1]];
      let p3 = allParticles[data[i + 2]];

      //don't draw triangle if it's area is too big
      let distThresh = 75;

      if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
        continue;
      }
      if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }
      if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
        continue;
      }

      // Base its color by the particle's life.
      // push();
      if (useFill) {
        noStroke();
        fill(150 + p1.life * 1.5, 300, 300);
      } else {
        noFill();
        stroke(150 + p1.life * 1.5, 300, 300);
      }
      // pop();
      triangle(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y);
    }
  }
  allParticles.push(new Particle(mouseX, mouseY, maxLevel));
}

function keyPressed() {
  useFill = !useFill;
}

function Particle(x, y, level) {
  this.level = level;
  this.life = 0;

  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(map(this.level, 0, maxLevel, 5, 2));

  this.move = function() {
    this.life++;

    this.vel.mult(0.9);
    this.pos.add(this.vel);

    if (this.life % 10 == 0) {
      if (this.level > 0) {
        this.level -= 1;

        let newParticle = new Particle(this.pos.x, this.pos.y, this.level - 1);
        allParticles.push(newParticle);
      }
    }
  };
}
