/** ОБРАБОТКА ПОЛЕЙ ВВОДЫ ФИЛЬТРА **/
import { offerData as offers, renderOffers } from './map.js';
import { debounce, uncheckOptions } from './utils.js';

/* Объявление констант */
const SELECT_TAG = 'SELECT';
const FIELDSET_TAG = 'FIELDSET';
const DEFAULT_SELECT_OPTION = 0;
const RERENDER_DELAY = 1000;

/* Объявление объектов DOM */
let mapFilters = document.querySelector('form.map__filters');
let typeFilter = mapFilters.querySelector('#housing-type');
let priceFilter = mapFilters.querySelector('#housing-price');
let roomsFilter = mapFilters.querySelector('#housing-rooms');
let guestsFilter = mapFilters.querySelector('#housing-guests');
let featuresFilter = mapFilters.querySelector('#housing-features');

let selectedType = typeFilter.value;
let selectedPrice = priceFilter.value;
let selectedRooms = roomsFilter.value;
let selectedGuests = guestsFilter.value;
let selectedFeatures = [];

/* Обработчики событий */
function typeFilterHandler(evt) {
  evt.preventDefault();

  selectedType = evt.target.value;

  filterOffers();
}

function priceFilterHandler(evt) {
  evt.preventDefault();

  selectedPrice = evt.target.value;

  filterOffers();
}

function roomsFilterHandler(evt) {
  evt.preventDefault();

  selectedRooms = evt.target.value;

  filterOffers();
}

function guestsFilterHandler(evt) {
  evt.preventDefault();

  selectedGuests = evt.target.value;

  filterOffers();
}

/* Функции */
function filterOffers() {
  try {
    console.log(offers);

    let filteredOffers = offers.slice().filter(matchOffer);

    renderOffers(filteredOffers);
  } catch (error) {
    throw new Error(`Ошибка при фильтрации объявлений: ${error}`);
  }
}

function matchType(type) {
  if (selectedType === 'any') {
    return true;
  }

  return type === selectedType;
}

function matchPrice(price) {
  switch (selectedPrice) {
    case 'middle':
      return price >= 10000 && price <= 50000;
    case 'low':
      return price < 10000;
    case 'high':
      return price > 50000;
    case 'any':
    default:
      return true;
  }
}

function matchRooms(rooms) {
  if (selectedRooms === 'any') {
    return true;
  }

  return rooms === Number(selectedRooms);
}

function matchGuests(guests) {
  if (selectedGuests === 'any') {
    return true;
  }

  if (selectedGuests === '0') {
    return guests > 2;
  }

  return guests === Number(selectedGuests);
}

function matchFeatures(features) {}

function matchOffer({ offer }) {
  return (
    matchType(offer.type) &&
    matchPrice(offer.price) &&
    matchRooms(offer.rooms) &&
    matchGuests(offer.guests)
  );
}

function activateMapFilters() {
  mapFilters.classList.remove('map__filters--disabled');

  for (let filter of mapFilters.children) {
    filter.removeAttribute('disabled', '');
  }

  // typeFilter.addEventListener('change', typeFilterHandler);

  // priceFilter.addEventListener('change', priceFilterHandler);

  // roomsFilter.addEventListener('change', roomsFilterHandler);

  // guestsFilter.addEventListener('change', guestsFilterHandler);
  typeFilter.addEventListener(
    'change',
    debounce(typeFilterHandler, RERENDER_DELAY)
  );

  priceFilter.addEventListener(
    'change',
    debounce(priceFilterHandler, RERENDER_DELAY)
  );

  roomsFilter.addEventListener(
    'change',
    debounce(roomsFilterHandler, RERENDER_DELAY)
  );

  guestsFilter.addEventListener(
    'change',
    debounce(guestsFilterHandler, RERENDER_DELAY)
  );
}

function resetMapFilters() {
  for (let filter of mapFilters.children) {
    if (filter.tagName === SELECT_TAG) {
      filter[DEFAULT_SELECT_OPTION].selected = true;
      // filter[DEFAULT_SELECT_OPTION].value = 'any';
    }

    if (filter.tagName === FIELDSET_TAG) {
      uncheckOptions(filter.elements);
    }

    filter.dispatchEvent(new Event('change'));
  }
}

export { activateMapFilters, resetMapFilters };
