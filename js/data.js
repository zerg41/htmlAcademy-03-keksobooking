/** ГЕНЕРАЦИЯ ДАННЫХ **/

import { getRandomFloat, getRandomInt } from './main.js';

/* ПАРАМЕТРЫ ГЕНЕРАТОРОВ */
/* eslint-disable comma-dangle */
const FAKE_OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const FAKE_OFFER_HOURS = ['12:00', '13:00', '14:00'];
const FAKE_OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const FAKE_OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
const FAKE_OFFER_TITLES = [
  'Apart-Hotel высота +540',
  'The Palace',
  'Villas at Marina Inn at Grande Dunes',
  'Sandestin Resort Bahia by Tufan',
  'The Grand Sandestin',
  'Purple Sunset - Central Destin - 1BR Condo',
  'Mr. Soof - By TLV2GO',
  'Eilot',
  'House By The Beach',
  'ARROWHEAD AT RIVERWALK-Golf, close to beaches. LOCATION!'
];
const FAKE_OFFER_DESCRIPTIONS = [
  'Апарт-отель Grand Sandestin расположен в 2,6 км от пляжа Мирамар. К услугам гостей открытый бассейн, частный пляж и апартаменты с кондиционером.',
  'Апартаменты Purple Sunset - Central Destin - 1BR Condo с кондиционером и собственным бассейном расположены в городе Дестин. К услугам гостей бесплатная частная парковка.',
  'Апартаменты Sandestin Resort Bahia by Tufan расположены в Дестине, в 2,5 км от пляжа Мирамар и в 600 м от круизной компании SunQuest Cruises.',
  'Апартаменты 10 C One Bedroom Condo с патио, садом и открытым бассейном расположены всего в 2 км от общественного пляжа Джеймс Ли Парк в Дестине.',
  'Апартаменты 7 F Two Bedroom Loft с патио, садом и открытым бассейном расположены всего в 2,1 км от общественного пляжа Джеймс Ли Парк в городе Дестин.',
  'Апартаменты Eilot расположены в городе Эйлат, в 650 м от пляжа Кисуски и менее чем в 1 км от пляжа Мориа. К услугам гостей бесплатный Wi-Fi, сад и кондиционер. Из окон открывается вид на сад.',
  'Апартаменты House By The Beach расположены в Эйлате в Южном округе Израиля. К услугам гостей апартаменты с бесплатным Wi-Fi, пляж Невиот и бесплатная частная парковка.',
  'Апартаменты Mr. Soof - By TLV2GO с кондиционером и балконом расположены в 1,4 км от пляжа Невиот. К услугам гостей бесплатный Wi-Fi.',
  'Апарт-отель The Palace расположен в городе Миртл-Бич, в 3 км от парка штата Миртл-Бич и в 3,1 км от набережной Миртл-Бич.',
  'Апартаменты ARROWHEAD AT RIVERWALK-Golf расположены в городе Мертл-Бич, в 3,1 км от торгового центра The Market Common и в 5 км от парка штата Миртл-Бич. Расположение!',
];

const FAKE_LOCATION_X_MIN = 35.65000;
const FAKE_LOCATION_X_MAX = 35.70000;
const FAKE_LOCATION_Y_MIN = 139.70000;
const FAKE_LOCATION_Y_MAX = 139.80000;
const FAKE_LOCATION_PRECISION = 5;

/* ФУНКЦИИ-ГЕНЕРАТОРЫ */
const generateAuthor = (id) => {
  const author = {};

  if (id < 10) {
    id = '0' + id;
  }

  author.avatar = `img/avatars/user${id}.png`;

  return author
};

const generateOfferFeatures = () => {
  const features = new Set();

  FAKE_OFFER_FEATURES.map((feature) => {
    if (getRandomInt(0, 1) === 1) {
      features.add(feature);
    }
  });

  return [...features];
};

const generateOfferPhotos = () => {
  const photos = new Set();

  FAKE_OFFER_PHOTOS.map((photo) => {
    if (getRandomInt(0, 1) === 1) {
      photos.add(photo);
    }
  });

  return [...photos];
};

const generateOffer = (locationX, locationY) => {
  const offer = {};

  offer.title = FAKE_OFFER_TITLES[getRandomInt(0, FAKE_OFFER_TITLES.length - 1)];
  offer.address = `${locationX}, ${locationY}`;
  offer.price = getRandomInt(100, 40000);
  offer.type = FAKE_OFFER_TYPES[getRandomInt(0, FAKE_OFFER_TYPES.length - 1)];
  offer.rooms = getRandomInt(1, 10);
  offer.guests = getRandomInt(1, 10);
  offer.checkin = FAKE_OFFER_HOURS[getRandomInt(0, FAKE_OFFER_HOURS.length - 1)];
  offer.checkout = FAKE_OFFER_HOURS[getRandomInt(0, FAKE_OFFER_HOURS.length - 1)];
  offer.features = generateOfferFeatures();
  offer.description = FAKE_OFFER_DESCRIPTIONS[getRandomInt(0, FAKE_OFFER_DESCRIPTIONS.length - 1)];
  offer.photos = generateOfferPhotos();

  return offer;
};

const generateLocation = () => {
  const location = {};

  location.x = getRandomFloat(FAKE_LOCATION_X_MIN, FAKE_LOCATION_X_MAX, FAKE_LOCATION_PRECISION);
  location.y = getRandomFloat(FAKE_LOCATION_Y_MIN, FAKE_LOCATION_Y_MAX, FAKE_LOCATION_PRECISION);

  return location;
};

const addOffer = (offerAuthor, offerContent, offerLocation) => {
  const offer = {
    author: offerAuthor,
    offer: offerContent,
    location: offerLocation
  };

  return offer;
};

const generateOffers = (offersNumber) => {
  let offers = [];
  let offerLocation, offerAuthor, offerContent = {};
  for (let i = 1; i <= offersNumber; i++) {
    let id = i % 8 || 8;

    offerLocation = generateLocation();
    offerAuthor = generateAuthor(id);
    offerContent = generateOffer(offerLocation.x, offerLocation.y);

    offers.push(addOffer(offerAuthor, offerContent, offerLocation));
  }

  return offers;
};

const FAKE_OFFERS_NUMBER = 10;
const offers = (generateOffers(FAKE_OFFERS_NUMBER));

export { offers };
