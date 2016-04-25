// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

console.log("application");

var getvehicleData = function() {
  $.getJSON({
    url: "/get_vehicle_data",
    type: "get",
    dataType: "json"
  });
};
// You still need to create a route for the json GET request and create a controller function to get data and format json.//

var getStationData = function () {
  $.getJSON({
    url: "/get_stations_data",
    type: "get",
    dataType: "json"
  });
};
