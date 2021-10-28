import vl from 'vega-lite-api';
export const viz = vl
.markRect({ tooltip: true }).encode(
    vl.x().fieldO('Sending Country').sort(vl.field('Sending Country Code')).title(null).axis({ orient: 'top' }),
    vl.y().fieldO('Receiving Country').sort(vl.field('Receiving Country Code')).title(null),
    vl.color().fieldQ('Number').title('Number'))
  .encode(
    vl.x().fieldO('Sending Country Code').sort(vl.field('Receiving Country Code')),
    vl.y().fieldO('Receiving Country Code').sort(vl.field('Receiving Country Code'))
  );