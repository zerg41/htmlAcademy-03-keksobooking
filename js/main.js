export { getRandomFloat, getRandomInt } from './util.js';
import { showElement } from './util.js';
import { offers } from './data.js';
import { renderOfferCard } from './offerCard.js';

const map = document.querySelector('#map-canvas');
const testOfferCard = renderOfferCard(offers[0]);

showElement(testOfferCard, map);
