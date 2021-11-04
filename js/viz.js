//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";
export const viz = vl
.markRect({ tooltip: true })
    .params(
      // interactive parameter for the current year, bind to an internal slider
      vl.param('Year').value(2014).bind(vl.slider(2014, 2016,1))
    ) 
      .transform(
       vl.filter('datum.Year == Year') //here error does not recognize year
     ) 
    .encode(
      vl.x().fieldO('Sending Country Code').sort(vl.field('Sending Country')).title(null).axis({ orient: 'top' }),
      vl.y().fieldO('Receiving Country Code').sort(vl.field('Receiving Country')).title(null),
      vl.color().fieldQ('Number').title('Number'))// diverging color scale 'blueorange'

 ;