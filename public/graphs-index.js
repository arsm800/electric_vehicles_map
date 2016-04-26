console.log("graphs-index");

(function() {         //Use IIFE if you have multiple D3 svgs on same page and you don't want all charts to render in one single svg.//

// var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// var dataset = [];

var drawBars = function(year) {

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


var w = 1200;
var h =400;
var barpadding = 1;
var year = 2013;

var svg = d3.select("body")
.append("svg")
.attr("height", h)
.attr("width", w);

//Create ordinal x scale.//
var xScale = d3.scale.ordinal()
.domain(d3.range(dataset.length))  //Sets scale domain (input) to length of data set.//
.rangeRoundBands([0, w], 0);  //Sets scale range to w / dataset length with .05 space between each bar.//

// var sortOrder = false;
//
// var sortBars = function() {
//   sortOrder = !sortOrder;    //Because the sortOrder variable is defined above as false, we change its value to true when we call the sortBars function.  This seems to happen after the .sort method below is run.//
//   svg.selectAll("rect")
//   .sort(function(a, b) {      //D3 sort method re-orders elements based on bound data values.//
//     if (sortOrder) {          //If sortOrder = true...//
//       return d3.ascending(a, b);  //Comparator function compares a and b (all possible pairs in data array.//)
//     }
//     else {                          //If sortOrder is false...//
//       return d3.descending(a, b);
//     }
//   })
//   .transition()
//   .delay(function(d, i) {
//     return i * 50;
//   })
//   .duration(1000)
//   .attr("x", function(d,i) {
//     return xScale(i);
//   });
// };
//
// var sortText = function() {  //Just sorting the bars will not cause the text values to ascend with them.  Therefore, we define a separate function to sort text values.  Notice it is similar to the sortBars function except for the x attribute is the same as the append text function.//
//
//   svg.selectAll("text")
//   .sort(function(a, b) {
//     if (sortOrder) {
//       return d3.ascending(a, b);
//     }
//     else {
//       return d3.descending(a, b);
//     }
//   })
//   .transition()
//   .duration(1000)
//   .attr("x", function(d, i) {
//     return xScale(i) + xScale.rangeBand() / 2;  //Not exactly sure how this works.//
//   });
// };

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
  .attr("fill", "lime");
})
.on("mouseout", function(d) {    //Changes color of bar back to original color after mouse leaves.//
  d3.select(this)
  .transition()
  .duration(100)
  .attr("fill", "rgb(0, 0, " + (d["electric_vehicles_" + year] * 10) + ")");  //This is the same color as defined on original rect attribute.//
});

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
    var year = 2013;
  });

  $("#bar2012").on("click", function() {
    var year = 2012;
  });

  $("#bar2011").on("click", function() {
    var year = 2011;
  });

  $("#bar2010").on("click", function() {
    var year = 2010;
  });

  $("#bar2009").on("click", function() {
    var year = 2009;
  });
};

drawBars(2013);
clickEventBars();

// var yAxis = d3.svg.axis()
//                   .scale(yScale)
//                   .orient("left")
//                   .ticks(5);
//
// svg.append("g")
//    .attr("class", "axis")
//    .attr("transform", "translate(" + barpadding +", 0)")  //Not sure exactly how this translate syntax works...//f
//    .call(yAxis);

// d3.select("div").on("click", function() {
//   // dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];//
//
//   var numValues = dataset.length;  //Count original length of data set.//
//   data = [];                    //Define empty array.//
//
//   for (var i = 0; i < numValues; i++) {              //Loop through numValue times.//
//     var newNumber = Math.floor(Math.random() * 25);  //Define new random number.//
//     data.push(newNumber);                        //Add new number to array.//
//   }
//
//   svg.selectAll("rect")
//      .data(dataset)
//      .transition()  //Creates animation as bars change heights to represent the new data set.//
//      .delay(200)  //Controls when transition begins.//
//      .duration(1000)  //Controls how long the transition takes.  Units are in milliseconds, so 1000 = 1 second.  Must always be specified after duration.//
//      .ease("cubic-in-out")  //Controls quality of motion in a transition.//
//      .attr("y", function(d) {
//        return h - d * 10;
//      })
//      .attr("height", function(d) {
//        return d * 10;
//      })
//     .attr("fill", function(d) {
//       return "rgb(0, 0, " + (d * 10) + ")";
//     });
//   svg.selectAll("text")
//      .data(dataset)
//      .transition()
//      .delay(200)
//      .duration(1000)
//      .text(function(d) {
//        return d;
//      })
//      .attr("x", function(d, i) {
//        return xScale(i) + xScale.rangeBand() / 2;  //Not exactly sure how this works.//
//      })
//      .attr("y", function(d) {
//        return h - (d * 10) +14;
//      });
// });

})();
