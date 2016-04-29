console.log("mapbox");

L.mapbox.accessToken = "pk.eyJ1IjoiYXJzbTgwMCIsImEiOiJjaWw2emQ0cG4wMDR1dWttMHpqbnNreTduIn0.UNqZukLBJRc2FuAvpwVuWQ";

var map = L.mapbox.map("map", "mapbox.dark")
.setView([38.9047, -77.0164], 11);

$.getJSON("/stations_json", function(response) {
  console.log(response);
  response.forEach(function(station) {
    if (station.state_abbr === "DC") {
    var marker = L.marker([parseFloat(station.latitude), parseFloat(station.longitude)]);
    marker.addTo(map);
  }
  });
});




// var  marker = L.marker([38.9047, -77.0164]);
// marker.addTo(map);

// //Implementing Clusters:
//
// L.mapbox.featureLayer("data source?").on("ready", function(e) {
//     var clusterGroup = new L.MarkerClusterGroup();
//     e.target.eachLayer(function(layer) {
//       clusterGroup.addLayer(layer);
//     });
//     map.addLayer(clusterGroup);
// });
