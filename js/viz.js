import vl from "@vega/vega-lite-api-v5";
import * as d3 from "d3";

//selection variable for when item is clicked
const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("SendCountry", "RecCountry");

//start of matrixchart
const matrixchart = vl
  .markRect({ tooltip: true })
  .view({fill:'#4E545B'})
  .select(selection) //changes selection in other chart
  .transform(
      vl.filter("datum.Year == Year"), //filter for year according to slider
      vl.filter("test(regexp(Gender), datum.Gender)"), //filter for gender (radio buttons)
      vl.filter('datum.Duration <= Duration'),
      vl.filter('datum.Age <= Age'),
    // count for x axis
    vl.joinaggregate([{op:"count",
      field:"Participants",
      as:"x_in"
    }]).groupby(["RecCountry"]),
    // Count for y axis
    vl.joinaggregate([{op:"count",
      field:"Participants",
      as:"y_out"
    }]).groupby(["SendCountry"]),
    // count for all the edges
    vl.joinaggregate([{op:"count",
      field:"Participants",
      as:"all_edges"
    }]),
    
    vl.joinaggregate([{op:"count",
    field:"Participants",
    as:"Number"
    }]).groupby(["SendCountry","RecCountry"]),
    // Calculating (x*y)/all_edges getting the expectancy value for each country <3
    vl.calculate("(datum.x_in*datum.y_out)/datum.all_edges").as("Expectancy"),
    vl.calculate("round(datum.Expectancy - datum.Number)").as("Deviation")
  )
  //encoding of x as Sending Country, y as Receiving Country and Color as number of participants
  .encode(
    vl.opacity().if(selection, vl.value(1)).value(0.1), //change opacity when selected
    vl.stroke().if(selection, vl.value("black")),
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
    vl.color()
      .fieldQ("Deviation").scale({type: "symlog", scheme: "blueorange"}))
      //.fieldQ("Number")
         // color schemes: https://vega.github.io/vega/docs/schemes/#diverging
    ;
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
      .fieldQ("Number")
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
      ),
      vl.param('Duration').value(400).bind(vl.slider(0,400,10)),
      vl.param('Age').value(40).bind(vl.slider(0, 40, 1)),
      vl.param('Expectancy').value(true).bind(vl.menu(true, false))
  );