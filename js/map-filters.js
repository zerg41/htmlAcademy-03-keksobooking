/** ОБРАБОТКА ПОЛЕЙ ВВОДЫ ФИЛЬТРА **/
import { offerData, renderOffers } from './map.js';
import { uncheckOptions } from './utils.js';

/* Объявление констант */
const SELECT_TAG = 'SELECT';
const FIELDSET_TAG = 'FIELDSET';
const DEFAULT_SELECT_OPTION = 0;

/* Объявление объектов DOM */
let mapFilters = document.querySelector('form.map__filters');
let typeFilter = mapFilters.querySelector('#housing-type');

/* Обработчики событий */
function typeFilterHandler(evt) {
  let selectedValue = evt.target.value;

  filterOffers(offerData, 'type', selectedValue);
}

/* Функции */
function filterOffers(records, filterOption, filterValue) {
  let filteredOffers;

  if (filterValue === 'any') {
    filteredOffers = records;
  } else {
    filteredOffers = records.filter(
      (record) => record.offer[filterOption] === filterValue
    );
  }

  try {
    renderOffers(filteredOffers);
  } catch (error) {
    throw new Error(`Ошибка в фильтрации объявлений: ${error}`);
  }
}

function activateMapFilters() {
  mapFilters.classList.remove('map__filters--disabled');

  for (let filter of mapFilters.children) {
    filter.removeAttribute('disabled', '');
  }

  typeFilter.addEventListener('change', typeFilterHandler);
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
