export * from './utils/util.js';
export * from './utils/params.js';
export { fakeOffers } from './data.js';
export { setAddress } from './features/form.js';
export { resetMap } from './features/map.js';
export { createOfferCard } from './components/offer-card.js';

import { activateForm } from './features/form.js';
import { loadMap } from './features/map.js';

setTimeout(() => loadMap(), 1000);
activateForm();
