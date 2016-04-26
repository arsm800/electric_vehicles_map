console.log("us_map");

var w = 1200;
var h = 800;
var barpadding = 1;

var svg = d3.select("body")
.append("svg")
.attr("height", h)
.attr("width", w);

var projection = d3.geo.albersUsa()
                       .translate([w/2, h/2]) //This projection variable must be defined before the path variable (below) because otherwise .projection will be undefined.//
                       .scale([1600]);   //The default scale is 1000, so anything less shrinks, and anything greater expands it.//

var path = d3.geo.path()
                 .projection(projection);

// d3.json("us-states.json", function(json) {  //You will need to set up a local server (http, php, etc.) in order for the Chrome browser to render the data from the json in the browser view.//
//
//   //Loads json file and fires callback function.//
//
//   svg.selectAll("path")
//   .data(json.features)   //Bind GeoJSON features to new path elements
//   .enter()
//   .append("path")
//   .attr("d", path)  //A path generator which calculates SVG code.//
//   .attr("stroke-width", 50)     //I can't seem to get this to work.//
//   .style("fill", "navy");
//
// });

var color = d3.scale.quantize()   //A linear scale with discrete output values (eg. 5 different colors.//)
                    .range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49, 163, 84)", "rgb(0, 109, 44)"]);

//This d3.csv() function includes d3.json() function within it.//
d3.csv("electric_vehicles.csv", function(data) {  //Load csv file data and set input domain for color scale.//
  var year = 2013;

  color.domain([
    d3.min(data, function(d) { return d["electric_vehicles_" + year];}),
    d3.max(data, function(d) { return d["electric_vehicles_" + year];})
  ]);
//This is a great example of the differences of dot notation and bracket notation.  Originally, color.domain was returning d.electric_vehicles_2013.  However, dot notation does not accept strings.  Therefore, you cannot simply just add the year (d."electric_vehicles_" + year).  Instead, bracket notation executes the same way but it allows strings.  So see above for way to access each year's data.//


  console.log("Colors added to csv file domain scale.");

  //Merge electrical vehicle data into GeoJSON.//
  d3.json("us-states.json", function(json) {  //load json file and fires callback function.//
    for (var i = 0; i < data.length; i ++) {  //Loop through data in csv.//
      var dataState = data[i].state;          //Create variable containing state name and get state name from csv.  But how do you know data is an array?//
      var dataValue = parseFloat(data[i]["electric_vehicles_" +year]);  //Get state data value from "electric_vehicles" column in csv and convert from string to float.//
      for (var j = 0; j < json.features.length; j++) {    //Loop through json to find correspondong state names.//
        var jsonState = json.features[j].properties.name;
        if (dataState === jsonState) {                      //If json state name and csv state name match, send csv data value to json.//
          json.features[j].properties.value = dataValue;
          break;
        }
      }
    }

  console.log("json data merge complete");

  //Create function to route to state view.//
  var stateView = function() {
    console.log("State clicked.");
    location.href="/states/1";  //Still working on how to get this link to go to the specific state clicked on.//
  };

  //Create paths for d3 map.//
  svg.selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", function(d) {
    var value = d.properties.value;
    if (value) {
      return color(value);
      }
    else {
      return "#ccc";
      }
    })
    .on("mouseover", function(d, i) {
    d3.select(this)
      .style("fill-opacity", 0.5);
    })
    .on("mouseout", function(d, i) {
    d3.selectAll("path")
      .style("fill-opacity", 1);
    })
    .on("click", function() {
    stateView();
    });
  });
});
