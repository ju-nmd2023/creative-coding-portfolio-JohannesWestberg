let baseSway; 
let wavelength = 90;
let speed = 6;
let yBase;

let t = 0;

function setup() {
  createCanvas(500, 500);
  yBase = height / 2;

  baseSway = random(0, 100); 
}

function draw() {
  background(0);

  t += 0.025 * speed;

  stroke(255);
  strokeWeight(6);
  noFill();


  //math and such
  beginShape();
  for (let x = 0; x <= width; x += 1) {
    let envelope = sin(PI * x / width);
    let localSway = baseSway * envelope;

    let phase = (TWO_PI * x) / wavelength + t;
    let y = yBase + sin(phase) * localSway;

    vertex(x, y);
  }
  endShape();
}