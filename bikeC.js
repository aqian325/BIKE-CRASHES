let tableC;
let tableB;
let hoveredCircleIndex = -1; 
let hspacing;
let vspacing;

function preload() {
  tableC = loadTable("data/cambridge_incidents_by_year.csv", "header");
  console.log(tableC);
  // tableB = loadTable("data/boston_incidents_by_year.csv", "header");
  // console.log(tableB);
  /* multi
   line
   comments */
}

function setup() {
  createCanvas(1200, 2700);
  background(255, 0, 0);
  // frameRate(10);
  hspacing = 190;
  vspacing = 250;
}

function draw() {
  background(0);
  noStroke();

  // Draw circles for data from tableC
  drawCircles(tableC, hspacing, vspacing, 200, 400);

  // Draw circles for data from tableB
  // drawCircles(tableB, hspacing, vspacing, 200, 400);
  
  // console.log(table.getRows().length);

  fill(255);
  // text(frameRate(), 20, height - 20);
  // text("crashes to date:", 20, height - 60);
  // text(frameCount, width - 20, height - 20);
  // text("cambridge 1368 |", 20, height - 20);
  // text("boston 3261", 120, height - 20);

  // circle(200, height - 200, (sqrt(100)) * 8);
  // text("100 crashes", 260, height - 200);

}

function drawCircles(dataTable, hspacing, vspacing, startX, startY) {
  let x = startX;
  let y=startY;
  let i;

  for (let i = 0; i < dataTable.getRowCount(); i++) {
    let row = dataTable.getRow(i);
    let year = row.getString("year");
    let crashes = row.getNum("incident_count");
    let circleRadius = sqrt(crashes)*8;
    let r = circleRadius/2
    let rc=(sqrt(100)*8)

    fill(255);
    const white = color(255,255,255);
    const gray = color(68, 68, 68);
    let m = map(crashes, 0, 700, 0, 1);
    let cc = lerpColor(gray, white, m);

    // Check if the mouse is over the circle
    let d = dist(mouseX, mouseY, x, y);
    if (d < circleRadius / 2) {
      // Mouse is over the circle, highlight it
      fill(0); // Change to a different color when hovered
      hoveredCircleIndex = i; // Store the index of the hovered circle
    } else {
        fill(cc)
      }  
      circle(x, y, circleRadius);  

      fill(cc)
      textSize(24);
      textAlign(CENTER, CENTER);
      text(crashes, x, y+20);
 


    // Draw the circle

    fill(0);
    textSize(16);
    text(year, x, y);
    fill(255)
    circle =  circle(x+r, y-r, (sqrt(100))*8);

    fill(248,249,171)
    triangle(x, y-60, x+10, y-80, x-10 , y-80);

    x += hspacing;

    if (x > width-hspacing) {
      x = 200;
      y += vspacing;
    }
    
  }
  if ((i + 1) % 9 === 0) {
    x = startX;
    y += vspacing;
  }
}

function circle.mouseClicked() {
  let year = tableC.getRow(hoveredCircleIndex).getString("year");
  console.log(year);
  }




  // Additional drawing code for tableB data...

 


  // for (let i = 0; i < table.getRowCount(); i++) {
  //   let row = table.getRow(i);
  //   console.log(row);
  //   let year = row.getString("year");
  //   // console.log(year);
  //   let crashes = row.getNum('incident_count');
  //   console.log(crashes);

  //   let circleRadius = sqrt(crashes)*10 ;
    

  //   fill(255);
  //   const green = color(255, 0, 0);
  //   const gray = color(208, 224, 227);
  //   let m = map(crashes, 0, 600, 0, 1); 
  //   let cc = lerpColor(gray, green, m);
  //   //fill(cc);

  //   // circle(x, y, sqrt(acres)*10);
    
  //   // Check if the mouse is over the circle
  //   let d = dist(mouseX, mouseY, x, y);
  //   if (d < circleRadius / 2) {
  //     // Mouse is over the circle, highlight it
  //     fill(255, 0, 0); // Change to a different color when hovered
  //     hoveredCircleIndex = i; // Store the index of the hovered circle
  //   } else {
  //     fill(cc);
  //   }
    
  //   // Draw the circle
  //   circle(x, y, circleRadius);

  //   // circle(x + 5, y + 5, 10, 10);
  //   x += hspacing;
  //   if (x > width) {
  //     x = 200;
  //     y += vspacing;
  //   }
  // }
  
  // x = 200;
  // y = 200;

  // for (let i = 0; i < table.getRowCount(); i++) {
  //   let row = table.getRow(i);
  //   let year = row.getString("year");
  //   let crashes = row.getNum("incident_count");
  //   fill(255);
  //   text(year, x-5, y);
  //   fill(255)
  //   circle(x+50, y-50, 100);
  //   fill(248,249,171)
  //   triangle(x, y-100, x+20, y-140, x-20, y-140, );
  //   x += hspacing;
  //   if (x > width) {
  //     x = 200;
  //     y += vspacing;
  //   }
  // }

  // x = 200;
  // y = 200;
  
  // for (let i = 0; i < tableB.getRowCount(); i++) {
  //   let row = tableB.getRow(i);
  //   let year = row.getString("year");
  //   let crashes = row.getNum("incident_count");
  
  //   // Additional drawing code for tableB data...
  
  //   x += hspacing;
  //   if (x > width) {
  //     x = 200;
  //     y += vspacing;
  //   }
  // }
  
//   fill(255);
//   //text(frameRate(), 20, height - 20);
//   text("crashes to date:", 20, height - 60);
//   text(frameCount, width - 20, height - 20);
//   text("cambridge 1368 |", 20, height - 20);
//   text("boston 3261", 120, height - 20);


//   circle(200, height - 200, (sqrt(100))*10);
//   text("100 crashes", 260, height - 200);
// }

// function mouseClicked() {
//   let year = table.getRow(hoveredCircleIndex).getString("year");
//   console.log(year);
  
//   // You can handle mouse click events here if needed
  
// }
