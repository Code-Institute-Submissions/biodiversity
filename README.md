# Interactive Frontend Development Milestone Project

## Data Visualisation Project

This dashboard allows easy Visualisation of the location of all of the Alaskan National Parks and an overview of the biodiversity within the parks. Combining Google Maps and Dimensional Charting (dc.js) to allow rapid understanding of a large volume of data.

![Denali National Park, Alaska](https://www.goodfreephotos.com/albums/united-states/alaska/denali-national-park/landscape-with-mountains-in-denali-national-park-alaska.jpg)

Photo via [Good Free Photos](https://www.goodfreephotos.com)

### UX

Between the data driven nature of this project and my need to see the charts to understand what would work and what would not there were no detailed sketches made and Balsamiq was not used.

Simple pen and paper sketches suggested three to four charts would be a maximum to fit on a single page without crowding.

[The brief](https://courses.codeinstitute.net/courses/course-v1:CodeInstitute+IFD101+2017_T3/courseware/e4482ae18d3142f7ba989b247b2e5ba9/d28b5efca8d4424ab3095f65010b3181/?activate_block_id=block-v1%3ACodeInstitute%2BIFD101%2B2017_T3%2Btype%40sequential%2Bblock%40d28b5efca8d4424ab3095f65010b3181) dictated most of the strategy and scope decisions. Leading to a single page design with a few high level charts allowing the possibility to narrow the focus to more specific data. During the scoping of the project it became apparent that certain options would not fit with the data set. It was not possible to filter on some axes due to patchy and inconsistently provided data. It was beyond my resources to verify the data or clarify if a missing value meant there was a predictable default or if the information was unknown. Filtering data by frequency, migratory status or conservation status for example were not possible with any degree of confidence in the chart produced. These columns were edited out to reduce the file sizes since the information could not be used anyway. To make the amount of information more manageable and not overload the user the data set was further reduced to just the information on the Alaskan Parks.

The following user stories were developed.

* As a user I can see where the parks are via `Google maps`.

* As a user I can see the size of the parks in absolute terms via `the dc.js table` displayed as a sidebar to the map.

* As a user I can see the size of the parks in relative terms via `the park size chart` displayed immediately below the map.

* As a user I can see the species categories either as an overall proportion or as a proportion of a subset of parks via `the number of species pie chart`.

* As a user I can see the species categories displayed by park either in total or filtered to a sub set of species categories via `the number of species stacked bar chart`.

The strategic decision to implement a single page dashboard set the structure and skeleton as straightforward. Internal navigation was not required, logical grouping of map and charts was the primary concern of this phase. Since the where is a critical requirement of biodiversity the map was displayed first, obviously then the table should go with it and placing the park size chart near by produced a more user friendly experience. Since the pie chart is easier to take in by virtue of being less detailed the species category pie chart came next allowing the user to rapidly and very easily take in the high level view. The more detailed stacked bar chart came last allowed an easy comparison between the parks the user has now had a chance to localise. This chart coming at the end also allowed the user to have thought about what was interesting to them at that moment before being presented by a more complex display resulting in a better user experience.

At an early development stage both webpack and Gulp were experimented but both eventually discontinued as excessive for so simple a project.

### Features

The site consists of 4 main features.
* A map showing the location of the Alaskan National Parks.
* A pie chart showing the relative size of the parks.
* A pie chart showing the relative balance of species types by park.
* A stacked bar chart showing the proportion of species types by park

#### Existing Features

**The Map**

The map shows the whole state allowing the easy localisation of any park. Accompanying the map as a sidebar is a dc.js table listing the parks by name and map code as well as giving their size.

**The Size Pie Chart**

This chart shows at a glance the relative sizes of the Alaskan National Parks. Selecting one, or more, of the parks filters the results on the species chart. The reset button will clear all of the filters on all three charts.

**The Species Pie Chart**

This chart shows a rapidly and intuitive display of the proportions of the species types present either in the Alaskan National Parks or a selected sub-set of them. These results can be filtered by selecting a park, or group of parks, on either of the other charts. A selection on this chart will also filter the other two by species category.

**The Species Stacked Bar Chart**

This chart shows the proportion of the species categories by individual park, rather than the combined total shown by the pie chart. This chart can be filtered by species category using the species chart and can be used to filter the species category pie chart by park.


#### Features Left To Implement

There are two obvious features not implemented. Search specific species, eg Alces alces - the common moose, and display data such as frequency or species status, eg IUCN red list rating.

A species search would require a quite complex interface to avoid a high chance of returning the wrong date or no data as there are a number of common names that could refer to more than one species and scientific names are not as widely known and so more prone to being misspelt.

The use of data such as frequency and IUCN red list would require a more complete data set, or at least some indication of what interpretation should be given to an absent value in the original CSV file.

### Technologies Used

#### HTML5, CSS3 and JavaScript

These languages provided the backbone of the site and enabled the integration of components from the libraries used.

#### [Bootstrap](https://getbootstrap.com/docs/3.3/)

Bootstrap was used to create the framework for the dashboard.

#### [D3.js](https://d3js.org/)

A dependency of Dimensional Charting, providing much of the graphics capability.

#### [Crossfilter](https://github.com/square/crossfilter)

A dependency of Dimensional Charting, allowing rapid sorting and searching of large datasets.

#### [DC.js](https://github.com/dc-js/dc.js/wiki)

Dimensional Charting allows the rapid creation of interactive SVG charts and tables.

#### [Queue.js](https://github.com/d3/d3-queue)

Used to defer the creation of DC charts to ensure the loading of data before attempting to manipulate the data.

### Testing

The site was tested on both Windows and Mac laptops with several browsers, for full test schedule and results see the attached [test table](). As per [the guidelines](https://courses.codeinstitute.net/courses/course-v1:CodeInstitute+IFD101+2017_T3/courseware/e4482ae18d3142f7ba989b247b2e5ba9/d28b5efca8d4424ab3095f65010b3181/?activate_block_id=block-v1%3ACodeInstitute%2BIFD101%2B2017_T3%2Btype%40sequential%2Bblock%40d28b5efca8d4424ab3095f65010b3181) testing for responsive design was limited as dc.js is not designed to be responsive.

### Deployment

### Credits

#### Content

The data for this project came from [Kaggle](https://www.kaggle.com/nationalparkservice/park-biodiversity#species.csv). The original CSV files were patchily filled so I was unable to implement filtering on those axes, these unusable entries were removed. The files were further reduced to only the data for Alaska to prevent user overload. Since I was editing the files anyway I also changed the format to JSON.

#### Media

On a project dedicated to visual display of data further graphics would be distracting and since there is no imperative, such as branding, further functions with their own icons etc, have not been used.

#### Google Maps

The JavaScript in map.js is largely taken from the examples in the Google Maps API [documentation](https://developers.google.com/maps/documentation/javascript/adding-a-google-map).

#### Acknowledgements

The reset function is a modification of the reset code used on some of the [DC examples](https://dc-js.github.io/dc.js/examples/).
