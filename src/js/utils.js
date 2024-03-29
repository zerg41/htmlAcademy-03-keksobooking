/** УТИЛИТЫ **/

/* Константы */
export const LOCATION_PRECISION = 5;

/* Работа с числами */
/** Функция возвращает случайное целое число из переданного диапазона включительно
 *
 * @param {number} min диапазон "от", целое неотрицательное число
 * @param {number} max диапазон "до", целое неотрицательное число
 * @returns {number} целое число из диапазона "от...до"
 */
export function getRandomInt(min, max) {
  if (min < 0 || max < 0) {
    const error = new Error('Параметры должны быть >= 0');
    throw error;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

/** Функция, возвращает случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {number} min диапазон "от", целое неотрицательное число
 * @param {number} max диапазон "до", целое неотрицательное число
 * @param {number} digitsAfterComma количество знаков после запятой
 * @returns {number} число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
 */
export function getRandomFloat(min, max, digitsAfterComma = 0) {
  if (min < 0 || max < 0 || digitsAfterComma < 0) {
    const error = new Error('Параметры должны быть >= 0');
    throw error;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max - min);
  return Number(rand.toFixed(digitsAfterComma));
}

/* Работа с массивами */
export function extractRandomItemsFromArray(array) {
  return array.filter(() => getRandomInt(0, 1));
}

/* Работа с DOM-элементами */
export function getSelectedOption(selectField) {
  const selectedOption = [...selectField.children].filter(
    (option) => option.selected === true
  )[0];

  return selectedOption;
}

export function getOptionByValue(selectField, value) {
  const selectedOption = [...selectField.children].filter(
    (option) => option.value === value
  )[0];

  return selectedOption;
}

export function uncheckOptions(options) {
  for (let option of options) {
    option.checked = false;
  }
}

export function removeDomElement(element) {
  element.parentNode.removeChild(element);
}

export function renderDomElement(element, parent) {
  let rootElement = parent || element;
  rootElement.parentNode.appendChild(element);
}

/* Асинхронные функции */
export function debounce(cb, interval) {
  let debounceTimer;
  let initCb = cb;

  return function debounced() {
    clearTimeout(debounceTimer);
    let _this = this;
    let _args = arguments;

    debounceTimer = setTimeout(() => initCb.apply(_this, _args), interval);
  };
}
