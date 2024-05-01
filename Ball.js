let crashData;
let spacing = 5;
let diameter = 20; // Diameter of the circles
let startDelay = 6 * 60; // 10 seconds at 60 fps
let movementStarted = false;
let balls = []; // Array to hold the Ball objects
let displayedYears = {}; // Track displayed years to prevent duplicates
let lastYear = 0; // Track the last year processed
let yOffset = 50; // Initial vertical offset for the first year
let gravity = 0.05; // Increased gravity for a faster rightward movement
let friction = -0.1; // Friction to slow the balls near the edges
let randomness = 0.01; // Randomness in the vertical movement

function preload() {
  table = loadTable("data/cambridge_incidents_by_year.csv", "header");
  quotes = loadTable("data/bikequotes.csv", "header");
  console.log(table);
  console.log(quotes);

  // Converting CSV into an array of objects
  crashData = table.getRows();
  quoteData = quotes.getRows();
}

function setup() {
  let canvas = createCanvas(1600, windowHeight - 100);
  canvas.parent('animation-container');
  noStroke();
  fill(255, 204);

  let currentYOffset = yOffset; // Start at initial yOffset

  crashData.forEach((row, i) => {
    let year = row.getNum('year');
    let crashesPer10k = row.getNum('Per_10k_rounded');
    let city = row.getString('city');
    let numCircles = round(crashesPer10k);

    // Adjust Y offset based on year change for clear spacing
    if (year !== lastYear) {
      currentYOffset += i !== 0 ? 50 : 0; // Add space between different years
      lastYear = year;
    }

    // Display year once per unique year
    if (!displayedYears[year]) {
      displayedYears[year] = currentYOffset;
      fill(255);
      text(year, 10, currentYOffset + 20);
    }

    // Create balls in an organized layout
    for (let j = 0; j < numCircles; j++) {
      let x = spacing + j * (diameter + spacing);
      let y = currentYOffset;
      let color = city === "Cambridge" ? '#b6c0d0' : '#d4e1b8';
      balls.push(new Ball(x, y, diameter, color));
    }

    currentYOffset += diameter + spacing; // Increment Y offset after each row
  });
}


function draw() {
  background(16);

  if (frameCount > startDelay) {
      movementStarted = true;
  }

  balls.forEach(ball => {
      if (movementStarted) {
          ball.collide();
          ball.move();
      }
      ball.display();
  });

  // Optionally draw year labels and other UI components
    // Display year labels
    fill(255); // White color for the text
    textSize(16);
    for (let year in displayedYears) {
      text(year, 10, displayedYears[year] + 20);
    }
}

class Ball {
  constructor(x, y, diameter, color) {
      this.x = x+70;
      this.y = y;
      this.vx = random(1, 4.5); // Initial horizontal velocity
      this.vy = 0; // Initial vertical velocity
      this.diameter = diameter;
      this.color = color;
      this.collisionCount = 0;
      this.noiseStart = random(0, 10000);
  }

  move() {
      // Update velocity and position (horizontal movement)
      this.vx += gravity;
      this.x += this.vx;

      // Update vertical position based on noise
      this.vy = map(noise(this.noiseStart + frameCount / 10), 0, 1, -2, 2);
      this.y += this.vy;

      // Handle collisions with canvas edges and apply friction
      if (this.x + this.diameter / 2 > width) {
          this.x = width - this.diameter / 2;
          this.vx *= friction;
      } else if (this.x - this.diameter / 2 < 0) {
          this.x = this.diameter / 2;
          this.vx *= friction;
      }

      if (this.y + this.diameter / 2 > height) {
          this.y = height - this.diameter / 2;
          this.vy *= friction;
      } else if (this.y - this.diameter / 2 < 0) {
          this.y = this.diameter / 2;
          this.vy *= friction;
      }
  }

  collide() {
      // Check for collisions with other balls
      for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
              let b1 = balls[i];
              let b2 = balls[j];
              let distBtwCenters = dist(b1.x, b1.y, b2.x, b2.y);
              let minDist = (b1.diameter + b2.diameter) / 2;

              if (distBtwCenters < minDist) {
                  b1.collisionCount++;
                  b2.collisionCount++;

                  let force = createVector(b1.x - b2.x, b1.y - b2.y); // b2 to b1
                  force.normalize();
                  let overlap = (minDist - distBtwCenters) / 2;
                  force.mult(overlap * 0.01);

                  b1.x += force.x;
                  b1.y += force.y;
                  b2.x -= force.x;
                  b2.y -= force.y;
              }
          }
      }
  }

  display() {
      fill(this.color);
      ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

