

function loadMap(){
   var mymap = L.map('mapid').setView([53.18878,8.24819], 13);
  

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mymap);


  L.marker([53.18878, 8.24819]).addTo(mymap)
      .bindPopup('<a href="https://www.openstreetmap.org/way/273561877#map=19/53.18878/8.24819">Alte Brennerei.</a><p>Komm vorbei.</p>')
      .openPopup();
}

   
if(window.attachEvent) {
    window.attachEvent('onload', loadMap);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function(evt) {
            curronload(evt);
            yourFunctionName(evt);
        };
        window.onload = newonload;
    } else {
        window.onload = loadMap;
    }
}