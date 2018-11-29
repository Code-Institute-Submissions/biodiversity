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
  .defer(d3.json, "data/parksize.json")
  .await(makeGraphs);

function makeGraphs(error, akparksData, parksizeData) {
  var ndx_alaska = crossfilter(akparksData);
  var ndx_size = crossfilter(parksizeData);

  var category_dim = ndx_alaska.dimension(function(data) {return data.Category;});
  var category_group = category_dim.group().reduceCount();

  var pname_dim = ndx_size.dimension(dc.pluck('Park Name'));
  var park_size_group = pname_dim.group().reduceSum(dc.pluck('Acres'));

  dc.pieChart("#num-species")
    .height(1000)
    .radius(500)
    .transitionDuration(1500)
    .dimension(category_dim)
    .group(category_group);

  dc.pieChart("#park-size")
    .height(1000)
    .radius(500)
    .transitionDuration(1500)
    .dimension(pname_dim)
    .group(park_size_group);

  dc.renderAll();
}
