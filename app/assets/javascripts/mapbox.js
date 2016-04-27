console.log("mapbox");

L.mapbox.accessToken = "pk.eyJ1IjoiYXJzbTgwMCIsImEiOiJjaWw2emQ0cG4wMDR1dWttMHpqbnNreTduIn0.UNqZukLBJRc2FuAvpwVuWQ";

var map = L.mapbox.map('map', 'mapbox.dark')
.setView([38.9047, -77.0164], 10);

$.getJSON("/stations_json", function(response) {
  response.forEach(function(station) {
    var marker = L.marker([parseFloat(station.latitude), parseFloat(station.longitude)]);
    console.log(marker);
    marker.addTo(map);
  });
});




// var  marker = L.marker([38.9047, -77.0164]);
// marker.addTo(map);
