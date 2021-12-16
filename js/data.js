/** ГЕНЕРАЦИЯ ВРЕМЕННЫХ ДАННЫХ **/

import {
  OFFER_TYPES, OFFER_TITLES, OFFER_HOURS, OFFER_FEATURES, OFFER_PHOTOS, OFFER_DESCRIPTIONS,
  MIN_PRICE, MAX_PRICE, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS,
  LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_PRECISION,
  AVATARS_NUMBER, FAKE_OFFERS_NUMBER, getRandomFloat, getRandomInt, extractRandomItemsFromArray
} from './main.js';

const generateOfferAuthor = (id) => {
  const author = {
    avatar : `img/avatars/user${id < 10 ? '0' + id : id}.png`,
  };

  return author
};

const generateOfferContent = (locationX, locationY) => {
  const offer = {
    title : OFFER_TITLES[getRandomInt(0, OFFER_TITLES.length - 1)],
    address : `${locationX}, ${locationY}`,
    price : getRandomInt(MIN_PRICE, MAX_PRICE),
    type : OFFER_TYPES[getRandomInt(0, OFFER_TYPES.length - 1)],
    rooms : getRandomInt(MIN_ROOMS, MAX_ROOMS),
    guests : getRandomInt(MIN_GUESTS, MAX_GUESTS),
    checkin : OFFER_HOURS[getRandomInt(0, OFFER_HOURS.length - 1)],
    checkout : OFFER_HOURS[getRandomInt(0, OFFER_HOURS.length - 1)],
    features : extractRandomItemsFromArray(OFFER_FEATURES),
    description : OFFER_DESCRIPTIONS[getRandomInt(0, OFFER_DESCRIPTIONS.length - 1)],
    photos : extractRandomItemsFromArray(OFFER_PHOTOS),
  };

  return offer;
};

const generateOfferLocation = () => {
  const location = {
    x : getRandomFloat(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_PRECISION),
    y : getRandomFloat(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_PRECISION),
  };

  return location;
};

const createOffer = (offerAuthor, offerContent, offerLocation) => {
  const offer = {
    author: offerAuthor,
    offer: offerContent,
    location: offerLocation,
  };

  return offer;
};

const generateOffers = (offersNumber) => {
  let offers = [];
  let offerLocation, offerAuthor, offerContent = {};
  for (let i = 1; i <= offersNumber; i++) {
    let id = i % AVATARS_NUMBER || AVATARS_NUMBER;

    offerLocation = generateOfferLocation();
    offerAuthor = generateOfferAuthor(id);
    offerContent = generateOfferContent(offerLocation.x, offerLocation.y);

    offers.push(createOffer(offerAuthor, offerContent, offerLocation));
  }

  return offers;
};

export const fakeOffers = generateOffers(FAKE_OFFERS_NUMBER);
