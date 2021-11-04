(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);

  // Appearance customization to improve readability.
  // See https://vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickColor: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 10,
        fill: dark
      },
      "guide-title": {
        fontSize: 15,
        fill: dark
      }
    }
  };

  //const csvUrl = 'https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/194c2fc143790b937c42bf086a5a44cb3c55340e/auto-mpg.csv';
  const csvUrl = '/test.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);
    
    // Have a look at the attributes available in the console!
    console.log(data[10]);

    return data;
  };

  //import vl from 'vega-lite-api';
  const viz = vl__default["default"]
  .markRect({ tooltip: true })
      .params(
        // interactive parameter for the current year, bind to an internal slider
        vl__default["default"].param('Year').value(2014).bind(vl__default["default"].slider(2014, 2016,1))
      ) 
        .transform(
         vl__default["default"].filter('datum.Year == Year') //here error does not recognize year
       ) 
      .encode(
        vl__default["default"].x().fieldO('Sending Country Code').sort(vl__default["default"].field('Sending Country')).title(null).axis({ orient: 'top' }),
        vl__default["default"].y().fieldO('Receiving Country Code').sort(vl__default["default"].field('Receiving Country')).title(null),
        vl__default["default"].color().fieldQ('Number').title('Number'))// diverging color scale 'blueorange'

   ;

  //import { descending } from 'd3-array';

  const viz2 = vl__default["default"].markBar({ tooltip: true })
  //try for time slider 
     .params(
      // interactive parameter for the current year, bind to an internal slider
      vl__default["default"].param('Academic Year').value(2014).name('Academic Year').bind(vl__default["default"].slider(2014, 2016, 1)), //slider does not show -> Why???
    )   
    //    .transform(
    //    vl.filter('datum.Year == Year') //here error does not recognize year
    //  )  
    .encode(
      vl__default["default"].y().fieldN('Sending Country Code')
        .title('Sending Country Code'),
      vl__default["default"].x().fieldQ('Number')
        //.scale({ domain: [0, 1000] })
        .sort('ascending')
        .stack(true)
        .title('Number'),
       vl__default["default"].color().fieldN('Receiving Country Code')
        .scale({ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
        .title('Receiving') 
    );

  vl__default["default"].register(vega__default["default"], vegaLite__default["default"], {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth/2)
      .height(window.innerHeight/2)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);

      const marks2 = viz2
      .data(await getData())
      .width(400)
      .height(300)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);
    
    document.getElementById('matrix-viz').appendChild(await marks.render());
    document.getElementById('stacked-bar').appendChild(await marks2.render());
    
  };
  run();

})(vega, vegaLite, vl, vegaTooltip, d3);
//# sourceMappingURL=bundle.js.map
