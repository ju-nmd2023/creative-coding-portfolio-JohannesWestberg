function setup() {
    createCanvas(innerWidth, innerHeight);
    noLoop();
  }
  
  function draw() {
    background(255);
  
    const size = int(random(120, 160));
  
    for (let y = 0; y < height; ) {
      for (let x = 0; x < width; ) {
        if (random() > 0.3) {
          let w = int(random(1, 3)) * size; 
          let h = int(random(1, 3)) * size;
  
          if (x + w > width) w = size;
          if (y + h > height) h = size;

          fill(random(['#d42e20', '#231ba2', '#eeca61', '#ffffff', '#000000']));
          noStroke();
          rect(x, y, w, h);
  

          stroke(0);
          strokeWeight(4);
          noFill();
          rect(x, y, w, h);
  
          x += w;
        } else {
          x += size; 
        }
      }
      y += size;
    }
  }











  


