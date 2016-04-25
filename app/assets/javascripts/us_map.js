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
                       .scale([1200]);   //The default scale is 1000, so anything less shrinks, and anything greater expands it.//

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
d3.csv("/db/electric_vehicles.csv", function(data) {  //Load csv file data and set input domain for color scale.//
  color.domain([
    d3.min(data, function(d) { return d.electric_vehicles_2013; }),
    d3.max(data, function(d) { return d.electric_vehicles_2013; })
  ]);

  console.log("Colors added to csv file domain scale.");

  //Merge electrical vehicle data into GeoJSON.//
  d3.json("us-states.json", function(json) {  //load json file and fires callback function.//
    for (var i = 0; i < data.length; i ++) {  //Loop through data in csv.//
      var dataState = data[i].state;          //Create variable containing state name and get state name from csv.  But how do you know data is an array?//
      var dataValue = parseFloat(data[i].electric_vehicles_2013);  //Get state data value from "electric_vehicles" column in csv and convert from string to float.//
      for (var j = 0; j < json.features.length; j++) {    //Loop through json to find correspondong state names.//
        var jsonState = json.features[j].properties.name;
        if (dataState === jsonState) {                      //If json state name and csv state name match, send csv data value to json.//
          json.features[j].properties.value = dataValue;
          break;
        }
      }
    }

  console.log("json data merge complete");

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
     });
  });
});
