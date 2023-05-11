function ApollonianGasket(svg, viewportWidth, viewportHeight) {
  this.svg = svg;
  this.viewportWidth = viewportWidth;
  this.viewportHeight = viewportHeight;
  this.circles = [];
  this.currentDepth = 0;
  this.maxDepth = 100;

  // Define the initial circle that generates the Apollonian gasket
  this.addCircle({
    x: this.viewportWidth / 2,
    y: this.viewportHeight / 2,
    r: this.viewportHeight / 2 - 10
  });
}

ApollonianGasket.prototype.addCircle = function(circle) {
  this.circles.push(circle);
  this.currentDepth++;

  // Recursively generate the Apollonian gasket
  if (this.currentDepth < this.maxDepth && circle.r >= 1) {
    var a = circle.a || 1;
    var b = circle.b || 1;
    var c = circle.c || 1;

    this.addCircle({
      x: circle.x + circle.r / 2 * (a - b + c),
      y: circle.y + circle.r / 2 * (a + b - c),
      r: circle.r / 2,
      a: a + 1,
      b: b,
      c: c
    });

    this.addCircle({
      x: circle.x + circle.r / 2 * (-a - b + c),
      y: circle.y + circle.r / 2 * (a - b + c),
      r: circle.r / 2,
      a: a,
      b: b + 1,
      c: c
    });

    this.addCircle({
      x: circle.x + circle.r / 2 * (-a + b + c),
      y: circle.y + circle.r / 2 * (-a + b + c),
      r: circle.r / 2,
      a: a,
      b: b,
      c: c + 1
    });
  }
};

ApollonianGasket.prototype.update = function() {
  var self = this;

  // Calculate the bounding box of the visible area
  var boundingBox = {
    x1: d3.event.translate[0],
    y1: d3.event.translate[1],
    x2: d3.event.translate[0] + this.viewportWidth / d3.event.scale,
    y2: d3.event.translate[1] + this.viewportHeight / d3.event.scale
  };

  // Generate only the circles that intersect with the bounding box
  var circles = this.svg.selectAll("circle")
    .data(this.circles.filter(function(circle) {
      return intersects(circle, boundingBox);
    }));

  circles.enter()
    .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d.r; })
    .style("fill", "
