/** ГЕНЕРАЦИЯ РАЗМЕТКИ ПОХОЖИХ ОБЪЯВЛЕНИЙ НА ОСНОВЕ ДАННЫХ **/
import { removeDomElement } from './utils.js';

const offerCardTemplate = document.getElementById('card').content.children[0];

function getTypeName(type) {
  switch (type.toString()) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return '';
  }
}

function getCapacity(rooms, guests) {
  let roomsDescription;

  switch (parseInt(rooms)) {
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

  return `${rooms} ${roomsDescription} для ${guests} ${
    guests == 1 ? 'гостя' : 'гостей'
  }`;
}

function getValidAvatarSrc(avatarSrc) {
  const DEFAULT_AVATAR_SRC = 'img/avatars/default.png';
  const regex = /\user0[1-8].png/g;

  let isAvatarValid = avatarSrc.match(regex);

  if (isAvatarValid) {
    return avatarSrc;
  }

  return DEFAULT_AVATAR_SRC;
}

function setFeatures(container, features) {
  container.innerHTML = '';

  features.map((feature) => {
    container.innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`;
  });

  return container;
}

function setPhotos(container, photos) {
  container.innerHTML = '';

  if (photos.length !== 0) {
    photos.map((photo) => {
      container.innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    });
  }

  return container;
}

export function createOfferCard({
  offer: { title },
  offer: { address },
  offer: { price },
  offer: { type },
  offer: { rooms },
  offer: { guests },
  offer: { checkin },
  offer: { checkout },
  offer: { features },
  offer: { description },
  offer: { photos },
  author: { avatar },
}) {
  let offerCard = offerCardTemplate.cloneNode(true);
  let featureList = offerCard.querySelector('.popup__features');
  let photoList = offerCard.querySelector('.popup__photos');
  let userAvatar = offerCard.querySelector('.popup__avatar');
  let offerTitle = offerCard.querySelector('.popup__title');
  let offerAddress = offerCard.querySelector('.popup__text--address');
  let offerPrice = offerCard.querySelector('.popup__text--price');
  let offerType = offerCard.querySelector('.popup__type');
  let offerCapacity = offerCard.querySelector('.popup__text--capacity');
  let offerTime = offerCard.querySelector('.popup__text--time');
  let offerDescription = offerCard.querySelector('.popup__description');

  avatar
    ? (userAvatar.src = getValidAvatarSrc(avatar))
    : removeDomElement(userAvatar);

  title ? (offerTitle.textContent = title) : removeDomElement(offerTitle);

  address
    ? (offerAddress.textContent = address)
    : removeDomElement(offerAddress);

  price
    ? (offerPrice.textContent = `${price} ₽/ночь`)
    : removeDomElement(offerPrice);

  type
    ? (offerType.textContent = getTypeName(type))
    : removeDomElement(offerType);

  rooms && guests
    ? (offerCapacity.textContent = getCapacity(rooms, guests))
    : removeDomElement(offerCapacity);

  checkin && checkout
    ? (offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`)
    : removeDomElement(offerTime);

  description
    ? (offerDescription.textContent = description)
    : removeDomElement(offerDescription);

  features ? setFeatures(featureList, features) : removeDomElement(featureList);
  photos ? setPhotos(photoList, photos) : removeDomElement(photoList);

  return offerCard;
}
