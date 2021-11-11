//import vl from 'vega-lite-api';
import vl from "@vega/vega-lite-api-v5";
const selection =  vl.selectPoint().on("click");

const matrixchart = vl
.markRect({ tooltip: true })
    .params(
      // interactive parameter for the current year, bind to an internal slider
      vl.param('Year').value(2014).bind(vl.slider(2014, 2016,1)),
      selection
      //add other filters same as year but as a menu
    ) 
    .transform(
       vl.filter('datum.Year == Year'), //here error does not recognize year
     ) 
    .encode(
      vl.x().fieldO('Sending_Country_Code').sort(vl.field('Sending Country')).title(null).axis({ orient: 'top' }),
      vl.y().fieldO('Receiving_Country_Code').sort(vl.field('Receiving Country')).title(null),
      vl.color().fieldQ('Number').title('Number'),    // diverging color scale 'blueorange',
      vl.opacity().if(selection, vl.value(1)).value(0.3),  //change opacity when hovered 
      vl.stroke().if(selection, vl.value('black')).value('none')   
);


 export const viz = matrixchart;