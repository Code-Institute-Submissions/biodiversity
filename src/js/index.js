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

        var speciesNumByCatAlgae = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Algae') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

        var speciesNumByCatAmphibean = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Amphibian') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });
       var speciesNumByCatBird = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Bird') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

       var speciesNumByCatCrustacean = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Crab/Lobster/Shrimp') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

        var speciesNumByCatFish = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Fish') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

        var speciesNumByCatFungi = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Fungi') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatInsect = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Insect') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatInvertebrate = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Invertebrate') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatMammal = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Mammal') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatNonvascularPlant = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Nonvascular Plant') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatReptile = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Reptile') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatSlug = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Slug/Snail') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatSpider = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Spider/Scorpion') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

           var speciesNumByCatVascularPlant = pname_dim.group().reduceCount(function (d) {
               if (d.Category === 'Vascular Plant') {
                   return +d.SpeciesName ;
               } else {
                   return 0;
               }
           });

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
        .dimension(category_dim)
        .dimension(pname_dim)
        .group(park_size_group)
        .valueAccessor(function (d) {
        return d.value.average;
        });

    var stackedChart = dc.barChart("#speciescat-stack");
       stackedChart 
       .width(1000)
       .height(1000)
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
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .legend(dc.legend().x(470).y(0).itemHeight(15).gap(5));

       stackedChart.margins().left = 100;
       stackedChart.margins().right = 10;
       stackedChart.margins().top = 10;
       stackedChart.margins().bottom = 300;

    dc.renderAll();
}
