//Create a dc.js data table & 3 dc.js charts showing size and breakdown of type of
//organisms present.

queue()
  .defer(d3.json, "static/data/parks.json")
  .defer(d3.json, "static/data/akparks.json")
  .await(dataPlotting);

function dataPlotting(error, parksData, akparksData) {
//Clears filters from the charts
  reset()
//Creates a table to act as a map key
  makeTable(error, parksData);
//Creates 3 charts to display data on the parks.
  makeGraphs(error, akparksData);

  dc.renderAll();

}

function reset() {
  d3.select("#reset")
    .on('click', function() {
      dc.filterAll();
      dc.redrawAll();
    });
}

function makeTable(error, parksData) {

  //Set variables.

  var ndx_parks = crossfilter(parksData);

  var name_dim = ndx_parks.dimension(function(d) {
    return d.ParkName;
  });

  //  Park name and size data table.

  dc.dataTable("#map-key")
    .height(800)
    .width(600)
    .size(8)
    .dimension(name_dim)
    .group(function(d) { return "Parks" })
    .columns([
      function(d) { return d.Label; },
      function(d) { return d.ParkName; },
      function(d) { return d.Acres; }
    ])
    .sortBy(function(d) { return d.ParkName; });

}


function makeGraphs(error, akparksData) {

  //Set Set variables to create the charts.

  var ndx_alaska = crossfilter(akparksData);

  var category_dim = ndx_alaska.dimension(function(data) { return data.Category; });
  var category_group = category_dim.group().reduceCount();

  var pname_dim = ndx_alaska.dimension(dc.pluck('ParkName'));

  //custom reducer calculates average area by park since each entry is counted
  //and thus summed values inaccurate

  var park_size_group = pname_dim.group().reduce(
    function(p, v) {
      p.count++;
      p.total += v.Acres;
      p.average = p.total / p.count;
      return p;
    },

    function(p, v) {
      p.count--;
      if (p.count == 0) {
        p.total = 0;
        p.average = 0;
      }
      else {
        p.total -= v.Acres;
        p.average = p.total / p.count;
      }
      return p;
    },

    function() {
      return { count: 0, total: 0, average: 0 };
    }
  );

  //calculates total number of members of each of the 14 category groups by park,
  //provides the values for the stacked bar chart

  function speciesNumByCat(cat) {
    return pname_dim.group().reduce(
      function(p, v) {
        p.total++;
        if (v.Category == cat) {
          p.match++;
        }
        return p;
      },
      function(p, v) {
        p.total--;
        if (v.Category == cat) {
          p.match--;
        }
        return p;
      },
      function() {
        return { total: 0, match: 0 };
      }
    );
  }

  var Algae = speciesNumByCat("Algae");
  var Amphibean = speciesNumByCat("Amphibian");
  var Bird = speciesNumByCat("Bird");
  var Crustacean = speciesNumByCat("Crab/Lobster/Shrimp");
  var Fish = speciesNumByCat("Fish");
  var Fungi = speciesNumByCat("Fungi");
  var Insect = speciesNumByCat("Insect");
  var Invertebrate = speciesNumByCat("Invertabrate");
  var Mammal = speciesNumByCat("Mammal");
  var NonvascularPlant = speciesNumByCat("Nonvascular Plant");
  var Reptile = speciesNumByCat("Reptile");
  var Slug = speciesNumByCat("Slug/Snail");
  var Spider = speciesNumByCat("Spider/Scorpion");
  var VascularPlant = speciesNumByCat("Vascular Plant");



  //create the 3 dc charts

  //  Park Size pie chart
  //  Category breakdown piechart
  //  Category breakdown by park stackedchart

  dc.pieChart("#park-size")
    .height(500)
    .radius(300)
    .width(window.innerWidth-800)
    .transitionDuration(1500)
    .dimension(pname_dim)
    .group(park_size_group)
    .legend(dc.legend().x(0).y(0).gap(5))
    .externalRadiusPadding(50)
    .colors(d3.scale.ordinal().range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f']))
    .valueAccessor(function(d) {
      return d.value.average;
    })
    .minAngleForLabel(360);

  dc.pieChart("#num-species")
    .height(500)
    .radius(300)
    .width(window.innerWidth-800)
    .transitionDuration(1500)
    .dimension(category_dim)
    .group(category_group)
    .legend(dc.legend().x(0).y(0).gap(5))
    .externalRadiusPadding(50)
    .minAngleForLabel(360);

  var stackedChart = dc.barChart("#speciescat-stack");
  stackedChart
    .width(1000)
    .height(1500)
    .dimension(pname_dim)
    .group(VascularPlant, "Vascular Plant")
    .stack(Bird, "Bird")
    .stack(Fungi, "Fungi")
    .stack(Fish, "Fish")
    .stack(NonvascularPlant, "Nonvascular Plant")
    .stack(Mammal, "Mammal")
    .stack(Invertebrate, "Invertabrate")
    .stack(Insect, "Insect")
    .stack(Crustacean, "Crab/Lobster/Shrimp")
    .stack(Algae, "Algae")
    .stack(Slug, "Slug/Snail")
    .stack(Amphibean, "Amphibian")
    .stack(Reptile, "Reptile")
    .stack(Spider, "Spider/Scorpion")
    .valueAccessor(function(d) {
      return d.value.match;
    })
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .colors(d3.scale.ordinal().range(['#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d', '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476', '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8']))
    .legend(dc.legend().x(40).y(0).itemHeight(15).gap(5));

  stackedChart.margins().left = 300;
  stackedChart.margins().right = 10;
  stackedChart.margins().top = 10;
  stackedChart.margins().bottom = 300;
}
