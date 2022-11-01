/*global L*/
/** ОТРИСОВКА КАРТЫ **/
import { createOfferCard } from './offer-card.js';
import { fakeOffers } from './data.js';
import { activateForm, setAddress } from './form.js';

/* Объявление констант */
const DEFAULT_MAP_ZOOM = 13;
const DEFAULT_LOCATION = Object.freeze({
  lat: 35.6895,
  lng: 139.69171,
});

/* Объявление объектов DOM */
let mapCanvas = document.querySelector('#map-canvas');
let mapFilters = document.querySelector('.map__filters');

/* Объявление переменных */
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
  renderOfferMarkers(fakeOffers);

  setAddress(DEFAULT_LOCATION);
  activateMapFilters();
  activateForm();
}

function userMarkerMoveHandler({ latlng }) {
  setAddress(latlng);
}

/* Функции */
function renderOfferMarkers(offers = []) {
  return offers.map((offer) => {
    L.marker(
      {
        lat: offer.location.x,
        lng: offer.location.y,
      },
      {
        icon: offerMarkerIcon,
      }
    )
      .addTo(map)
      .bindPopup(createOfferCard(offer));
  });
}

function deactivateMapFilters() {
  mapFilters.classList.add('map__filters--disabled');
  for (let filter of mapFilters.children) {
    filter.setAttribute('disabled', '');
  }
}

function activateMapFilters() {
  mapFilters.classList.remove('map__filters--disabled');
  for (let filter of mapFilters.children) {
    filter.removeAttribute('disabled', '');
  }
}

function resetMap() {
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.setLatLng(DEFAULT_LOCATION);
}

function loadMap() {
  map.on('load', mapLoadHandler);
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.on('move', userMarkerMoveHandler);
}

export { loadMap, resetMap, deactivateMapFilters };
