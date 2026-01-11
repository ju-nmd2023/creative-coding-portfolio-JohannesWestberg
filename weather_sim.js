let particles = [];

let particleAmount = 5;    
let speed = 0;             
let durationMin = 80;
let durationMax = 900;

let bandHeight = 25;        
let bandY = -25;            

let dirX = 0;              
let dirY = 0.2;              

// gravity and air "thickness"
let airThickness = 0.9;
let gravityStrength = 0.15;

let bg;

function setup() {
  createCanvas(innerWidth, innerHeight);
  dirX = random(-0.25, 0.25);
  dirY = 0.2;
  rebuildBackground();
}

//bg = background
function rebuildBackground() {
  bg = createGraphics(innerWidth, innerHeight);

  let topCol = color(210);
  let bottomCol = color(10);

  for (let y = 0; y < height; y++) {
    let t = y / (height - 1);
    bg.stroke(lerpColor(topCol, bottomCol, t));
    bg.line(0, y, width, y);
  }

  bg.noStroke();
  bg.drawingContext.filter = "blur(18px)";
  for (let i = 0; i < 24; i++) {
    bg.fill(random([
      color(0, 70),
      color(20, 60),
      color(40, 45),
      color(10, 85)
    ]));
    let w = random(width * 0.14, width * 0.65);
    let h = random(height * 0.08, height * 0.36);
    bg.rect(random(-width * 0.12, width * 0.92), random(height * 0.14, height * 0.94), w, h);
  }
  bg.drawingContext.filter = "none";

  bg.drawingContext.filter = "blur(10px)";
  for (let i = 0; i < 55; i++) {
    bg.fill(random([
      color(255, 28),
      color(235, 26),
      color(210, 22),
      color(245, 20)
    ]));
    bg.circle(random(width), random(height * 0.22, height * 0.55), random(8, 44));
  }
  bg.drawingContext.filter = "none";

  bg.stroke(255, 12);
  for (let i = 0; i < 260; i++) {
    bg.strokeWeight(random(1, 3));
    let x = random(width);
    let y0 = random(-60, height);
    let y1 = y0 + random(70, 300);
    let tilt = random(-10, 10);
    bg.line(x, y0, x + tilt, y1);
  }

  bg.noStroke();
  bg.fill(255, 6);
  for (let i = 0; i < 3500; i++) {
    bg.rect(random(width), random(height), 1, 1);
  }
}

// colors and such
function draw() {
  image(bg, 0, 0);
  noStroke();
  fill(0, 28);
  rect(0, 0, innerWidth, innerHeight);

  // spawn particles as a sheet
  for (let i = 0; i < particleAmount; i++) {
    let px = random(0, innerWidth);
    let py = random(bandY, bandY + bandHeight);
    spawnParticle(px, py);
  }

  // chatGpt helped me debug here
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].durationEnd) particles.splice(i, 1);
  }
}

//chat gpt helped me debug this section
function spawnParticle(x, y) {
  let mag = Math.hypot(dirX, dirY) || 1;
  let dx = dirX / mag;
  let dy = dirY / mag;
  let spd = random(speed * 0.6, speed * 1.4);
  let vx = dx * spd;
  let vy = dy * spd;

  let duration = int(random(durationMin, durationMax));
  let individualAirThickness = random(0.985, 0.999);                   
  let individualGravity = random(gravityStrength * 0.6, gravityStrength * 1.4); 

  particles.push(new Particle(x, y, vx, vy, duration, individualAirThickness, individualGravity));
}

//bunch of math
class Particle {
  constructor(x, y, vx, vy, duration, individualAirThickness, individualGravity) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);

    this.duration = duration;
    this.maxduration = duration;

    this.size = random(0.2, 1);

    this.drag = individualAirThickness;
    this.gravityStrength = individualGravity;

    this.width = random(1.5, 3.5);
    this.length = random(8, 18);
  }

  update() {
    let mag = Math.hypot(dirX, dirY) || 1;
    let dx = dirX / mag;
    let dy = dirY / mag;

    // Make "rain" be more individual.
    this.vel.x += dx * this.gravityStrength * 0.35;
    this.vel.y += dy * this.gravityStrength;

    this.vel.mult(this.drag);
    this.pos.add(this.vel);

    this.duration--;
    this.durationEnd = (this.duration <= 0);
  }

  draw() {
    let alpha = map(this.duration, 0, this.maxduration, 0, 210);

    // draw draw draw
    noStroke();
    strokeWeight(this.size * 0.1);
    fill(180, alpha * 0.6);
  

    let angle = atan2(this.vel.y, this.vel.x);
    let len = this.length;
    let w = this.width;

    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, len, w);
    pop();
  }
}
