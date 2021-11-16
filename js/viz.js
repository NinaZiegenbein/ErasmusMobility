//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";

const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("Sending_Country_Code", "Receiving_Country_Code");

const matrixchart = vl
  .markRect({ tooltip: true })
  .select(selection)
  .transform(vl.filter("datum.Year == Year"))
  .encode(
    vl
      .x()
      .fieldO("Sending_Country_Code")
      .sort(vl.field("Sending_Country_Code"))
      .title("Sending Country")
      .axis({ orient: "top" }),
    vl
      .y()
      .fieldO("Receiving_Country_Code")
      .sort(vl.field("Receiving_Country_Code"))
      .title("Receiving Country"),
    vl.color().fieldQ("Number").title("Number"), // diverging color scale 'blueorange',
    vl.opacity().if(selection, vl.value(1)).value(0.3), //change opacity when hovered
    vl.stroke().if(selection, vl.value("black"))
  );

const viz2 = vl
  .markBar({ tooltip: true })
  .select(selection)
  .transform(vl.filter(selection))
  .encode(
    vl.y().fieldN("Year").title("Year"),
    vl.x().fieldQ("Number").sort("ascending").stack(true).title("Number")
  );

export const viz = vl
  .hconcat(matrixchart, viz2)
  .params(
    selection,
    vl.param("Year").value(2014).bind(vl.slider(2014, 2016, 1))
  );
