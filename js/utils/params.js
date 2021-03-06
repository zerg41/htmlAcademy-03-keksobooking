/* ПАРАМЕТРЫ ВРЕМЕННЫХ ОБЪЯВЛЕНИЙ */
export const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
export const OFFER_HOURS = [
  '12:00',
  '13:00',
  '14:00',
];
export const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
export const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
export const OFFER_TITLES = [
  'Apart-Hotel высота +540',
  'The Palace',
  'Villas at Marina Inn at Grande Dunes',
  'Sandestin Resort Bahia by Tufan',
  'The Grand Sandestin',
  'Purple Sunset - Central Destin - 1BR Condo',
  'Mr. Soof - By TLV2GO',
  'Eilot',
  'House By The Beach',
  'ARROWHEAD AT RIVERWALK-Golf, close to beaches. LOCATION!',
];
export const OFFER_DESCRIPTIONS = [
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
export const MIN_PRICE = 10000;
export const MAX_PRICE = 100000;
export const MIN_ROOMS = 1;
export const MAX_ROOMS = 10;
export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;
export const LOCATION_X_MIN = 35.65000;
export const LOCATION_X_MAX = 35.70000;
export const LOCATION_Y_MIN = 139.70000;
export const LOCATION_Y_MAX = 139.80000;
export const AVATARS_NUMBER = 8;
export const FAKE_OFFERS_NUMBER = 10;

/* ПАРАМЕТРЫ КАРТЫ */
export const mapFilters = document.querySelector('.map__filters');
export const LOCATION_PRECISION = 5;
export const DEFAULT_MAP_ZOOM = 13;
export const TOKYO_CENTER_LOCATION = Object.freeze(
  {
    lat : 35.68950,
    lng : 139.69171,
  },
);

/* ПАРАМЕТРЫ ФОРМЫ */
export const form = document.querySelector('form.ad-form');
export const MIN_PRICES = Object.freeze(
  {
    'bungalow' : 0,
    'flat' : 1000,
    'hotel' : 3000,
    'house' : 5000,
    'palace': 10000,
  },
);
export const DEFAULT_TIME = '12:00';
export const DEFAULT_TYPE = 'flat';
export const DEFAULT_ROOMS_NUMBER = '1';
