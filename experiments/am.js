

const tileSize = 160;
const cols = 4;    
const rows = 3;    
const layers = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
}

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawSwayTile(cx, cy, size, layers) {
  const variance = size / 30;

 //random size
  const baseSway = random(size * 0.08, size * 0.55);
  const wavelength = random(size * 0.4, size * 1.2);

  //math
  for (let i = 0; i < layers; i++) {
    const inset = (size / layers) * i * 0.5;
    const left = cx - size / 2 + inset;
    const right = cx + size / 2 - inset;
    const top = cy - size / 2 + inset;
    const bottom = cy + size / 2 - inset;

    const sway = baseSway * (i / layers);
    const yBase = lerp(top, bottom, 0.5);

    noFill();
    stroke(255);       
    strokeWeight(1);

    //middle part has more "sway"
    beginShape();
    for (let x = left; x <= right; x += 4) {
      let u = (x - left) / (right - left);  
      let envelope = sin(PI * u);           

      let phase = (TWO_PI * (x - left)) / wavelength;

      let jitterY = random(-variance, variance) * 0.3;
      let y = yBase + sin(phase) * sway * envelope + jitterY;

      vertex(getRandomValue(x, variance * 0.15), y);
    }
    endShape();
  }
}

function draw() {
  background(0); 

  const startX = (width - cols * tileSize) / 2 + tileSize / 2;
  const startY = (height - rows * tileSize) / 2 + tileSize / 2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      drawSwayTile(startX + x * tileSize, startY + y * tileSize, tileSize, layers);
    }
  }
}
