'use strict';

const AVATAR_IMAGE_COUNTER = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
];
const TITLE_AD = 'Уютное и невероятно комфортное жильё в самом в центре города';
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const EXAMPLES_CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const EXAMPLES_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const ALL_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION = 'Отличное жильё, свежий ремонт, все удобства, прекрасное тихое место, рядом есть супермаркет. Вы останестесь довольны!';
const PROPERTY_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const MIN_NUMBER = 0;
const MAX_NUMBER = 1000000;
const LOCATION_FLOAT = 5;
const SIMILAR_AD_COUNT = 10;

const getRandomArrayElement = function(elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

const getRandomNumberFloat = function(minNumber, maxNumber, float = 0) {
  return +((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float));
};

const getArrayRendomLength = function(elements) {
  return (elements.slice(Math.floor(Math.random() * (elements.length - 1))));
};

const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + getRandomArrayElement(AVATAR_IMAGE_COUNTER) + '.png',
  };
};

const createLocation = () => {
  return {
    x: getRandomNumberFloat(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_FLOAT),
    y: getRandomNumberFloat(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_FLOAT),
  };
};

const createOffer = () => {
  return {
    title: TITLE_AD,
    address: '',
    price: getRandomNumberFloat(MIN_NUMBER, MAX_NUMBER),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomNumberFloat(MIN_NUMBER, MAX_NUMBER),
    guests: getRandomNumberFloat(MIN_NUMBER, MAX_NUMBER),
    checkin: getRandomArrayElement(EXAMPLES_CHECKIN_TIME),
    checkout: getRandomArrayElement(EXAMPLES_CHECKOUT_TIME),
    features: getArrayRendomLength(ALL_FEATURES),
    description: DESCRIPTION,
    photos: getArrayRendomLength(PROPERTY_PHOTOS),
  };
};

const createAd = () => {
  const location = createLocation();
  const offer = createOffer();
  offer.address = `${location.x}, ${location.y}`;

  return {
    author: createAuthor(),
    offer: offer,
    location: location,
  };
};

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

similarAds;
