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
    vl.color().aggregate("count").fieldQ("Participants"), // diverging color scale 'blueorange',
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
    vl.x().aggregate("count").fieldQ("Participants").sort("ascending").stack(true).title("Participants")
  );

  // here is the code for x_in
  const viz3 = vl__default["default"]
  .markRect({ tooltip: true })
  .select(selection)
  .transform(
    vl__default["default"].filter("datum.Year == Year"))
  .encode(
    vl__default["default"]
      .y()
      .fieldO("RecCountry")
      .sort(vl__default["default"].field("RecCountry"))
      .title("Receiving Country"),
     
      //values for rows
      //vl__default["default"].y().fieldN("Year").title("Year"),
      vl__default["default"].x().aggregate("count").fieldQ("Participants").sort("ReceivingCountry"),
      //vl__default["default"].x_values
  );

  
  // Here is the numbers for y_out
  const viz4 = vl__default["default"]
  .markRect({ tooltip: true })
  .select(selection)
  .transform(
    vl__default["default"].filter("datum.Year == Year"))

  
  .encode(
    vl__default["default"]
      .x()
      .fieldO("SendCountry")
      .sort(vl__default["default"].field("SendingCountry"))
      .title("Sending Country")
      .axis({ orient: "top" }),
    
      
     
      //values for rows
      //vl__default["default"].y().fieldN("Year").title("Year"),
      vl__default["default"].y().aggregate("count").fieldQ("Participants").sort("ReceivingCountry")
  );
  

export const viz = vl
  .hconcat(matrixchart, barchart)//concatenation of visualizations
  .params(    // definition of parameters valid for both visualizations
    selection,
    vl.param("Year").value(2014).bind(vl.slider(2014, 2019, 1)),
    //vl.param("Gender").bind(vl.menu(['Female','Male','Undefined']))
  );
