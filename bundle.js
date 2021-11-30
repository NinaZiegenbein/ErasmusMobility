(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 10,
        fill: dark
      },
      "guide-title": {
        fontSize: 15,
        fill: dark
      }
      
    }
  };

  const csvUrl = "/erasmus14-19.csv";

  // get the data from local file storage with d3
  const getData = async () => {
    const data = await d3.csv(csvUrl);

    console.log(data[0]);
    return data;
  };

  //selection variable for when item is clicked
  const selection = vl__default["default"]
    .selectPoint()
    .on("click")
    .name("selection")
    .fields("SendCountry", "RecCountry");

  //start of matrixchart
  const matrixchart = vl__default["default"]
    .markRect()
    .view({fill:'#4E545B'})
    .select(selection) //changes selection in other chart
    .transform(
        vl__default["default"].filter("datum.Year == Year"), //filter for year according to slider
        vl__default["default"].filter("test(regexp(Gender), datum.Gender)"), //filter for gender (radio buttons)
        vl__default["default"].filter('datum.Duration <= Duration'),
        vl__default["default"].filter('datum.Age <= Age'),
      // count for x axis
      vl__default["default"].joinaggregate([{op:"count",
        field:"Participants",
        as:"x_in"
      }]).groupby(["RecCountry"]),
      // Count for y axis
      vl__default["default"].joinaggregate([{op:"count",
        field:"Participants",
        as:"y_out"
      }]).groupby(["SendCountry"]),
      // count for all the edges
      vl__default["default"].joinaggregate([{op:"count",
        field:"Participants",
        as:"all_edges"
      }]),
      
      vl__default["default"].joinaggregate([{op:"count",
      field:"Participants",
      as:"Number"
      }]).groupby(["SendCountry","RecCountry"]),
      // Calculating (x*y)/all_edges getting the expectancy value for each country <3
      vl__default["default"].calculate("round((datum.x_in*datum.y_out)/datum.all_edges)").as("Expectancy"),
      vl__default["default"].calculate("round(datum.Expectancy - datum.Number)").as("Deviation")
    )
    //encoding of x as Sending Country, y as Receiving Country and Color as number of participants
    .encode(
      vl__default["default"]
        .x()
        .fieldO("SendCountry")
        .sort(vl__default["default"].field("SendCountry"))
        .title("Sending Country")
        .axis({ orient: "top" }),
      vl__default["default"]
        .y()
        .fieldO("RecCountry")
        .sort(vl__default["default"].field("RecCountry"))
        .title("Receiving Country"),
      vl__default["default"].color()
          .fieldQ("Deviation")
          .scale({type: "symlog", scheme: "blueorange"}) // color schemes: https://vega.github.io/vega/docs/schemes/#diverging
          //.condition({test: "Expectancy", title:"Expectancy Value"}) //condition if doesn't work, else does
          .title("Deviation from Expected"),
      vl__default["default"].opacity().if(selection, vl__default["default"].value(1)).value(0.3), //change opacity when hovered
      vl__default["default"].stroke().if(selection, vl__default["default"].value("black")),
      vl__default["default"].tooltip([
        {field:"SendCountry", type:"nominal", title:"Sending Country"},
        {field:"RecCountry", type:"nominal", title:"Reciving  Country"},
        {field:"Number", type:"quantitative", title: "Participants"},
        {field:"Expectancy", type:"quantitative", title:" Expectancy value"},
        {field:"Deviation", type:"quantitative", title: "Deviation from expectation"}
        
      ])
    );

  // bar chart for overview of number of participants over time
  const barchart = vl__default["default"]
    .markBar({ tooltip: true })
    .select(selection)
    .transform(vl__default["default"].filter(selection),
      vl__default["default"].filter("test(regexp(Gender), datum.Gender)"), //filter for gender (radio buttons)
      vl__default["default"].filter('datum.Duration <= Duration'),
      vl__default["default"].filter('datum.Age <= Age')) //transforms according to selection on the left
    //encoding of y axis as Year and x axis as number of participants
    .encode(
      vl__default["default"].y().fieldN("Year").title("Year"),
      vl__default["default"]
        .x()
        .aggregate("count")
        .fieldQ("Participants")
        .sort("ascending")
        .stack(true)
        .title("Participants")
    );

  const viz = vl__default["default"]
    .hconcat(matrixchart, barchart) //concatenation of visualizations
    .params(
      // definition of parameters valid for both visualizations
      selection,
      vl__default["default"].param("Year").value(2014).bind(vl__default["default"].slider(2014, 2019, 1)),
      vl__default["default"]
        .param("Gender")
        .bind(
          vl__default["default"]
            .radio(".*", "Female", "Male", "Undefined")
            .labels("All", "Female", "Male", "Undefined")
        ),
        vl__default["default"].param('Duration').value(400).bind(vl__default["default"].slider(0,400,10)),
        vl__default["default"].param('Age').value(40).bind(vl__default["default"].slider(0, 40, 1)),
        vl__default["default"].param('Expectancy').value(false).bind(vl__default["default"].menu(true, false))

    );

  /*viewof durationRange = rangeSlider({
    min: d3.min(d => d.Duration),
    max: d3.max(d => d.Duration),
    value: this ? this.value : [0,400],
    title: "Duration"
  })*/

  //register vega and vegalite and tooltip 
  vl__default["default"].register(vega__default["default"], vegaLite__default["default"], {
    view: { renderer: "svg" },
    init: (view) => {
      view.tooltip(new vegaTooltip.Handler().call);
    },
  });

  //get data and rendering
  const run = async () => {
    const marks = viz
      .data(await getData())
      .autosize({ type: "fit", contains: "padding" })
      .config(config);

    document.getElementById("matrix-viz").appendChild(await marks.render());
  };
  run();

})(vega, vegaLite, vl, vegaTooltip, d3);
//# sourceMappingURL=bundle.js.map
