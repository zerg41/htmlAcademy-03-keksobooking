import { getData as fetchOffers } from './api.js';
import { loadMap, renderOffers } from './map.js';

loadMap();
fetchOffers((offers) => renderOffers(offers));
