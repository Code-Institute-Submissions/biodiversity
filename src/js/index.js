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

        function speciesNumByCat(cat) {
              return pname_dim.group().reduce(
                  function (p, v) {
                      p.total++;
                      if(v.Category == cat) {
                          p.match++;
                      }
                      return p;

                  },
                  function (p, v) {
                      p.total--;
                      if(v.Category == cat) {
                          p.match--;
                      }
                      return p;
                  },
                  function () {
                      return {total: 0, match: 0};
                  }
              );
          }

          var speciesNumByCatAlgae = speciesNumByCat("Algae");
          var speciesNumByCatAmphibean = speciesNumByCat("Amphibian");
          var speciesNumByCatBird = speciesNumByCat("Bird");
          var speciesNumByCatCrustacean = speciesNumByCat("Crab/Lobster/Shrimp");
          var speciesNumByCatFish = speciesNumByCat("Fish");
          var speciesNumByCatFungi = speciesNumByCat("Fungi");
          var speciesNumByCatInsect = speciesNumByCat("Insect");
          var speciesNumByCatInvertebrate = speciesNumByCat("Invertabrate");
          var speciesNumByCatMammal = speciesNumByCat("Mammal");
          var speciesNumByCatNonvascularPlant = speciesNumByCat("Nonvascular Plant");
          var speciesNumByCatReptile = speciesNumByCat("Reptile");
          var speciesNumByCatSlug = speciesNumByCat("Slug/Snail");
          var speciesNumByCatSpider = speciesNumByCat("Spider/Scorpion");
          var speciesNumByCatVascularPlant = speciesNumByCat("Vascular Plant") ;

          dc.pieChart("#num-species")
            .height(600)
            .radius(300)
            .transitionDuration(1500)
            .dimension(category_dim)
            .group(category_group)
            .legend(dc.legend().x(40).y(0).gap(5))
            .externalLabels(50)
            .externalRadiusPadding(50);

          dc.pieChart("#park-size")
            .height(600)
            .radius(300)
            .transitionDuration(1500)
            .dimension(pname_dim)
            .group(park_size_group)
            .legend(dc.legend().x(40).y(0).gap(5))
            .externalRadiusPadding(50)
            .valueAccessor(function (d) {
            return d.value.average;
            });

          var stackedChart = dc.barChart("#speciescat-stack");
          stackedChart
              .width(1000)
              .height(1500)
              .dimension(pname_dim)
              .group(speciesNumByCatAlgae, "Algae")
              .stack(speciesNumByCatAmphibean, "Amphibian")
              .stack(speciesNumByCatBird, "Bird")
              .stack(speciesNumByCatCrustacean, "Crustacean")
              .stack(speciesNumByCatFish, "Fish")
              .stack(speciesNumByCatFungi, "Fungi")
              .stack(speciesNumByCatInsect, "Insect")
              .stack(speciesNumByCatInvertebrate, "Invertabrate")
              .stack(speciesNumByCatMammal, "Mammal")
              .stack(speciesNumByCatNonvascularPlant, "Nonvascular Plant")
              .stack(speciesNumByCatReptile, "Reptile")
              .stack(speciesNumByCatSlug, "Slug")
              .stack(speciesNumByCatSpider, "Spider")
              .stack(speciesNumByCatVascularPlant, "Vascular Plant")
              .valueAccessor(function(d) {
                  return d.value.match;
              })
              .x(d3.scale.ordinal())
              .xUnits(dc.units.ordinal)
              .legend(dc.legend().x(40).y(0).itemHeight(15).gap(5));

          stackedChart.margins().left = 300;
          stackedChart.margins().right = 10;
          stackedChart.margins().top = 10;
          stackedChart.margins().bottom = 300;

      dc.renderAll();
}
