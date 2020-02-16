//  getting geolocation

// object returned :
// latitude: 37.790638699999995
// longitude: -122.390079
// altitude: null
// accuracy: 7725
// altitudeAccuracy: null
// heading: null
// speed: null
// ----------------------

var platform = new H.service.Platform({
  apikey: 'oZfqHHpjtfm4ttC7SAMUkggX8REuSnCAi7AFLYdiccE'
})

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers()

// Instantiate (and display) a map object:
var map
initmap()

function initmap() {
  var allowGeolocation = false
  var userlat = 0
  var userlong = 0
  if (navigator.geolocation) {
    allowGeolocation = true
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude, position.coords.longitude)
      userlat = position.coords.latitude
      userlong = position.coords.longitude

      console.log(userlat, userlong)

      map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.vector.normal.map,
        {
          zoom: 18,
          center: { lng: userlong, lat: userlat }
        }
      )
      const marker = new H.map.Marker({ lng: userlong, lat: userlat })
      map.addObject(marker)
    })
  } else {
    console.error('Geolocation is not supported by this browser!')
  }
}
