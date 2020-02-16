var platform = new H.service.Platform({
  apikey: ""
});
var geocoder = platform.getGeocodingService();

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map;
initmap();

function initmap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position.coords.latitude, position.coords.longitude);
      map = new H.Map(
        document.getElementById("mapContainer"),
        maptypes.vector.normal.map,
        {
          zoom: 18,
          center: {
            lng: position.coords.longitude,
            lat: position.coords.latitude
          }
        }
      );
    });
    navigator.geolocation.watchPosition(function(position) {
      const marker = new H.map.Marker({
        lng: position.coords.longitude,
        lat: position.coords.latitude
      });
      map.addObject(marker);
    });
  } else {
    console.error("Geolocation is not supported by this browser!");
  }
}
