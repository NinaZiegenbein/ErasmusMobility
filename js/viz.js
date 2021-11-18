//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";

const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("SendCountry", "RecCountry");

const matrixchart = vl
  .markRect({ tooltip: true })
  .select(selection)
  .transform(vl.filter("datum.Year == Year"),
  //vl.filter("datum.Gender == Gender")
  )
  //vl.calculate(vl.count()).as('Number')) TODO filter by relation 
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
    //vl.color().fieldQ("Number").title("Number"), // diverging color scale 'blueorange',
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
    vl.param("Year").value(2014).bind(vl.slider(2014, 2019, 1)),
    //vl.param("Gender").bind(vl.menu(['Female','Male','Undefined']))
  );
