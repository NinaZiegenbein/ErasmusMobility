import vl from "@vega/vega-lite-api-v5";
import * as d3 from "d3";

//selection variable for when item is clicked
/* const selection = vl
  .selectPoint()
  .on("click")
  .name("selection")
  .fields("SendCountry", "RecCountry")
  .toggle(true);

 */
  export const stackedbar = vl
  .markBar({ tooltip: true })
  .params(vl.param("RecCountry").bind(vl.menu('.*', 'BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'IS', 'UK', 'AL', 'BY', 'EL', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'NO', 'MK', 'BA', 'MD', 'LT', 'LU', 'HU', 'MT', 'NL','PL', 'AT', 'PL', 'LI', 'RS', 'XK', 'UA', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE', 'CH', 'TR', 'ME', 'RU')
  .labels('All', 'BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'IS', 'UK', 'AL', 'BY', 'EL', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'NO', 'MK', 'BA', 'MD', 'LT', 'LU', 'HU', 'MT', 'NL','PL', 'AT', 'PL', 'LI', 'RS', 'XK', 'UA', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE', 'CH', 'TR', 'ME', 'RU')))
  .transform(
  vl.filter("datum.RecCountry == RecCountry"))
  .encode(
    vl.y().fieldN('Year'),
      vl.x().fieldQ('Participants')
      .aggregate("count")
        //.scale({ domain: [0, 1000] })
        //.sort('descending')
        .stack(true)
        .title('Participants'),
       vl.color().fieldN('SendCountry')
        //.scale({ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
    ); 

export const viz3 = stackedbar; 
