let table;
let linechart;
let cabinFont;
let bikeline;

let isClicked = false;

let cambridgeYPositions = []; // Array to store Y positions for Cambridge

function preload() {
  table = loadTable("data/cambridge_incidents_by_year.csv", "header");
  cabinFont = loadFont("fonts/Cabin.ttf");
  bikeline = loadImage("image/bikeline.png");
}

function setup() {
  createCanvas(windowWidth - 400, windowHeight * 8);
  background('#101010');

  // Initialize the starting Y positions for Cambridge
  for (let i = 0; i < table.getRowCount() - 1; i += 2) {
    cambridgeYPositions.push(420); // Assuming 420 is your startY
  }
}

function draw() {
  background('#101010');

  // Setting position of line chart
  image(bikeline, width - (bikeline.width / 2 + 300), height - (bikeline.height / 2 + 200), bikeline.width / 2, bikeline.height / 2);

  // Load font
  textFont(cabinFont);
  let circleRadius = 20;
  let citySpacing = 40;
  noStroke();

  // Legend for Cambridge
  fill(255);
  ellipse(100, 220, circleRadius * 2, circleRadius * 2);
  textSize(28);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Cambridge", 140, 220);

  // Legend for Boston
  fill(255, 80);
  ellipse(100, 270, circleRadius * 2, circleRadius * 2);
  textSize(28);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Boston", 140, 270);

  // Text below the legend
  textSize(40);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Each circle represents one bike crash per 100,000 residents.", 85, 100);
  text("Each one documents one of too many scary moments.", 85, 150);

  // Drawing circles for Cambridge and Boston
  for (let i = 0; i < table.getRowCount() - 1; i += 2) {
    let currentRow = table.getRow(i);
    let nextRow = table.getRow(i + 1);

    let year = currentRow.getString("year");
    let xCambridge = map(year, 2015, 2023, 100, width - 100);
    let xBoston = xCambridge + citySpacing;

    // Draw labels for year at the top (rotated)
    push();
    translate(xCambridge, 180); // Adjusted position
    textAlign(CENTER, CENTER);
    textSize(28); // Adjust the text size as needed
    fill(255);
    noStroke();
    text(year, 20, 180);
    pop();

    // Draw circles for each incident count for Cambridge
    let incidentCountCurrent = currentRow.getNum("Per cap rounded");
    for (let k = 0; k < incidentCountCurrent; k++) {
      fill(255);
      ellipse(xCambridge, cambridgeYPositions[i / 2] + k * 40, circleRadius * 2, circleRadius * 2);
    }

    // Draw circles for each incident count for Boston
    let incidentCountNext = nextRow.getNum("Per cap rounded");
    for (let k = 0; k < incidentCountNext; k++) {
      fill(255, 255, 255, 80);
      ellipse(xBoston, 420 + k * 40, circleRadius * 2, circleRadius * 2);
    }
  }

  // Update positions on click
  if (isClicked) {
    for (let i = 0; i < cambridgeYPositions.length; i++) {
      cambridgeYPositions[i] += 20; // Move each ball down by framecount
    }
    isClicked = true; // Reset the click state
  }
}

function mousePressed() {
  isClicked = true;
}