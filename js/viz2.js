import vl from 'vega-lite-api';
export const viz2 = vl
.markBar({ tooltip: true })
  .encode(
    vl.y().fieldN('Sending Country Code')
    .scale({domain: ['DK', 'DE', 'FR', 'SW', 'NO']})
      .title('Number'),
    vl.y().fieldO('Number')
      .aggregate('count') // ordinal axis, place lower values at the bottom
      .type('quantitative')
      .title('Number'),
    vl.color().fieldN('Receiving Country')
      .scale({domain: ['DK', 'DE', 'FR', 'SW', 'NO']},{ range: ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4", "#9467bd"] }) // custom colors
      .title('Receiving')
  );