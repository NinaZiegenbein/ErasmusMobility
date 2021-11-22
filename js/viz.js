import vl from "@vega/vega-lite-api-v5";
//selection variable for when item is clicked
const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("SendCountry", "RecCountry");

//start of matrixchart
const matrixchart = vl
  .markRect({ tooltip: true })
  .select(selection) //changes selection in other chart
  .transform(
    vl.filter("datum.Year == Year"), //filter for year according to slider
    vl.filter("test(regexp(Gender), datum.Gender)")
  )
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
  .transform(vl.filter(selection)) //transforms according to selection on the left
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

export const viz = vl
  .hconcat(matrixchart, barchart) //concatenation of visualizations
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
      )
  );
