/** ОБРАБОТКА ПОЛЕЙ ВВОДЫ ФОРМЫ **/

import { findOptionBySelect, findOptionByValue } from './main.js';

const PRICE_LIST = Object.freeze({
  'bungalow' : 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace': 10000,
});
const MAX_PRICE = 1000000;

const form = document.querySelector('form.ad-form');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');

let minPrice = 1000;

/* Утилиты */
const setMinimalPrice = (selectedType) => {
  minPrice = PRICE_LIST[selectedType];
};


/* Обработчики */
const priceFieldHandler = () => {
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
};

const typeFieldHandler = () => {
  const selectedOption = findOptionBySelect(typeField);
  const selectedType = selectedOption.value;
  setMinimalPrice(selectedType);
  priceFieldHandler();
};

const timesFieldHandler = (field) => {
  const selectedTime = findOptionBySelect(field).value;
  if (field === timeInField) {
    findOptionByValue(timeOutField, selectedTime).selected = true;
  } else if (field === timeOutField) {
    findOptionByValue(timeInField, selectedTime).selected = true;
  }
};


/* Слушатели */
const enableTimesHandler = () => {
  timeInField.addEventListener('change', () => timesFieldHandler(timeInField));
  timeOutField.addEventListener('change', () => timesFieldHandler(timeOutField));
};

const enableTypeHandler = () => typeField.addEventListener('change', typeFieldHandler);

const enableFormHandlers = () => {
  enableTypeHandler();
  enableTimesHandler();
};


/* Настройщик */
const setFormFields = () => {
  priceField.required = true;
  priceFieldHandler();
  priceField.max = MAX_PRICE;
};


/* Включатель */
const activateFormHandlers = () => {
  document.addEventListener('DOMContentLoaded', setFormFields, {once : true});
  enableFormHandlers();
};

export { activateFormHandlers };