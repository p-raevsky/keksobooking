import {offersLabelsMap} from './data.js';

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const createFeaturesFragment = (featuresArray) => {
  const fragment = document.createDocumentFragment();
  featuresArray.forEach((feature) => {
    const item = document.createElement('li');
    item.className = `popup__feature popup__feature--${feature}`;
    fragment.appendChild(item);
  });
  return fragment;
};

const createPhotosFragment = (photoSrcArray) => {
  const fragment = document.createDocumentFragment();
  photoSrcArray.forEach((photoSrc) => {
    const item = document.createElement('img');
    item.className = 'popup__photo';
    item.width = PHOTO_WIDTH;
    item.height = PHOTO_HEIGHT;
    item.alt = 'Фотография жилья';
    item.src = photoSrc;
    fragment.appendChild(item);
  });
  return fragment;
};

const createSimilarAd = (element) => {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = adTemplate.cloneNode(true);
  const popupTitle = adElement.querySelector('.popup__title');
  const popupTextAddress = adElement.querySelector('.popup__text--address');
  const popupTextPrice = adElement.querySelector('.popup__text--price');
  const popupType = adElement.querySelector('.popup__type');
  const popupTextСapacity = adElement.querySelector('.popup__text--capacity');
  const popupTextTime = adElement.querySelector('.popup__text--time');
  const popupFeatures = adElement.querySelector('.popup__features');
  const popupDescription = adElement.querySelector('.popup__description');
  const popupPhotos = adElement.querySelector('.popup__photos');
  const popupAvatar = adElement.querySelector('.popup__avatar');

  if (element.offer.title) {
    popupTitle.textContent = element.offer.title;
  } else {
    popupTitle.remove();
  }

  if (element.offer.address) {
    popupTextAddress.textContent = element.offer.address;
  } else {
    popupTextAddress.remove();
  }

  if (element.offer.price) {
    popupTextPrice.textContent = `${element.offer.price} ₽/ночь`;
  } else {
    popupTextPrice.remove();
  }

  if (element.offer.description) {
    popupDescription.textContent = element.offer.description;
  } else {
    popupDescription.remove();
  }

  if (element.author.avatar) {
    popupAvatar.src = element.author.avatar;
  } else {
    popupAvatar.remove();
  }

  if (element.offer.features) {
    popupFeatures.innerHTML = '';
    const featuresFragment = createFeaturesFragment(element.offer.features);
    popupFeatures.appendChild(featuresFragment);
  } else {
    popupFeatures.remove();
  }

  if (element.offer.photos) {
    popupPhotos.innerHTML = '';
    const photosFragment = createPhotosFragment(element.offer.photos);
    popupPhotos.appendChild(photosFragment);
  } else {
    popupPhotos.remove();
  }

  popupTextСapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  popupTextTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const label = offersLabelsMap[element.offer.type].label;
  popupType.textContent = label;

  return adElement;
};

export {createSimilarAd};
