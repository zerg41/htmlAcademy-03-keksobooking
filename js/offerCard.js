/** ГЕНЕРАЦИЯ РАЗМЕТКИ ПОХОЖИХ ОБЪЯВЛЕНИЙ НА ОСНОВЕ ДАННЫХ **/

const offerCardTemplate = document.getElementById('card').content.children[0];

const translateOfferType = (type) => {
  switch(type.toString()) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default: return '';
  }
};

const renderCapacity = (rooms, guests) => {
  let roomsDescription;
  switch(parseInt(rooms)) {
    case 1: {
      roomsDescription = 'комната';
      break;
    }
    case 2:
    case 3:
    case 4: {
      roomsDescription = 'комнаты';
      break;
    }
    default: {
      roomsDescription = 'комнат';
      break;
    }
  }

  return `${rooms} ${roomsDescription} для ${guests} ${guests == 1 ? 'гостя' : 'гостей'}`
};

const renderFeatures = (featuresList, features) => {
  featuresList.innerHTML = '';
  features.map(feature => {
    featuresList.innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`
  });

  return featuresList;
};

const renderPhotos = (photosList, photos) => {
  photosList.innerHTML = '';
  if (photos.length !== 0) {
    photos.map(photo => {
      photosList.innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
    });
  }

  return photosList;
};

const renderOfferCard = ({
  offer : {title},
  offer : {address},
  offer : {price},
  offer : {type},
  offer : {rooms},
  offer : {guests},
  offer : {checkin},
  offer : {checkout},
  offer : {features},
  offer : {description},
  offer : {photos},
  author : {avatar}}) => {
  const offerCard = offerCardTemplate.cloneNode(true);
  const featuresList = offerCard.querySelector('.popup__features');
  const photosList = offerCard.querySelector('.popup__photos');

  offerCard.querySelector('.popup__title').textContent = title;
  offerCard.querySelector('.popup__text--address').textContent = address;
  offerCard.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  offerCard.querySelector('.popup__type').textContent = translateOfferType(type);
  offerCard.querySelector('.popup__text--capacity').textContent = renderCapacity(rooms, guests);
  offerCard.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  renderFeatures(featuresList, features);
  offerCard.querySelector('.popup__description').textContent = description;
  renderPhotos(photosList, photos);
  offerCard.querySelector('.popup__avatar').src = avatar;

  return offerCard;
};

export { renderOfferCard };
