function setup() {
    createCanvas(innerWidth, innerHeight);
    noLoop();
    noStroke();
}

function draw() {
    background(255);
    const size = int(random(60,150));
    for (let y = 0; y < height; y += size) {
        for (let x = 0; x < width; x += size) {
            if (random() > 0.3) {
                fill(random(['#d42e20', '#231ba2', '#eeca61', '#ffffff', '#000000']));
                rect(x, y, size, size);
            }
        
        
        }
    }
    stroke(0);
    strokeWeight(4);
    for (let y = 0; y < height; y += size) line(0, y, width, y);
    for (let x = 0; x < width; x += size) line(x, 0, x, height);
}