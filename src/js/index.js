/*document.addEventListener('DOMContentLoaded', function () {
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
        zoom: 4.5,
        center: {
            lat: 64.07,
            lng: -152.29
        }
    });

    var locations = [{
                lat: 61,
                lng: -142
            },
            {
                lat: 60.97,
                lng: -153.42
            },
            {
                lat: 67.55,
                lng: -159.28
            },
            {
                lat: 59.92,
                lng: -149.65
            },
            {
                lat: 58.5,
                lng: -155
            },
            {
                lat: 58.5,
                lng: -137
            },
            {
                lat: 67.78,
                lng: -153.3
            },
            {
                lat: 63.33,
                lng: -150.5
            }
            ];
            var markers = locations.map(function(location) {
                return new google.maps.Marker({
                    position: location,
                });
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });

}*/

/*queue()
  .defer(d3.json, "data/akparks.json")
  .defer(d3.json, "data/parksize.json")
  .await(makeGraphs);

function makeGraphs(error, akparksData, parksizeData) {
  var ndx_alaska = crossfilter(akparksData);
  //var ndx_size = crossfilter(parksizeData);

  var category_dim = ndx_alaska.dimension(function(data) {return data.Category;});
  var category_group = category_dim.group().reduceCount();

  var pname_dim = ndx_alaska.dimension(dc.pluck('ParkName'));
  var park_size_group = pname_dim.group().reduce(

        function (p,v) {
            p.count++;
            p.total += v.Acres;
            p.average = p.total / p.count;
            return p;
        },

        function (p,v) {
            p.count --;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Acres;
                p.average = p.total / p.count;
            }
            return p;
        },

        function() {
            return {count: 0, total: 0, average: 0};
        }
        );

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
      .group(park_size_group)
      .valueAccessor(function (d) {
        return d.value.average
      });

  dc.renderAll();
}*/

queue()
    .defer(d3.json, "data/akparks.json")
    .await(makeGraphs);

function makeGraphs(error, akparksData, parksizeData) {
    var ndx_alaska = crossfilter(akparksData);

    var category_dim = ndx_alaska.dimension(function(data) {return data.Category;});
    var category_group = category_dim.group().reduceCount();

    var pname_dim = ndx_alaska.dimension(dc.pluck('ParkName'));
    var park_size_group = pname_dim.group().reduce(

        function (p,v) {
            p.count++;
            p.total += v.Acres;
            p.average = p.total / p.count;
            return p;
        },

        function (p,v) {
            p.count --;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.Acres;
                p.average = p.total / p.count;
            }
            return p;
        },

        function() {
            return {count: 0, total: 0, average: 0};
        }
        );

dc.pieChart("#num-species")
        .height(1000)
        .radius(500)
        .transitionDuration(1500)
        .dimension(category_dim)
        .group(category_group);


    /*dc.pieChart("#num-species2")
        .height(700)
        .radius(300)
        .transitionDuration(1500)
        .dimension(pname_dim)
        .group(park_size_group);*/

        dc.pieChart("#park-size")
        .height(1000)
        .radius(500)
        .transitionDuration(1500)
        .dimension(category_dim)
        .dimension(pname_dim)
        .group(park_size_group)
        .valueAccessor(function (d) {
        return d.value.average;
        });

        dc.renderAll();
}
