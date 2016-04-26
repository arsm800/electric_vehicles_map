console.log("graphs-index");

(function() {         //Use IIFE if you have multiple D3 svgs on same page and you don't want all charts to render in one single svg.//

  // var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  d3.csv("electric_vehicles.csv", function(d) {
    return {
      state_abbr: d.state_abbr,
      electric_vehicles_2013: +d.electric_vehicles_2013,
      electric_vehicles_2012: +d.electric_vehicles_2012,
      electric_vehicles_2011: +d.electric_vehicles_2011,
      electric_vehicles_2010: +d.electric_vehicles_2010,
      electric_vehicles_2009: +d.electric_vehicles_2009
    },
    function(data) {
      console.log(data[0]);
    };
  });
//
//   var w = 1200;
//   var h = 300;
//   var barpadding = 1;
//
//   var svg = d3.select("body")
//               .append("svg")
//               .attr("height", h)
//               .attr("width", w);
//
//   //Create ordinal x scale.//
//   var xScale = d3.scale.ordinal()
//                        .domain(d3.range(data.length))  //Sets scale domain (input) to length of data set.//
//                        .rangeRoundBands([0, w], 0);  //Sets scale range to w / dataset length with .05 space between each bar.//
//
//   var sortOrder = false;
//
//   var sortBars = function() {
//     sortOrder = !sortOrder;    //Because the sortOrder variable is defined above as false, we change its value to true when we call the sortBars function.  This seems to happen after the .sort method below is run.//
//     svg.selectAll("rect")
//     .sort(function(a, b) {      //D3 sort method re-orders elements based on bound data values.//
//       if (sortOrder) {          //If sortOrder = true...//
//         return d3.ascending(a, b);  //Comparator function compares a and b (all possible pairs in data array.//)
//       }
//       else {                          //If sortOrder is false...//
//         return d3.descending(a, b);
//       }
//     })
//     .transition()
//     .delay(function(d, i) {
//       return i * 50;
//     })
//     .duration(1000)
//     .attr("x", function(d,i) {
//       return xScale(i);
//     });
//   };
//
//   var sortText = function() {  //Just sorting the bars will not cause the text values to ascend with them.  Therefore, we define a separate function to sort text values.  Notice it is similar to the sortBars function except for the x attribute is the same as the append text function.//
//
//     svg.selectAll("text")
//     .sort(function(a, b) {
//       if (sortOrder) {
//         return d3.ascending(a, b);
//       }
//       else {
//         return d3.descending(a, b);
//       }
//     })
//     .transition()
//     .duration(1000)
//     .attr("x", function(d, i) {
//       return xScale(i) + xScale.rangeBand() / 2;  //Not exactly sure how this works.//
//     });
//   };
//
//   svg.selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr({
//       x: function(d, i) {
//         return xScale(i);    //Rectangle location is now based on ordinal scale and not svg/padding.//
//         },
//       y: function(d) {
//         return h - d * 10;  //d * 10 is a multiplier.  in order to make the bars taller and keep everything else in sync, I had to adjust the d multiplier on for rectangle height (line 37), and text y coordinate (line 55).//
//         },
//       width: w / data.length - 1,
//       height: function(d) {
//         return d * 10;
//         },
//       fill: function(d) {
//         return "rgb(0, 0, " + (d * 10) + ")";   //This makes the taller bars bluer.//
//       }
//     })
//     .on("click", function() {
//       sortBars();
//       sortText();
//     })
//     .on("mouseover", function() {      //Changes color of bar when mouse hovers over it.//
//       d3.select(this)
//       .attr("fill", "lime");
//     })
//     .on("mouseout", function(d) {    //Changes color of bar back to original color after mouse leaves.//
//       d3.select(this)
//       .transition()
//       .duration(100)
//       .attr("fill", "rgb(0, 0, " + (d * 10) + ")");  //This is the same color as defined on original rect attribute.//
//     });
//
//   svg.selectAll("text")
//     .data(data)
//     .enter()
//     .append("text")
//     .text(function(d) {
//       return d;
//     })
//     .attr("x", function(d, i) {
//       return i * (w / data.length) + (w / data.length) / 2;  //Modified this slightly from rectangles.html  so that numbers are still centered.  i is order of number in data array.//
//     })
//     .attr("y", function(d) {
//       return h - (d * 10) + 14;
//     })
//     .attr("font-family", "sans-serif")
//     .attr("font-size", "11px")
//     .attr("fill", "white")
//     .attr("text-anchor", "middle");
//
//   d3.select("div").on("click", function() {
//     // dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];//
//
//     var numValues = data.length;  //Count original length of data set.//
//     data = [];                    //Define empty array.//
//
//     for (var i = 0; i < numValues; i++) {              //Loop through numValue times.//
//       var newNumber = Math.floor(Math.random() * 25);  //Define new random number.//
//       data.push(newNumber);                        //Add new number to array.//
//     }
//
//     svg.selectAll("rect")
//        .data(data)
//        .transition()  //Creates animation as bars change heights to represent the new data set.//
//        .delay(200)  //Controls when transition begins.//
//        .duration(1000)  //Controls how long the transition takes.  Units are in milliseconds, so 1000 = 1 second.  Must always be specified after duration.//
//        .ease("cubic-in-out")  //Controls quality of motion in a transition.//
//        .attr("y", function(d) {
//          return h - d * 10;
//        })
//        .attr("height", function(d) {
//          return d * 10;
//        })
//       .attr("fill", function(d) {
//         return "rgb(0, 0, " + (d * 10) + ")";
//       });
//     svg.selectAll("text")
//        .data(data)
//        .transition()
//        .delay(200)
//        .duration(1000)
//        .text(function(d) {
//          return d;
//        })
//        .attr("x", function(d, i) {
//          return xScale(i) + xScale.rangeBand() / 2;  //Not exactly sure how this works.//
//        })
//        .attr("y", function(d) {
//          return h - (d * 10) +14;
//        });
//   });
})();