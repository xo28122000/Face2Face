var platform = new H.service.Platform({
  apikey: '',
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('mapContainer'),
  maptypes.vector.normal.map,
  {
    zoom: 10,
    center: { lng: -122.431297, lat: 37.773972 },
  }
);

const marker = new H.map.Marker({ lng: -122.431297, lat: 37.773972 });
map.addObject(marker);
