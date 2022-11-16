/** ОБРАБОТКА ЗАГРУЗКИ ФОТОГРАФИЙ **/
import { removeDomElement } from './utils.js';

/* Объявление констант */
const VALID_FILE_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_PREVIEW_URL = 'img/muffin-grey.svg';

/* Объявление объектов DOM */
let avatarUploadElement = document.querySelector('#avatar');
let avatarPreview = document.querySelector('.ad-form-header__preview img');

let photosUploadElement = document.querySelector('#images');
let photosContainer = document.querySelector('.ad-form__photo-container');
let defaultPhotoContainer = document.querySelector('.ad-form__photo');

/* Объявление переменных */
let photos = [];
let containers = [];

/* Обработчики событий */
function avatarUploadHandler(evt) {
  let file = evt.target.files[0];
  let fileName = file.name.toLowerCase();
  let isValidFileName = checkIsValidFileName(fileName);

  if (isValidFileName) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

function photosUploadHandler(evt) {
  let photosCount = photos.length;
  let file = evt.target.files[0];
  let fileName = file.name.toLowerCase();
  let isValidFileName = checkIsValidFileName(fileName);

  if (isValidFileName) {
    let reader = new FileReader();

    reader.addEventListener('load', () => {
      let photo = document.createElement('img');

      photo.src = reader.result;
      photo.width = 70;
      photo.height = 70;
      photo.alt = `Фотография жилья - ${photosCount}`;
      photo.id = `ad-photo-${photosCount}`;

      if (photosCount === 0) {
        defaultPhotoContainer.appendChild(photo);
      } else {
        let photoContainer = defaultPhotoContainer.cloneNode();
        photoContainer.appendChild(photo);
        photosContainer.appendChild(photoContainer);

        containers.push(photoContainer);
      }

      photos.push(photo);
    });

    reader.readAsDataURL(file);
  }
}

/* Функции */
function checkIsValidFileName(filename) {
  return VALID_FILE_EXTENSIONS.some((validExtension) =>
    filename.endsWith(validExtension)
  );
}

function enableFileUploadHandlers() {
  avatarUploadElement.addEventListener('change', avatarUploadHandler);
  photosUploadElement.addEventListener('change', photosUploadHandler);
}

function resetUploadedFiles() {
  // Чистим фотографии жилья
  photos.forEach((photo) => {
    removeDomElement(photo);
  });
  photos = [];
  photosUploadElement.value = '';

  // Удаляем контейнеры под фотографии жилья
  containers.forEach((container) => {
    removeDomElement(container);
  });
  containers = [];

  // Чистим загруженный аватар
  avatarPreview.src = DEFAULT_AVATAR_PREVIEW_URL;
  avatarUploadElement.value = '';
}

export { enableFileUploadHandlers, resetUploadedFiles };
