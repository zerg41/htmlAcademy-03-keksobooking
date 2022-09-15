/** ОБРАБОТКА ПОЛЕЙ ВВОДЫ ФОРМЫ **/

import { findOptionBySelect, findOptionByValue } from './utils.js';

const LOCATION_PRECISION = 5;
const DefaultPrice = Object.freeze({
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
});
const DEFAULT_TIME = '12:00';
const DEFAULT_TYPE = 'flat';
const DEFAULT_ROOMS_NUMBER = '1';

let form = document.querySelector('form.ad-form');
let titleField = form.querySelector('#title');
let addressField = form.querySelector('#address');
let typeField = form.querySelector('#type');
let priceField = form.querySelector('#price');
let timeInField = form.querySelector('#timein');
let timeOutField = form.querySelector('#timeout');
let roomsField = form.querySelector('#room_number');
let guestsField = form.querySelector('#capacity');
let featuresField = form.querySelector('.features');
let descriptionField = form.querySelector('#description');
// const submitBtn = form.querySelector('.ad-form__submit');
const resetBtn = form.querySelector('.ad-form__reset');

/* Утилиты */
const setMinimalPrice = (selectedType) => {
  priceField.placeholder = DefaultPrice[selectedType];
  priceField.min = DefaultPrice[selectedType];
};

const setAddress = ({ lat, lng }) => {
  addressField.value = `${lat.toFixed(LOCATION_PRECISION)} в.д., ${lng.toFixed(
    LOCATION_PRECISION
  )} с.ш.`;
};

const setCapacity = (roomsNumber) => {
  const guestsNumber = guestsField.children;
  const rooms = parseInt(roomsNumber);
  for (let guestNumber of guestsNumber) {
    guestNumber.setAttribute('disabled', '');
  }
  if (rooms > 2 && rooms < 100) {
    guestsNumber[0].removeAttribute('disabled', '');
    guestsNumber[1].removeAttribute('disabled', '');
    guestsNumber[2].removeAttribute('disabled', '');
    guestsNumber[2].selected = true;
  }
  if (rooms > 1 && rooms < 100) {
    guestsNumber[1].removeAttribute('disabled', '');
    guestsNumber[2].removeAttribute('disabled', '');
    guestsNumber[2].selected = true;
  }
  if (rooms > 0 && rooms < 100) {
    guestsNumber[2].removeAttribute('disabled', '');
    guestsNumber[2].selected = true;
  }
  if (rooms >= 100) {
    guestsNumber[3].removeAttribute('disabled', '');
    guestsNumber[3].selected = true;
  }
};

const resetTitle = () => {
  titleField.value = '';
};

const resetType = () => {
  for (let option of typeField.children) {
    if (option.value === DEFAULT_TYPE) {
      option.selected = true;
      setMinimalPrice(option.value);
    } else {
      option.selected = false;
    }
  }
};

const resetPrice = () => {
  priceField.value = '';
};

const resetTimes = () => {
  for (let option of timeInField.children) {
    if (option.value === DEFAULT_TIME) {
      option.selected = true;
      timesFieldHandler(timeInField);
    } else {
      option.selected = false;
    }
  }
};

const resetRooms = () => {
  for (let option of roomsField.children) {
    if (option.value === DEFAULT_ROOMS_NUMBER) {
      option.selected = true;
      setCapacity(option.value);
    } else {
      option.selected = false;
    }
  }
};

const resetFeatures = () => {
  for (let feature of featuresField.children) {
    if (feature.type === 'checkbox') {
      feature.checked = false;
    }
  }
};

const resetDescription = () => {
  descriptionField.value = '';
};

/* Обработчики */
const typeFieldHandler = () => {
  setMinimalPrice(findOptionBySelect(typeField).value);
};

const timesFieldHandler = (field) => {
  const selectedTime = findOptionBySelect(field).value;
  if (field === timeInField) {
    findOptionByValue(timeOutField, selectedTime).selected = true;
  } else if (field === timeOutField) {
    findOptionByValue(timeInField, selectedTime).selected = true;
  }
};

const roomsFieldHandler = () => {
  setCapacity(findOptionBySelect(roomsField).value);
};

const resetHandler = (evt) => {
  evt.preventDefault();

  // resetMap();s
  resetTitle();
  resetType();
  resetPrice();
  resetTimes();
  resetRooms();
  resetFeatures();
  resetDescription();
};

/* Слушатели */
const enableFormHandlers = () => {
  timeInField.addEventListener('change', () => timesFieldHandler(timeInField));
  timeOutField.addEventListener('change', () =>
    timesFieldHandler(timeOutField)
  );
  typeField.addEventListener('change', () => typeFieldHandler());
  roomsField.addEventListener('change', () => roomsFieldHandler());

  resetBtn.addEventListener('click', (evt) => resetHandler(evt));
};

/* Настройщик */
// переопределяет изначальные настройки HTML
const setFormFields = () => {
  typeFieldHandler();
  setCapacity(DEFAULT_ROOMS_NUMBER);
};

/* Активатор формы */
const activateForm = () => {
  document.addEventListener('DOMContentLoaded', setFormFields, { once: true });

  form.classList.remove('ad-form--disabled');
  for (let field of form.children) {
    field.removeAttribute('disabled', '');
  }
  enableFormHandlers();
};

function deactivateForm() {
  form.classList.add('ad-form--disabled');
  for (let field of form.children) {
    field.setAttribute('disabled', '');
  }
}

export { activateForm, deactivateForm, setAddress };
