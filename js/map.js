/** ОТРИСОВКА КАРТЫ **/

import { activateForm, setAddress } from './form.js';
import { createOfferCard } from './offer-card.js';
import { uncheckOptions } from './utils.js';
// import { fakeOffers } from './data.js';

/* Объявление констант */
const SELECT_TAG = 'SELECT';
const FIELDSET_TAG = 'FIELDSET';
const DEFAULT_SELECT_OPTION = 0;
const DEFAULT_MAP_ZOOM = 13;
const DEFAULT_LOCATION = Object.freeze({
  lat: 35.6895,
  lng: 139.69171,
});

/* Объявление объектов DOM */
let mapCanvas = document.querySelector('#map-canvas');
let mapFiltersForm = document.querySelector('.map__filters');

/* Объявление переменных */
/* global L */
let map = L.map(mapCanvas);

let mapTileLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

let userMarkerIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

let offerMarkerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let userMarker = L.marker(DEFAULT_LOCATION, {
  icon: userMarkerIcon,
  draggable: true,
});

/* Обработчики событий */
function mapLoadHandler() {
  mapTileLayer.addTo(map);
  userMarker.addTo(map);

  setAddress(DEFAULT_LOCATION);
  activateMapFilters();
  activateForm();
}

function userMarkerMoveHandler({ latlng }) {
  setAddress(latlng);
}

/* Функции */
function renderOffers(offers = []) {
  return offers.map((offer) => {
    L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: offerMarkerIcon,
      }
    )
      .addTo(map)
      .bindPopup(createOfferCard(offer));
  });
}

function activateMapFilters() {
  mapFiltersForm.classList.remove('map__filters--disabled');

  for (let filter of mapFiltersForm.children) {
    filter.removeAttribute('disabled', '');
  }
}

function resetMapFilters() {
  for (let filter of mapFiltersForm.children) {
    if (filter.tagName === SELECT_TAG) {
      filter[DEFAULT_SELECT_OPTION].selected = true;
    }

    if (filter.tagName === FIELDSET_TAG) {
      uncheckOptions(filter.elements);
    }
  }
}

function loadMap() {
  map.on('load', mapLoadHandler);
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.on('move', userMarkerMoveHandler);
}

function resetMap() {
  resetMapFilters();
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.setLatLng(DEFAULT_LOCATION);
}

export { loadMap, resetMap, renderOffers };
