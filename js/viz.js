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
  .transform(
    vl.filter("datum.Year == Year"),
    //vl.groupby('Participant',"SendCountry","RecCountry")
  //vl.groupby(['SendCountry', 'RecCountry']).aggregate("Participant")
  //vl.filter("datum.Gender == Gender")
  )
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

const viz2 = vl
  .markBar({ tooltip: true })
  .select(selection)
  .transform(vl.filter(selection))
  .encode(
    vl.y().fieldN("Year").title("Year"),
    vl.x().aggregate("count").fieldQ("Participants").sort("ascending").stack(true).title("Participants")
  );

export const viz = vl
  .hconcat(matrixchart, viz2)
  //.width(window.innerWidth/2)
  //.height(window.innerWidth/2)
  .params(
    selection,
    vl.param("Year").value(2014).bind(vl.slider(2014, 2019, 1)),
    //vl.param("Gender").bind(vl.menu(['Female','Male','Undefined']))
  );
