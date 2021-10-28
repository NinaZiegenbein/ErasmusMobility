import vega from 'vega';
import vegaLite from 'vega-lite';
import vl from 'vega-lite-api';
import { Handler } from 'vega-tooltip';
import { config } from './config';
import { getData } from './getData';
import { viz } from './viz';
import { viz2 } from './viz2';

vl.register(vega, vegaLite, {
  view: { renderer: 'svg' },
  init: view => { view.tooltip(new Handler().call); }
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
    .width(window.innerWidth/2)
    .height(window.innerHeight/2)
    .autosize({ type: 'fit', contains: 'padding' })
    .config(config);
  
  document.getElementById('matrix-viz').appendChild(await marks.render());
  document.getElementById('stacked-bar').appendChild(await marks2.render());
  
};
run();