/** ОБРАБОТКА ПОЛЕЙ ВВОДЫ ФОРМЫ **/
import { postData as postFormData } from './api.js';
import { resetMap } from './map.js';
import { openModal } from './modal.js';
import {
  getOptionByValue,
  getSelectedOption,
  uncheckOptions,
  LOCATION_PRECISION,
} from './utils.js';

/* Объявление констант */
const DEFAULT_TYPE_INDEX = 1;
const DEFAULT_TIME_INDEX = 0;
const DEFAULT_ROOM_NUMBER_INDEX = 0;
const DefaultPrice = Object.freeze({
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
});

/* Объявление объектов DOM */
let adForm = document.querySelector('form.ad-form');
let titleField = adForm.querySelector('#title');
let addressField = adForm.querySelector('#address');
let typeField = adForm.querySelector('#type');
let priceField = adForm.querySelector('#price');
let timeInField = adForm.querySelector('#timein');
let timeOutField = adForm.querySelector('#timeout');
let roomField = adForm.querySelector('#room_number');
let capacityField = adForm.querySelector('#capacity');
let descriptionField = adForm.querySelector('#description');
let featuresFieldset = adForm.querySelector('.features');
let submitButton = adForm.querySelector('.ad-form__submit');
let resetButton = adForm.querySelector('.ad-form__reset');

/* Обработчики событий */
function typeFieldHandler(evt) {
  let selectedType = getSelectedOption(evt.target).value;
  setMinimalPrice(selectedType);
}

function timeFieldHandler(evt) {
  let selectedField = evt.target;
  let selectedTime = getSelectedOption(selectedField).value;

  switch (selectedField) {
    case timeInField:
      getOptionByValue(timeOutField, selectedTime).selected = true;
      break;

    case timeOutField:
      getOptionByValue(timeInField, selectedTime).selected = true;
      break;
  }
}

function roomFieldHandler(evt) {
  let selectedRoomNumber = getSelectedOption(evt.target).value;
  setCapacity(selectedRoomNumber);
}

function resetButtonHandler(evt) {
  evt.preventDefault();
  resetForm();
}

function submitFormHandler(evt) {
  evt.preventDefault();

  let isFormValid = validateForm();
  let formData = new FormData(adForm);

  function onSubmitSuccess() {
    openModal('success');
    resetForm();
  }

  function onSubmitFail() {
    openModal('error');
  }

  if (isFormValid) {
    postFormData(formData, onSubmitSuccess, onSubmitFail);
  }
}

/* Функции */
function enableFormHandlers() {
  adForm.addEventListener('submit', (evt) => submitFormHandler(evt));
  typeField.addEventListener('change', (evt) => typeFieldHandler(evt));
  roomField.addEventListener('change', (evt) => roomFieldHandler(evt));
  timeInField.addEventListener('change', (evt) => timeFieldHandler(evt));
  timeOutField.addEventListener('change', (evt) => timeFieldHandler(evt));
  resetButton.addEventListener('click', (evt) => resetButtonHandler(evt));
  submitButton.addEventListener('click', (evt) => submitFormHandler(evt));
}

function validateForm() {
  let isFormValid = adForm.checkValidity();

  if (isFormValid) {
    return true;
  }

  alert('Допущены ошибки при заполнении формы!');
  return false;
}

function setAddress({ lat, lng }) {
  addressField.value =
    `${lat.toFixed(LOCATION_PRECISION)} в.д.,` +
    `${lng.toFixed(LOCATION_PRECISION)} с.ш.`;
}

function setMinimalPrice(typeOptionValue) {
  priceField.placeholder = DefaultPrice[typeOptionValue.toUpperCase()];
  priceField.min = DefaultPrice[typeOptionValue.toUpperCase()];
}

function setCapacity(selectedRoomNumber = 1) {
  const ONE_GUEST_INDEX = 0;
  const TWO_GUESTS_INDEX = 1;
  const THREE_GUESTS_INDEX = 2;
  const NO_GUEST_INDEX = 3;

  let capacityOptions = capacityField.children;
  let roomNumber = Number(selectedRoomNumber);

  switch (roomNumber) {
    case 1:
      capacityOptions[NO_GUEST_INDEX].setAttribute('disabled', '');
      capacityOptions[THREE_GUESTS_INDEX].setAttribute('disabled', '');
      capacityOptions[TWO_GUESTS_INDEX].setAttribute('disabled', '');
      capacityOptions[ONE_GUEST_INDEX].removeAttribute('disabled');
      capacityOptions[ONE_GUEST_INDEX].selected = true;
      break;

    case 2:
      capacityOptions[NO_GUEST_INDEX].setAttribute('disabled', '');
      capacityOptions[THREE_GUESTS_INDEX].setAttribute('disabled', '');
      capacityOptions[TWO_GUESTS_INDEX].removeAttribute('disabled');
      capacityOptions[ONE_GUEST_INDEX].removeAttribute('disabled');
      capacityOptions[TWO_GUESTS_INDEX].selected = true;
      break;

    case 3:
      capacityOptions[NO_GUEST_INDEX].setAttribute('disabled', '');
      capacityOptions[THREE_GUESTS_INDEX].removeAttribute('disabled');
      capacityOptions[TWO_GUESTS_INDEX].removeAttribute('disabled');
      capacityOptions[ONE_GUEST_INDEX].removeAttribute('disabled');
      capacityOptions[THREE_GUESTS_INDEX].selected = true;
      break;

    case 100:
      capacityOptions[NO_GUEST_INDEX].removeAttribute('disabled', '');
      capacityOptions[THREE_GUESTS_INDEX].setAttribute('disabled', '');
      capacityOptions[TWO_GUESTS_INDEX].setAttribute('disabled', '');
      capacityOptions[ONE_GUEST_INDEX].setAttribute('disabled', '');
      capacityOptions[NO_GUEST_INDEX].selected = true;
  }
}

function resetTitle() {
  titleField.value = '';
}

function resetType() {
  let defaultTypeOption = typeField.children[DEFAULT_TYPE_INDEX];

  defaultTypeOption.selected = true;
  setMinimalPrice(defaultTypeOption.value);
}

function resetPrice() {
  priceField.value = '';
}

function resetTimes() {
  timeInField.children[DEFAULT_TIME_INDEX].selected = true;
  timeOutField.children[DEFAULT_TIME_INDEX].selected = true;
}

function resetRoomNumber() {
  let defaultRoomNumberOption = roomField.children[DEFAULT_ROOM_NUMBER_INDEX];

  defaultRoomNumberOption.selected = true;

  setCapacity(defaultRoomNumberOption.value);
}

function resetFeatures() {
  uncheckOptions(featuresFieldset.elements);
}

function resetDescription() {
  descriptionField.value = '';
}

function activateForm() {
  adForm.classList.remove('ad-form--disabled');

  for (let field of adForm.children) {
    field.removeAttribute('disabled', '');
  }

  setCapacity();
  enableFormHandlers();
}

function resetForm() {
  resetMap();
  resetTitle();
  resetType();
  resetPrice();
  resetTimes();
  resetRoomNumber();
  resetFeatures();
  resetDescription();
}

export { activateForm, setAddress };
