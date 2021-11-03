//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";
export const viz = vl
.markRect({ tooltip: true }).encode(
    vl.x().fieldO('Sending Country').sort(vl.field('Sending Country Code')).title(null).axis({ orient: 'top' }),
    vl.y().fieldO('Receiving Country').sort(vl.field('Receiving Country Code')).title(null),
    vl.color().fieldQ('Number').title('Number'))
   //.params(
/*       // interactive parameter for the current year, bind to an internal slider
      vl.param('Year').value(2014).bind(vl.slider(2014, 2015, 1))
      
    )   */
/*     .transform(
      vl.filter('datum.year === "${Year}"') //here error does not recognize year
    ) */
  .encode(
    vl.x().fieldO('Sending Country Code').sort(vl.field('Receiving Country Code')),
    vl.y().fieldO('Receiving Country Code').sort(vl.field('Receiving Country Code'))
  )
 ;