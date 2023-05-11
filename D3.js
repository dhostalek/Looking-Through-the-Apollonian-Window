// Set up the SVG container
var svg = d3.select("body")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

// Define the circle-packing layout
var pack = d3.pack()
  .size([500, 500])
  .padding(3);

// Define the root node
var root = d3.hierarchy({children: []})
  .sum(function(d) { return d.r; });

// Generate the Apollonian Gasket
var nodes = pack(root).descendants();
var circles = svg.selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", function(d) { return d.r; })
  .style("fill", "none")
  .style("stroke", "black");

// Apply the zoom behavior
svg.call(d3.zoom()
  .on("zoom", function() {
    circles.attr("transform", d3.event.transform);
  })
);
