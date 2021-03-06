/** УТИЛИТЫ **/

/* РАБОТА С ЧИСЛАМИ */
/** Функция возвращает случайное целое число из переданного диапазона включительно
 *
 * @param {number} min диапазон "от", целое неотрицательное число
 * @param {number} max диапазон "до", целое неотрицательное число
 * @returns {number} целое число из диапазона "от...до"
 */
export const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    const error = new Error('Параметры должны быть >= 0');
    throw error;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

/** Функция, возвращает случайное число с плавающей точкой из переданного диапазона включительно
 *
 * @param {number} min диапазон "от", целое неотрицательное число
 * @param {number} max диапазон "до", целое неотрицательное число
 * @param {number} digitsAfterComma количество знаков после запятой
 * @returns {number} число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
 */
export const getRandomFloat = (min, max, digitsAfterComma = 0) => {
  if (min < 0 || max < 0 || digitsAfterComma < 0) {
    const error = new Error('Параметры должны быть >= 0');
    throw error;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  const rand = min + Math.random() * (max - min);
  return Number(rand.toFixed(digitsAfterComma));
};

/* РАБОТА С МАССИВАМИ */
export const extractRandomItemsFromArray = (array) => {

  return array.filter(() => getRandomInt(0, 1));
};

/* РАБОТА С DOM-ЭЛЕМЕНТАМИ */
export const findOptionBySelect = (selectField) => {
  const selectedOption = [...selectField.children].filter(option => option.selected === true)[0];

  return selectedOption;
};

export const findOptionByValue = (selectField, value) => {
  const selectedOption = [...selectField.children].filter(option => option.value === value)[0];

  return selectedOption;
};

/* ОТРИСОВКА ЭЛЕМЕНТОВ */
export const renderElementAfterElementParent = (element, elementParent) => elementParent.appendChild(element);
