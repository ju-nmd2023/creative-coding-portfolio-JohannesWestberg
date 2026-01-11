function setup() {
    createCanvas(innerWidth, innerHeight);
    noLoop();
    noStroke();
    rectMode(CENTER);
}

function draw() {
    background(255);
    const size = int(random(55, 100));
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
            if (random() > 0.3) {
                fill(random(['#d42e20', '#231ba2', '#eeca61', '#ffffff', '#000000']));
                push();
                translate(x + size/2, y + size/2);
                rotate(random(TWO_PI)); 
                rect(0, 0, size, size);
                pop();
            }
        }
    }
    stroke(0);
    strokeWeight(0);
    for (let y = 0; y < height; y += size) line(0, y, width, y);
    for (let x = 0; x < width; x += size) line(x, 0, x, height);
}








