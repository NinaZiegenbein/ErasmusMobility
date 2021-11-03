//import { descending } from 'd3-array';
//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";

let slider = vl.slider(2009, 2019, 1);
export const viz2 = vl.markBar({ tooltip: true })
//try for time slider  
  .params(
    // interactive parameter for the current year, bind to an internal slider
    vl.param('Year').value(2014).name('Year').bind(slider) //slider does not show -> Why???
  )  
  //  .transform(
  //   vl.filter('datum.Year === Year') //here error does not recognize year
  // ) 
  .encode(
    vl.y().fieldN('Sending Country Code')
      .title('Sending Country Code'),
    vl.x().fieldQ('Number')
      //.scale({ domain: [0, 1000] })
      .sort('ascending')
      .stack(true)
      .title('Number'),
     vl.color().fieldN('Receiving Country Code')
      .scale({ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
      .title('Receiving') 
  );
