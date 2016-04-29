console.log("graphs-index");

(function() {         //Use IIFE if you have multiple D3 svgs on same page and you don't want all charts to render in one single svg.//

var w = 1200;
var h =400;
var barpadding = 1;

var svg = d3.select("#bars")
.append("svg")
.attr("height", h)
.attr("width", w);



var drawBars = function(year) {

$("#bars").empty();

var svg = d3.select("#bars")
  .append("svg")
  .attr("height", h)
  .attr("width", w);

d3.csv("electric_vehicles.csv", function(dataset) {   //"dataset" is the argument you need to pass through .data() for "rect" and "text".//
dataset.forEach(function(dd) {
  dd.electric_vehicles_2013 = +dd.electric_vehicles_2013;
  dd.electric_vehicles_2012 = +dd.electric_vehicles_2012;
  dd.electric_vehicles_2011 = +dd.electric_vehicles_2011;
  dd.electric_vehicles_2010 = +dd.electric_vehicles_2010;
  dd.electric_vehicles_2009 = +dd.electric_vehicles_2009;
});
// for (var i = 0; i < d.length; i ++) {
//   dataset.push(d[i]);
console.log(dataset[0]);

//Create ordinal x scale.//
var xScale = d3.scale.ordinal()
.domain(d3.range(dataset.length))  //Sets scale domain (input) to length of data set.//
.rangeRoundBands([0, w], 0);  //Sets scale range to w / dataset length with .05 space between each bar.//


svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr({
  x: function(d, i) {
    return xScale(i);    //Rectangle location is now based on ordinal scale and not svg/padding.//
  },
  y: function(d) {
    return h - d["electric_vehicles_" + year] * 0.1;  //d * .175 is a multiplier.  In order to get the entire bar representing California to fit on the svg, I reduced it from 10 to .175.  As a result, the CA bar fits, but every other state's bar apprears much shorter.//
  },
  width: w / dataset.length + 1,
  height: function(d) {
    return d["electric_vehicles_" + year] * 10;
  },
  fill: function(d) {
    return "rgb(0, 0, " + (d["electric_vehicles_" + year] * 10) + ")";   //This makes the taller bars bluer.//
  }
})
.on("click", function() {
  sortBars();
  sortText();
})
.on("mouseover", function() {      //Changes color of bar when mouse hovers over it.//
  d3.select(this)
  .attr("fill", "aqua");
})
.on("mouseout", function(d) {    //Changes color of bar back to original color after mouse leaves.//
  d3.select(this)
  .transition()
  .duration(100)
  .attr("fill", "rgb(0, 0, " + (d["electric_vehicles_" + year] * 10) + ")");  //This is the same color as defined on original rect attribute.//
});

console.log(year);

svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
  return d.state_abbr;
})
.attr("x", function(d, i) {
  return i * (w / dataset.length) + (w / dataset.length) / 2;  //Modified this slightly from rectangles.html  so that numbers are still centered.  i is order of number in data array.//
})
.attr("y", function(d) {
  return h - d["electric_vehicles_" + year];
})
.attr("font-family", "helvetica")
.attr("font-size", "11px")
.attr("fill", "black")
.attr("text-anchor", "middle");

//Create x axis.//
var xAxis = d3.svg.axis()
.scale(xScale)
.orient("bottom")  //Specifies whether axis labels are above ("top") or below ("bottom") axis.//
.ticks(51); //Sets number of ticks on axis.//

svg.append("g")    //"g" refers to a group element, so we append a group element to svg and call the xAxis function defined above.  Group elements are invisible, but are used to group visible svg elements.//
.attr("class", "axis")
.attr("transform", "translate(0, " + (h - 20) + ")")  //Transform property has translate(x, y), where the g element x axis shifts laterally by 0, and horizontally down by h - padding.//
.call(xAxis);
});
};

var clickEventBars = function() {
  $("#bar2013").on("click", function() {
    drawBars(2013);
  });

  $("#bar2012").on("click", function() {
    drawBars(2012);
  });

  $("#bar2011").on("click", function() {
    drawBars(2011);
  });

  $("#bar2010").on("click", function() {
    drawBars(2010);
  });

  $("#bar2009").on("click", function() {
    drawBars(2009);
  });
};

drawBars(2013);
clickEventBars();


})();
