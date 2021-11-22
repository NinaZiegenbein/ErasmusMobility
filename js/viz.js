import vl from "@vega/vega-lite-api-v5";
//selection variable for when item is clicked
const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("SendCountry", "RecCountry")
  .toggle(true);

//start of matrixchart
const matrixchart = vl
  .markRect({ tooltip: true })
  .select(selection) //changes selection in other chart
  .transform(
    vl.filter("datum.Year == Year"), //filter for year according to slider
    vl.filter("test(regexp(Gender), datum.Gender)"), //filter for gender (radio buttons)
    vl.filter('datum.Duration <= Duration'),
    vl.filter('datum.Age <= Age'))
  
  //encoding of x as Sending Country, y as Receiving Country and Color as number of participants
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
    vl.color().aggregate("count").fieldQ("Participants").title("Participants"), // diverging color scale 'blueorange',
    vl.opacity().if(selection, vl.value(1)).value(0.3), //change opacity when hovered
    vl.stroke().if(selection, vl.value("black"))
  );
// bar chart for overview of number of participants over time
const barchart = vl
  .markBar({ tooltip: true })
  .select(selection)
  .transform(vl.filter(selection), 
    vl.filter("test(regexp(Gender), datum.Gender)"), //filter for gender (radio buttons)
    vl.filter('datum.Duration <= Duration'),
    vl.filter('datum.Age <= Age')) //transforms according to selection on the left
  //encoding of y axis as Year and x axis as number of participants
  .encode(
    vl.y().fieldN("Year").title("Year"),
    vl
      .x()
      .aggregate("count")
      .fieldQ("Participants")
      .sort("ascending")
      .stack(true)
      .title("Participants")
  );

  export const stackedbar = vl
  .markBar({ tooltip: true })
  .select(selection)
  .transform(vl.filter(selection))
  .encode(
      vl.x().fieldQ('Participants')
      .aggregate("count")
        //.scale({ domain: [0, 1000] })
        .sort('ascending')
        .stack(true)
        .title('Participants'),
       vl.color().fieldN('RecCountry')
        .scale({ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
    ); 

export const viz = vl
  .hconcat(matrixchart, barchart, stackedbar) //concatenation of visualizations
  .params(
    // definition of parameters valid for both visualizations
    selection,
    vl.param("Year").value(2014).bind(vl.slider(2014, 2019, 1)),
    vl
      .param("Gender")
      .bind(
        vl
          .radio(".*", "Female", "Male", "Undefined")
          .labels("All", "Female", "Male", "Undefined")
      ),
      vl.param('Duration').value(400).bind(vl.slider(0,400,10)),
      vl.param('Age').value(40).bind(vl.slider(0, 40, 1))
  );
