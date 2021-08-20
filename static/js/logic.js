var earthquake_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,

});

streetmap.addTo(myMap);

d3.json(earthquake_url).then (function(data) {

  function quake_color(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "red";
      case magnitude > 4:
        return "orange";
      case magnitude > 3:
        return "yellow";
      case magnitude > 2:
        return "green";
      case magnitude > 1:
        return "blue";
      default:
        return "white";
    }
  }


  function quake_size(magnitude) {
    
    return magnitude;
  }

  function attributes(feature) {
    return {
      opacity: 0.75,
      fillOpacity: 0.75,
      fillColor: quake_color(feature.properties.mag),
      color: "White",
      radius: quake_size(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }


  L.geoJson(data, {

    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },

    style: attributes,

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);

    }
  }).addTo(myMap);

  // var legend = L.control({
  //   position: "topleft"
  // });

  // legend.onAdd = function() {
  // 

  // legend.addTo(myMap)
  
});