export * from './util.js';
import { offers } from './data.js';
import { createOfferCard } from './offerCard.js';
import { activateFormHandlers } from './form.js';
import { renderElementAfterElementParent as render } from './util.js';

const map = document.querySelector('#map-canvas');
const testOfferCard = createOfferCard(offers[0]);
render(testOfferCard, map);

activateFormHandlers();
