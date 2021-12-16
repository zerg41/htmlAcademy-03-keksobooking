/** ОТРИСОВКА КАРТЫ **/
/*global L*/

import { TOKYO_CENTER_LOCATION as DEFAULT_LOCATION, DEFAULT_MAP_ZOOM,
  fakeOffers, setAddress, createOfferCard, form, mapFilters} from '../main.js';

const mapCanvas = document.querySelector('#map-canvas');
const map = L.map(mapCanvas);
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPin = L.marker(
  DEFAULT_LOCATION,
  {
    icon : mainPinIcon,
    draggable: true,
  },
);
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/* Настройщики страницы */
const setInactiveState = () => {
  mapFilters.classList.add('map__filters--disabled');
  for (let filter of mapFilters.children) {
    filter.setAttribute('disabled', '');
  }

  form.classList.add('ad-form--disabled');
  for (let field of form.children) {
    field.setAttribute('disabled', '');
  }
};

const setActiveState = () => {
  mapFilters.classList.remove('map__filters--disabled');
  for (let filter of mapFilters.children) {
    filter.removeAttribute('disabled', '');
  }

  form.classList.remove('ad-form--disabled');
  for (let field of form.children) {
    field.removeAttribute('disabled', '');
  }
};
// деактивируем поля форм до загрузки карты
document.addEventListener('DOMContentLoaded', () => setInactiveState(), {once: true});

const markerMoveHandler = (evt) => {
  setAddress(evt.target.getLatLng());
};

const loadMap = () => {
  map
    .on('load', () => {
      setActiveState();
      setAddress(DEFAULT_LOCATION)
    })
    .setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPin.addTo(map).on('moveend', (evt) => markerMoveHandler(evt));

  fakeOffers.map((offer) => {
    L.marker(
      {
        lat: offer.location.x,
        lng: offer.location.y,
      },
      {
        icon: pinIcon,
      },
    ).addTo(map).bindPopup(createOfferCard(offer));
  });
};

const resetMap = () => {
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  mainPin.setLatLng(DEFAULT_LOCATION);
  setAddress(DEFAULT_LOCATION);
};

export { loadMap, resetMap };
