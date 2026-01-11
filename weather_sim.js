let particles = [];

let particleAmount = 2;    
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

function setup() {
  createCanvas(500, 500);
}

// colors and such
function draw() {
  background(255, 40);

  // spawn particles as a sheet
  for (let i = 0; i < particleAmount; i++) {
    let px = random(0, width);
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
  let individualAirThickness = random(0.985, 0.999);                   // each drop slows differently
  let individualGravity = random(gravityStrength * 0.6, gravityStrength * 1.4); // each drop accelerates differently

  particles.push(new Particle(x, y, vx, vy, duration, individualAirThickness, individualGravity));
}


class Particle {
  constructor(x, y, vx, vy, duration, individualAirThickness, individualGravity) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);

    this.duration = duration;
    this.maxduration = duration;

    this.size = random(1, 3);

    this.drag = individualAirThickness;
    this.gravityStrength = individualGravity;
  }

  update() {
    let mag = Math.hypot(dirX, dirY) || 1;
    let dx = dirX / mag;
    let dy = dirY / mag;

    // ✅ use each particle's own gravity & drag
    this.vel.x += dx * 0.0;
    this.vel.y += dy * this.gravityStrength;

    this.vel.mult(this.drag);
    this.pos.add(this.vel);

    this.duration--;
    this.durationEnd = (this.duration <= 0);
  }

  draw() {

    // draw draw draw
    stroke(200, alpha);
    strokeWeight(this.size);

    // streaking
    let len = map(this.vel.mag(), speed * 0.8, speed * 0.7, 5, 11, true);

    // draw streak opposite direction of movement
    let v = this.vel.copy();
    if (v.mag() > 0) v.normalize();

    line(
      this.pos.x,
      this.pos.y,
      this.pos.x - v.x * len,
      this.pos.y - v.y * len
    );
  }
}
