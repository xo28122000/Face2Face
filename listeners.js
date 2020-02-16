const addListeners = (map) => {
  //   var mapEvents = new H.mapevents.MapEvents(map);

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  map.addEventListener('drag', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
  });

  map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
    console.log(evt);
  });

  window.addEventListener('resize', () => map.getViewPort().resize());
};

export default addListeners;
