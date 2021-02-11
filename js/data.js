import {getRandomArrayElement, getRandomNumberFloat, getArrayRendomLength} from './utils.js';

const AVATARS_COUNT = 8;
const AVATAR_NAMES = new Array(AVATARS_COUNT).fill().map((item, index) => `${index + 1}`.padStart(2, 0));
const TITLE_AD = 'Уютное и невероятно комфортное жильё в самом в центре города';
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const AVAILABLE_FEATURES = [
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

const createAuthor = () => {
  return {
    avatar: 'img/avatars/user' + getRandomArrayElement(AVATAR_NAMES) + '.png',
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
    checkin: getRandomArrayElement(TIME),
    checkout: getRandomArrayElement(TIME),
    features: getArrayRendomLength(AVAILABLE_FEATURES),
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

export {createAd};
