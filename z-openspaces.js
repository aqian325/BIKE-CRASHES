let table;
let hoveredCircleIndex = -1;
let circles = []; // Declare circles as an array
let showTown = false;

function preload() {
  table = loadTable("data/open_spaces_grouped.csv", "header");
  console.log(table);
}

function setup() {
  createCanvas(1800, 2000);
  background(32, 32, 32);
  frameRate(10);

}

function draw() {
  background(0);
  noStroke();

  // // Add the header
  // fill(255);
  // textSize(24); // Adjust the font size as needed
  // textAlign(CENTER);
  // text("Open Spaces in Massachusetts", width / 2, 30);

  let hspacing = 150;
  let vspacing = 70;
  let x = 20;
  let y = 500;

  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let town = row.getString("TOWN_ID");
    let acres = row.getNum("GIS_ACRES");
    let name = row.getString("Town");
    let circleRadius = sqrt(acres);

    fill(255);
    const green = color(124, 252, 0);
    const gray = color(0, 0, 0);
    let m = map(acres, 0, 10000, 0, 1);
    let cc = lerpColor(gray, green, m);

    let d = dist(mouseX, mouseY, x, y);

    if (d < circleRadius / 2) {
      fill(255, 0, 0);
      hoveredCircleIndex = i;

      if (hoveredCircleIndex !== -1) {
        let name1 = table.getRow(hoveredCircleIndex).getString("Town");
        let acreage = parseFloat(table.getRow(hoveredCircleIndex).getString("GIS_ACRES"));
        let households = parseInt(table.getRow(hoveredCircleIndex).getString("Households"));
        let income = parseFloat(table.getRow(hoveredCircleIndex).getString("Median income"));        
        let formattedNumber = income.toLocaleString();
        fill(255, 0, 0);
        textStyle(BOLD);

        // Adjusted the x-coordinate to place the text to the right of the circle
        // text(name1, x + circleRadius, y); //text next to circles
        textSize(40);
        // fill(124, 252, 0);
        text(name1, 40, 190);
        textSize(24);
        text(round(acreage,2) + " acres of green space", 40, 250);
        text(households + " households", 40, 300);
        text("median income per household $"+formattedNumber, 40, 350);
      }
    } else {
      fill(cc);
    }

    // Draw the circle
    circle(x, y, circleRadius);

    x += hspacing;
    if (x > width) {
      x = 20;
      y += vspacing;
    }
  }

  x = 20;
  y = 50;

  fill(255);
  text(frameCount, 20, height - 20);
}

function mouseClicked() {
  if (hoveredCircleIndex !== -1) {
    let name1 = table.getRow(hoveredCircleIndex).getString("Town");
    console.log(name1);
  }
}
