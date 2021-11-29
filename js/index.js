import vega from "vega";
import vegaLite from "vega-lite";
import vl from "@vega/vega-lite-api-v5";
import { Handler } from "vega-tooltip";
import { config } from "./config";
import { getData } from "./getData";
import { viz } from "./viz";
import { viz3 } from "./viz3";
//register vega and vegalite and tooltip 
vl.register(vega, vegaLite, {
  view: { renderer: "svg" },
  init: (view) => {
    view.tooltip(new Handler().call);
  },
});

//get data and rendering
const run = async () => {
  const marks = viz
    .data(await getData())
    .autosize({ type: "fit", contains: "padding" })
    .config(config);

    const marks2 = viz3
    .data(await getData())
    .autosize({ type: "fit", contains: "padding" })
    .config(config);

  document.getElementById("matrix-viz").appendChild(await marks.render());
  document.getElementById("stacked-bar").appendChild(await marks2.render());
};
run();
