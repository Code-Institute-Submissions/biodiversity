document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDY7c1Ktu8EgwR2j6H7yxzDqsh0bg7rc7M&callback=initMap';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

function initMap() {
    //var labels = "ABCDEFGHIJKLMONPQRSTUVWXYZ";
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4.5,
          center: {lat: 64.07, lng: -152.29}
    });


             var locations = [{lat: 63.33, lng: -150.5},
            {lat:67.78, lng: -153.3 },
            {lat: 58.5, lng: -137},
            {lat: 58.5, lng: -155},
            {lat: 59.92, lng: -149.65},
            {lat: 67.55, lng: -159.28},
            {lat: 60.97, lng: -153.42},
            {lat: 61, lng: -142}
            ];
            var markers = locations.map(function(location) {
                return new google.maps.Marker({
                    position: location,
                });
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
}
