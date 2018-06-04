// The Google Map.
var map;

var geoJsonOutput;
var downloadLink;

function init() {
  // Initialise the map.
  map = new google.maps.Map(document.getElementById('map-holder'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeId: 'satellite'
  });
	
  map.data.setControls(['Point', 'LineString', 'Polygon']);
  map.data.setStyle({
    editable: true,
    draggable: true,
    clickable: true
  });

  bindDataLayerListeners(map.data);

  map.data.loadGeoJson('data/2013080.geojson');
  map.data.loadGeoJson('data/2013108.geojson');	
  map.data.loadGeoJson('data/2013109.geojson');	
  map.data.loadGeoJson('data/2013139.geojson');	
  map.data.loadGeoJson('data/2016004.geojson');	
  map.data.loadGeoJson('data/2016016.geojson');
  map.data.loadGeoJson('data/2016030.geojson');	
  map.data.loadGeoJson('data/2016035.geojson');	
  map.data.loadGeoJson('data/2016057.geojson');	
  map.data.loadGeoJson('data/2016141.geojson');
  map.data.loadGeoJson('data/2016148.geojson');
  map.data.loadGeoJson('data/2016149.geojson');
  map.data.loadGeoJson('data/2016187.geojson');	
  map.data.loadGeoJson('data/2016201.geojson');	
  
	
  // Retrieve HTML elements.
  var mapContainer = document.getElementById('map-holder');
  geoJsonOutput = document.getElementById('geojson-output');
  downloadLink = document.getElementById('download-link');
}

google.maps.event.addDomListener(window, 'load', init);

// Refresh different components from other components.
function refreshGeoJsonFromData() {
  map.data.toGeoJson(function(geoJson) {
    geoJsonOutput.value = JSON.stringify(geoJson);
    refreshDownloadLinkFromGeoJson();
  });
}

// Refresh download link.
function refreshDownloadLinkFromGeoJson() {
  downloadLink.href = "data:;base64," + btoa(geoJsonOutput.value);
}

// Apply listeners to refresh the GeoJson display on a given data layer.
function bindDataLayerListeners(dataLayer) {
  dataLayer.addListener('addfeature', refreshGeoJsonFromData);
  dataLayer.addListener('removefeature', refreshGeoJsonFromData);
  dataLayer.addListener('setgeometry', refreshGeoJsonFromData);
}
