import vega from "vega";
import vegaLite from "vega-lite";
import vl from "@vega/vega-lite-api-v5";
import { Handler } from "vega-tooltip";
import { config } from "./config";
import { getData } from "./getData";
import { viz } from "./viz";
import { viz2 } from "./viz2";

//register vega and vegalite and tooltip 
vl.register(vega, vegaLite, {
  view: { renderer: "svg" },
  init: (view) => {
    view.tooltip(new Handler().call);
  },
});

//get data and rendering
export const run = async function (state) {
  const marks = viz
    .data(await getData())
    .autosize({ type: "fit", contains: "padding" })
    .config(config);

  const marks2 = viz2
    .data(await getData())
    .autosize({ type: "fit", contains: "padding" })
    .config(config);
  if (state == 1){
      document.getElementById("matrix-viz1").appendChild(await marks.render())}
  else if (state == 2){
      document.getElementById("matrix-viz2").appendChild(await marks2.render())
      };
};
run(2);
