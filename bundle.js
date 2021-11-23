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

  const selection = vl
    .selectPoint()
    .on("click")
    .name("selection")
    .fields("SendCountry", "RecCountry");

  const matrixchart = vl
    .markRect({ tooltip: true })
    .select(selection)
    .transform(
      vl.filter("datum.Year == Year"),
      //vl.groupby('Participant',"SendCountry","RecCountry")
    //vl.groupby(['SendCountry', 'RecCountry']).aggregate("Participant")
    //vl.filter("datum.Gender == Gender")
    )

    // Here is the code for the pop up box with info when you hover over an matrix element
    .encode(
      vl
        .x()
        .fieldO("SendCountry")
        .sort(vl.field("SendCountry"))
        .title("Sending Country")
        .axis({ orient: "top" }),
      vl
        .y()
        .fieldO("RecCountry")
        .sort(vl.field("RecCountry"))
        .title("Receiving Country"),
        
       

      vl.color().aggregate("count").fieldQ("Participants"), // diverging color scale 'blueorange',
      //vl.color().aggregate("count").fieldO("sendcountry"),
      
      //vl.y().fieldN("Year").title("Year"),
      // Here is the place to set in the expectation value
      vl.opacity().if(selection, vl.value(1)).value(0.3), //change opacity when hovered
      vl.stroke().if(selection, vl.value("black")),
      

      //print("hei")

    );
// Code for total of edges 
  const viz2 = vl
    .markBar({ tooltip: true })
    .select(selection)
    .transform(vl.filter(selection))
    .encode(
      vl.y().fieldN("Year").title("Year"),
      vl.x().aggregate("count").fieldQ("Participants").sort("ascending").stack(true).title("Participants")
    );
    
    // here is the code for x_in
    const viz3 = vl
    .markRect({ tooltip: true })
    .select(selection)
    .transform(
      vl.filter("datum.Year == Year"))
    .encode(
      vl
        .y()
        .fieldO("RecCountry")
        .sort(vl.field("RecCountry"))
        .title("Receiving Country"),
       
        //values for rows
        //vl.y().fieldN("Year").title("Year"),
        vl.x().aggregate("count").fieldQ("Participants").sort("ReceivingCountry"),
        //vl.x_values
    );

    
    // Here is the numbers for y_out
    const viz4 = vl
    .markRect({ tooltip: true })
    .select(selection)
    .transform(
      vl.filter("datum.Year == Year"))

    
    .encode(
      vl
        .x()
        .fieldO("SendCountry")
        .sort(vl.field("SendingCountry"))
        .title("Sending Country")
        .axis({ orient: "top" }),
      
        
       
        //values for rows
        //vl.y().fieldN("Year").title("Year"),
        vl.y().aggregate("count").fieldQ("Participants").sort("ReceivingCountry")
    );
    

  const viz = vl
    .hconcat(matrixchart, viz2, viz3, viz4)
    //.width(window.innerWidth/2)
    //.height(window.innerWidth/2)
    .params(
      selection,
      vl.param("Year").value(2014).bind(vl.slider(2014, 2019, 1)),
      //vl.param("Gender").bind(vl.menu(['Female','Male','Undefined']))
    );

  vl.register(vega__default["default"], vegaLite__default["default"], {
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
