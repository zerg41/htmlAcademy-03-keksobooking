/** ОТРИСОВКА КАРТЫ **/
/*global L*/
import { createOfferCard } from './offer-card.js';
import { fakeOffers } from './data.js';
import { deactivateForm, setAddress } from './form.js';
// import { setAddress } from './form.js';

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
let map = L.map(mapCanvas, {
  center: DEFAULT_LOCATION,
  zoom: DEFAULT_MAP_ZOOM,
});

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
  return setTimeout(activateMapFilters, 1000);
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
  deactivateMapFilters();
  deactivateForm();
  map.on('load', (ev) => console.log(ev));
  mapTileLayer.addTo(map);
  userMarker.addTo(map);
  userMarker.on('move', ({ latlng }) => setAddress(latlng));
  renderOfferMarkers(fakeOffers);
}

export { loadMap, resetMap, deactivateMapFilters };
