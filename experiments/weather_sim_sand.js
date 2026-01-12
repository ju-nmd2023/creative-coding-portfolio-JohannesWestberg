let particles = [];

let particleAmount = 11;
let speed = 0;
let durationMin = 80;
let durationMax = 400;

// band which spawns particles is now flipped
let bandWidth = 25;    
let bandX = -45;       

// Drags particles across scren
let dirX = 0.2;
let dirY = 0;

// gravity and air "thickness"
let airThickness = 1.4;
let gravityStrength = 0.1;

let bg;

function setup() {
  createCanvas(innerWidth, innerHeight);

  // Variance in "wind"
  dirX = 0.25;
  dirY = random(-0.12, 0.12);

  rebuildBackground();
}

// bg = background
function rebuildBackground() {
  bg = createGraphics(innerWidth, innerHeight);

  // warm colors for sandstorm
  let topCol = color(235, 202, 150);
  let bottomCol = color(90, 60, 35);

  for (let y = 0; y < height; y++) {
    let t = y / (height - 1);
    bg.stroke(lerpColor(topCol, bottomCol, t));
    bg.line(0, y, width, y);
  }

  // new sand particles
  bg.noStroke();
  bg.drawingContext.filter = "blur(18px)";
  for (let i = 0; i < 24; i++) {
    bg.fill(
      random([
        color(210, 165, 95, 55 * 0.55),
        color(190, 140, 70, 45 * 0.55),
        color(160, 110, 60, 40 * 0.55),
        color(240, 210, 160, 35 * 0.55),
      ])
    );
    let w = random(width * 0.07, width * 0.08);
    let h = random(height * 0.08, height * 0.08);
    bg.rect(
      random(-width * 0.12, width * 0.92),
      random(height * 0.14, height * 0.94),
      w,
      h
    );
  }
  bg.drawingContext.filter = "none";

  // New "desert" background
  bg.drawingContext.filter = "blur(10px)";
  for (let i = 0; i < 55; i++) {
    bg.fill(
      random([
        color(255, 230, 190, 20),
        color(255, 210, 140, 18),
        color(230, 185, 110, 16),
        color(200, 150, 85, 14),
      ])
    );
    bg.circle(
      random(width),
      random(height * 0.22, height * 0.55),
      random(10, 55)
    );
  }
  bg.drawingContext.filter = "none";

  // also new desert background
  bg.stroke(255, 220, 170, 10);
  for (let i = 0; i < 260; i++) {
    bg.strokeWeight(random(1, 3));
    let x = random(width);
    let y0 = random(-60, height);
    let y1 = y0 + random(70, 300);
    let tilt = random(-10, 10);
    bg.line(x, y0, x + tilt, y1);
  }

  // grainy
  bg.noStroke();
  bg.fill(255, 235, 200, 6);
  for (let i = 0; i < 3500; i++) {
    bg.rect(random(width), random(height), 1, 1);
  }
}

// colors and such
function draw() {
  image(bg, 0, 0);

  // warm dusty overlay
  noStroke();
  fill(120, 85, 40, 22);
  rect(0, 0, innerWidth, innerHeight);

  // Spawns particles, same as before just vert
  for (let i = 0; i < particleAmount; i++) {
    let px = random(bandX, bandX + bandWidth);
    let py = random(0, innerHeight);
    spawnParticle(px, py);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].durationEnd) particles.splice(i, 1);
  }
}

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

  particles.push(
    new Particle(x, y, vx, vy, duration, individualAirThickness, individualGravity)
  );
}

class Particle {
  constructor(x, y, vx, vy, duration, individualAirThickness, individualGravity) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);

    this.duration = duration;
    this.maxduration = duration;

    this.size = random(0.2, 1);

    this.drag = individualAirThickness;
    this.gravityStrength = individualGravity;

    this.width = random(1.8, 4.8);
    this.length = random(6, 16);

    // per-particle sand color variation
    const sandPalette = [
      color(255, 232, 190),
      color(245, 210, 150),
      color(225, 175, 105),
      color(200, 145, 80),
      color(170, 115, 60),
    ];
    this.baseCol = random(sandPalette);

    this.alphaBoost = random(0.55, 1.15);
  }

  update() {
    let mag = Math.hypot(dirX, dirY) || 1;
    let dx = dirX / mag;
    let dy = dirY / mag;

    // blow particles right, or push them
    this.vel.x += dx * this.gravityStrength;
    this.vel.y += dy * this.gravityStrength * 0.35;

    this.vel.mult(this.drag);
    this.pos.add(this.vel);

    this.duration--;
    this.durationEnd = this.duration <= 0;
  }

  draw() {
    let alpha = map(this.duration, 0, this.maxduration, 0, 210) * this.alphaBoost;
  
    noStroke();
    fill(red(this.baseCol), green(this.baseCol), blue(this.baseCol), alpha);
  
    circle(this.pos.x, this.pos.y, this.size * 5);
}
}
