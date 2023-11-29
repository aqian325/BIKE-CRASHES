let table;
let linechart;
let cabinFont;
let foo;
let y=0;

function preload() {
  table = loadTable("data/cambridge_incidents_by_year.csv", "header");
  cabinFont = loadFont("fonts/Cabin.ttf");
  linechart = loadImage("image/bikeline.png");
}


function setup() {
  createCanvas(windowWidth - 400, windowHeight * 8);
  background('#101010');
}

function draw() {
  // background('101010');
  // image(bikeline, mouseX, mouseY);

  let circleRadius = 10;
  let startY = 420; // Adjusted starting position
  let citySpacing = 40;
  noStroke(); // Remove the black border for circles
  // FontFace = cabinFont; 

  // Legend for Cambridge
  fill(255);
  ellipse(100, 180, circleRadius * 2, circleRadius * 2);
  textSize(28);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Cambridge", 120, 180);

  // Legend for Boston
  fill(255, 255, 255, 0.8);
  ellipse(100, 250, circleRadius * 2, circleRadius * 2);
  textSize(28);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Boston", 120, 250);

  // Text below the legend
  textSize(40);
  textAlign(LEFT, CENTER);
  fill(255);
  text("Each circle represents one death per 100,000 residents", 85, 100);

  for (let i = 0; i < table.getRowCount() - 1; i += 2) {
    let currentRow = table.getRow(i);
    let nextRow = table.getRow(i + 1);

    let year = currentRow.getString("year");

    // Draw labels for year at the top (rotated)
    let xCambridge = map(year, 2015, 2023, 100, width - 100);
    let xBoston = xCambridge + citySpacing;

    push();
    translate(xCambridge, 180); // Adjusted position
    textAlign(CENTER, CENTER);
    textSize(28); // Adjust the text size as needed
    fill(255);
    text(year, 20, 150);
    pop();

    // Draw circles for each incident count with consistent vertical spacing for Cambridge
    let incidentCountCurrent = currentRow.getNum("Per cap rounded");
    for (let k = 0; k < incidentCountCurrent; k++) {
      let y = startY + k * 20;
      fill(255);
      ellipse(xCambridge, y, circleRadius * 2, circleRadius * 2);
    }

    // Draw circles for each incident count with consistent vertical spacing for Boston
    let incidentCountNext = nextRow.getNum("Per cap rounded");

    for (let k = 0; k < incidentCountNext; k++) {
      let y = startY + k * 20;
      fill(255, 255, 255, 0.8);
      ellipse(xBoston, y, circleRadius * 2, circleRadius * 2);
    }
  }
  
  // console.log("Image loaded:", backgroundImage);
  // image(backgroundImage, 0, startY + imageSpacing, width, height - startY - imageSpacing);

}
