import {offersLabelsMap} from './form.js';

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
  const adTitle = adElement.querySelector('.popup__title');
  const adTextAddress = adElement.querySelector('.popup__text--address');
  const adTextPrice = adElement.querySelector('.popup__text--price');
  const adType = adElement.querySelector('.popup__type');
  const adTextСapacity = adElement.querySelector('.popup__text--capacity');
  const adTextTime = adElement.querySelector('.popup__text--time');
  const adFeatures = adElement.querySelector('.popup__features');
  const adDescription = adElement.querySelector('.popup__description');
  const adPhotos = adElement.querySelector('.popup__photos');
  const adAvatar = adElement.querySelector('.popup__avatar');

  if (element.offer.title) {
    adTitle.textContent = element.offer.title;
  } else {
    adTitle.remove();
  }

  if (element.offer.address) {
    adTextAddress.textContent = element.offer.address;
  } else {
    adTextAddress.remove();
  }

  if (element.offer.price) {
    adTextPrice.textContent = `${element.offer.price} ₽/ночь`;
  } else {
    adTextPrice.remove();
  }

  if (element.offer.description) {
    adDescription.textContent = element.offer.description;
  } else {
    adDescription.remove();
  }

  if (element.author.avatar) {
    adAvatar.src = element.author.avatar;
  } else {
    adAvatar.remove();
  }

  if (element.offer.features) {
    adFeatures.innerHTML = '';
    const featuresFragment = createFeaturesFragment(element.offer.features);
    adFeatures.appendChild(featuresFragment);
  } else {
    adFeatures.remove();
  }

  if (element.offer.photos) {
    adPhotos.innerHTML = '';
    const photosFragment = createPhotosFragment(element.offer.photos);
    adPhotos.appendChild(photosFragment);
  } else {
    adPhotos.remove();
  }

  adTextСapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  adTextTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const label = offersLabelsMap[element.offer.type].label;
  adType.textContent = label;

  return adElement;
};

export {createSimilarAd};
