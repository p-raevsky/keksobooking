import {createAd} from './data.js';

const map = document.querySelector('.map__canvas');
const adTemplate = document.querySelector('#card').content.querySelector('.popup');

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
    item.width = 45;
    item.height = 40;
    item.alt = 'Фотография жилья';
    item.src = photoSrc;
    fragment.appendChild(item);
  });
  return fragment;
};

const createSimilarAd = (element) => {
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

  popupTitle.textContent = element.offer.title;
  popupTextAddress.textContent = element.offer.address;
  popupTextPrice.textContent = `${element.offer.price} ₽/ночь`;
  popupTextСapacity.textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  popupTextTime.textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  popupDescription.textContent = element.offer.description;
  popupAvatar.src = element.author.avatar;

  switch (element.offer.type) {
    case 'flat':
      popupType.textContent = 'Квартира';
      break
    case 'bungalow':
      popupType.textContent = 'Бунгало';
      break
    case 'house':
      popupType.textContent = 'Дом';
      break
    case 'palace':
      popupType.textContent = 'Дом';
      break
  }

  popupFeatures.innerHTML = '';
  const featuresFragment = createFeaturesFragment(element.offer.features);
  popupFeatures.appendChild(featuresFragment);

  popupPhotos.innerHTML = '';
  const photosFragment = createPhotosFragment(element.offer.photos);
  popupPhotos.appendChild(photosFragment);

  map.appendChild(adElement);
};

const similarAd = createSimilarAd(createAd());

export {similarAd};
