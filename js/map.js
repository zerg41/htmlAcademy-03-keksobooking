/** ОТРИСОВКА КАРТЫ **/
import { getData as fetchOffers } from './api.js';
import { activateMapFilters } from './map-filters.js';
import { activateForm, setAddress } from './form.js';
import { createOfferCard } from './offer-card.js';

/* Объявление констант */
const MAX_OFFERS_ON_MAP = 10;
const DEFAULT_MAP_ZOOM = 13;
const DEFAULT_LOCATION = Object.freeze({
  lat: 35.6895,
  lng: 139.69171,
});

/* Объявление объектов DOM */
let mapCanvas = document.querySelector('#map-canvas');

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

let offerMarkers = [];

let offerData;

/* Обработчики событий */
function mapLoadHandler() {
  mapTileLayer.addTo(map);
  userMarker.addTo(map);

  setAddress(DEFAULT_LOCATION);

  activateForm();
}

function userMarkerMoveHandler({ latlng }) {
  setAddress(latlng);
}

/* Функции */
function renderOffers(offers) {
  if (offerMarkers.length) {
    offerMarkers.forEach((offer) => offer.removeFrom(map));
  }

  offerMarkers = offers.slice(0, MAX_OFFERS_ON_MAP).map((offer) => {
    let offerMarker = L.marker(
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

    return offerMarker;
  });
}

function loadMap() {
  map.on('load', mapLoadHandler);
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.on('move', userMarkerMoveHandler);

  fetchOffers((data) => {
    offerData = data;

    if (offerData) {
      renderOffers(offerData);
      activateMapFilters();
    }
  });
}

function resetMap() {
  map.setView(DEFAULT_LOCATION, DEFAULT_MAP_ZOOM);
  userMarker.setLatLng(DEFAULT_LOCATION);
}

export { loadMap, resetMap, renderOffers, offerData };
