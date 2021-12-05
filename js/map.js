/** ОТРИСОВКА КАРТЫ **/
/*global L*/

import { renderElementAfterElementParent as render } from './main.js';
import { offers, TOKYO_CENTER_LOCATION } from './main.js';
import { setAddress } from './form.js';
import { createOfferCard } from './main.js';

const DEFAULT_MAP_ZOOM = 13;

const mapCanvas = document.querySelector('#map-canvas');

// Состояния
const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);
const pinIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);

const setInactiveState = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  for (let filter of mapFiltersForm.children) {
    filter.setAttribute('disabled', '');
  }

  adForm.classList.add('ad-form--disabled');
  for (let field of adForm.children) {
    field.setAttribute('disabled', '');
  }
};
const setActiveState = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (let filter of mapFiltersForm.children) {
    filter.removeAttribute('disabled', '');
  }

  adForm.classList.remove('ad-form--disabled');
  for (let field of adForm.children) {
    field.removeAttribute('disabled', '');
  }
};
document.addEventListener('DOMContentLoaded', () => setInactiveState());


const createMapContainer = () => {
  const mapContainer = document.createElement('div');
  mapContainer.style.height = mapCanvas.clientHeight + 'px';
  mapContainer.id = 'map';
  render(mapContainer, mapCanvas);
};

const loadMap = () => {
  createMapContainer();

  const map = L.map('map').on('load', () => setActiveState()).setView(TOKYO_CENTER_LOCATION, DEFAULT_MAP_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  L.marker(
    TOKYO_CENTER_LOCATION,
    {
      icon : mainPinIcon,
      draggable: true,
    },
  ).addTo(map).on('moveend', (evt) => setAddress(evt.target.getLatLng()));

  offers.map((offer) => {
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


export { loadMap };
