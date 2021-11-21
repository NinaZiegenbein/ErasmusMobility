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

  const getData = async () => {
    const data = await d3.csv(csvUrl);

    console.log(data[0]);
    return data;
  };

  const selection = vl__default["default"]
    .selectPoint()
    .on("click")
    .name("selection")
    .fields("SendCountry", "RecCountry");

  const matrixchart = vl__default["default"]
    .markRect({ tooltip: true })
    .select(selection)
    .transform(
      vl__default["default"].filter("datum.Year == Year"),
      //vl.groupby('Participant',"SendCountry","RecCountry")
    //vl.groupby(['SendCountry', 'RecCountry']).aggregate("Participant")
    //vl.filter("datum.Gender == Gender")
    )

    // Here is the code for the pop up box with info when you hover over an matrix element
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
       

      vl__default["default"].color().aggregate("count").fieldQ("Participants"), // diverging color scale 'blueorange',
      //vl__default["default"].color().variance.field("count").fieldQ("Participants"),

// Here is the place to set in the expectation value
      

      vl__default["default"].opacity().if(selection, vl__default["default"].value(1)).value(0.3), //change opacity when hovered
      vl__default["default"].stroke().if(selection, vl__default["default"].value("black"))
    );

  const viz2 = vl__default["default"]
    .markBar({ tooltip: true })
    .select(selection)
    .transform(vl__default["default"].filter(selection))
    .encode(
      vl__default["default"].y().fieldN("Year").title("Year"),
      vl__default["default"].x().aggregate("count").fieldQ("Participants").sort("ascending").stack(true).title("Participants")
    );

    

  const viz = vl__default["default"]
    .hconcat(matrixchart, viz2)
    //.width(window.innerWidth/2)
    //.height(window.innerWidth/2)
    .params(
      selection,
      vl__default["default"].param("Year").value(2014).bind(vl__default["default"].slider(2014, 2019, 1)),
      //vl.param("Gender").bind(vl.menu(['Female','Male','Undefined']))
    );

  vl__default["default"].register(vega__default["default"], vegaLite__default["default"], {
    view: { renderer: "svg" },
    init: (view) => {
      view.tooltip(new vegaTooltip.Handler().call);
    },
  });

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
