// Define the main function
function main() {
  // Define the width and height of the SVG element
  var width = window.innerWidth;
  var height = window.innerHeight;
  
  // Create the SVG element
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  // Define the initial Apollonian gasket parameters
  var a = 1;
  var b = 1;
  var c = Math.sqrt(2);
  var k = 1;
  
  // Define the function to compute the next set of circles
  function computeNext(x, y, r) {
    // Compute the three new radii
    var r1 = (r / (k + 1)) * k;
    var r2 = (r / (k + 1)) * (k + 1 - a - b - c);
    var r3 = (r / (k + 1)) * (k + 1 - a - b + c);
    
    // Compute the three new circle positions
    var x1 = x + r + r1;
    var y1 = y;
    var x2 = x + r * Math.cos(2 * Math.PI * a / (k + 1)) + r2 * Math.cos(2 * Math.PI * (a + b) / (k + 1));
    var y2 = y + r * Math.sin(2 * Math.PI * a / (k + 1)) + r2 * Math.sin(2 * Math.PI * (a + b) / (k + 1));
    var x3 = x + r * Math.cos(2 * Math.PI * (a + c) / (k + 1)) + r3 * Math.cos(2 * Math.PI * (a + b + c) / (k + 1));
    var y3 = y + r * Math.sin(2 * Math.PI * (a + c) / (k + 1)) + r3 * Math.sin(2 * Math.PI * (a + b + c) / (k + 1));
    
    // Increment the value of k
    k++;
    
    // Draw the three new circles
    svg.append("circle")
      .attr("cx", x1)
      .attr("cy", y1)
      .attr("r", r1)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "1px");
    svg.append("circle")
      .attr("cx", x2)
      .attr("cy", y2)
      .attr("r", r2)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", "1px");
    svg.append("circle")
      .attr("cx", x3)
      .attr("cy", y3)
