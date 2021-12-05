export * from './util.js';
export { offers, TOKYO_CENTER_LOCATION, LOCATION_PRECISION } from './data.js';
export { createOfferCard } from './offerCard.js';
import { activateFormHandlers } from './form.js';
import { loadMap } from './map.js';

setTimeout(() => loadMap(), 1000);
activateFormHandlers();
