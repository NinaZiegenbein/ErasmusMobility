//import { descending } from 'd3-array';
//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";

export const viz2 = vl.markBar({ tooltip: true })
//try for time slider 
   //.params(
    // interactive parameter for the current year, bind to an internal slider
    //vl.param('Year').value(2014).name('Year').bind(vl.slider(2014, 2016, 1)), //slider does not show -> Why???
  //)   
      .transform(
      //vl.filter('datum.Year == Year'), //here error does not recognize year
      vl.filter('datum.Sending_Country_Code == "DE"'),
      vl.filter('datum.Receiving_Country_Code == "DK"')
    )  
  .encode(
    vl.y().fieldN('Year')
      .title('Year'),
    vl.x().fieldQ('Number')
      //.scale({ domain: [0, 1000] })
      .sort('ascending')
      .stack(true)
      .title('Number'),
     /*vl.color().fieldN('Receiving Country Code')
      .scale({ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
      .title('Receiving') */
  );