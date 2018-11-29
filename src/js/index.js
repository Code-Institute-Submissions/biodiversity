document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDY7c1Ktu8EgwR2j6H7yxzDqsh0bg7rc7M&callback=initMap';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3.3,
        center: {
            lat: 52,
            lng: 240
        }
    });
}

queue()
  .defer(d3.json, "data/akparks.json")
  .await(makeGraphs);

function makeGraphs(error, akparksData) {
  var ndx_alaska = crossfilter(akparksData);

  var category_dim = ndx_alaska.dimension(function(data) {return data.Category;});
  var category_group = category_dim.group().reduceCount();

  dc.pieChart("#num-species")
    .height(1000)
    .radius(500)
    .transitionDuration(1500)
    .dimension(category_dim)
    .group(category_group);

  dc.renderAll();
}
