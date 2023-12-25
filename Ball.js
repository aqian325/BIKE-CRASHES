// Number of columns and rows for the grid of balls
let numCols = 6;
let numRows = 5;
let crashData; 
let randomQuote;

// Spacing between balls
let spacing = 20;

// Array to hold the Ball objects
let balls = [];
let bikequotes = []; // array of quotes

// Parameters for ball physics
let spring = 0.01; // Reduced spring value for less bounce
let gravity = 0.03; // Reduced gravity for slower movement
let friction = -0.1; // Reduced friction for slower deceleration
let randomness = 0.1; // Adjust the randomness factor

let startDelay = 10 * 60; // 10 seconds delay (60 frames per second)
let movementStarted = false; // Flag to indicate if movement has started

function preload ()  {
  table = loadTable("data/cambridge_incidents_by_year.csv", "header");
  quotes = loadTable("data/bikequotes.csv", "header")
  console.log(table);
  console.log(quotes);

  //convertying csv into array of objects
  crashData = table.getRows();
  quoteData = quotes.getRows();
}


function setup() {
  // createCanvas(3000, 1000);
  let canvas = createCanvas(2000, windowHeight - 100); // Adjust the size as needed
  canvas.parent('animation-container');

  // Calculate the diameter of each ball based on canvas size, spacing, and number of rows
  let diameter = 16; // Set the diameter to 30

  for (let i = 0; i < crashData.length; i++) {
    let year = crashData[i].getNum('year'); // Assuming 'year' is the column header for the year
    let crashesPer10k = crashData[i].getNum('Per_10k_rounded'); // Modify column header accordingly
    let location = crashData[i].getString('city'); // Modify column header accordingly

    // Calculate the number of circles based on incidents per 10,000 residents
    let numCircles = round(crashesPer10k);

    // Create balls in an organized layout
    for (let j = 0; j < numCircles; j++) {
      // Create circles with constant diameter
      let x = spacing + j * (diameter + spacing);
      let y = spacing + i * (diameter + spacing);
      balls.push(new Ball(x, y, diameter));
    }
  }

  noStroke();
  fill(255, 204);
}



function draw() {
  background(16,16,16);

  // Check if the movement has started
  if (frameCount > startDelay) {
    movementStarted = true;
  }

  // Iterate through each ball, update its state, and display it
  balls.forEach(ball => {
    if (movementStarted) {
      ball.collide(); // Check for collisions with other balls
      ball.move();    // Update the position based on velocity
    }
    ball.display(); // Draw the ball
    // ball.mouseOver(randomQuote); //display random quote from bikequotes file
  });
}

// Ball class to represent each ball in the simulation
class Ball {
  constructor(xin, yin, din) {
    this.x = xin;
    this.y = yin;
    this.vx = random(1, 4.5); // Horizontal velocity
    this.vy = 0; // Vertical velocity
    this.diameter = din;
    this.collisionCount = 0; // Track the number of collisions
    this.noiseStart = random(0, 10000);
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
          force.mult(overlap*0.01);
          
          
          /*b1.vx += force.x;
          b1.vy += force.y;
          b2.vx -= force.x;
          b2.vy -= force.y;*/
          
          b1.x += force.x;
          b1.y += force.y;
          
          b2.x -= force.x;
          b2.y -= force.y;
         
         
        }
      }
    }
  }

  move() {
    // Update velocity and position (horizontal movement)
    this.vx += gravity;
    this.x += this.vx;

    // Randomize the vertical movement
    //this.vy += map(random(), 0, 1, -randomness, randomness);
    

    // Update vertical position
    //this.vy += random(-10, 10);
    //this.vy = random(-10, 10);
    this.vy = map(noise(+this.noiseStart+frameCount/10), 0, 1, -2, 2);
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

  display() {
    // Draw the ball
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

// function randomQuote() {
//   let displayquote = quoteData[int(random(2,86))].getString('story_text');
// } 


document.addEventListener('scroll', function () {
  console.log('Scroll event triggered.');
  let scrollPosition = window.scrollX;
  let totalWidth = document.body.scrollWidth - window.innerWidth;
  let progress = (scrollPosition / totalWidth) * 100;
  document.getElementById('scroll-progress').style.width = progress + '%';
});
