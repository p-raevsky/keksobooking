import {offersLabelsMap} from './data.js';

const mapFilterElement = document.querySelector('.map__filters');
const typeFilterElement = mapFilterElement.querySelector('#housing-type');
const priceFilterElement = mapFilterElement.querySelector('#housing-price');
const roomsFilterElement = mapFilterElement.querySelector('#housing-rooms');
const guestsFilterElement = mapFilterElement.querySelector('#housing-guests');
const featuresFilterElement = mapFilterElement.querySelector('#housing-features');


const adFormElement = document.querySelector('.ad-form');
const adFormHeaderElement = adFormElement.querySelector('.ad-form-header');
const titleFormElement = adFormElement.querySelector('#title');
const addressFormElement = adFormElement.querySelector('#address');
const propertyTypeFormElement = adFormElement.querySelector('#type');
const priceFormElement = adFormElement.querySelector('#price');
const timeInFormElement = adFormElement.querySelector('#timein');
const timeOutFormElement = adFormElement.querySelector('#timeout');
const roomNumberFormElement = adFormElement.querySelector('#room_number');
const capacityRoomFormElement = adFormElement.querySelector('#capacity');
const featuresFormElement = adFormElement.querySelector('.features');
const descriptionFormElement = adFormElement.querySelector('#description');
const imagesFormElement = adFormElement.querySelector('#images');
const submitFormElement = adFormElement.querySelector('.ad-form__element--submit');

const selectChangeTypeHandler = () => {
  const offerType = propertyTypeFormElement.value;
  const offerPriceLabel = offersLabelsMap[offerType].price;
  priceFormElement.setAttribute('min', offerPriceLabel);
  priceFormElement.setAttribute('placeholder', offerPriceLabel);
};

propertyTypeFormElement.addEventListener('change', selectChangeTypeHandler);

const selectChangeTimeHandler = (firstTimeElement, secondTimeElement) => {
  firstTimeElement.value = secondTimeElement.value;
};

timeInFormElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeOutFormElement, timeInFormElement);
});

timeOutFormElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeInFormElement, timeOutFormElement);
});

const makesInactiveFormHandler = () => {
  mapFilterElement.classList.add('map__filters--disabled');
  typeFilterElement.disabled = true;
  priceFilterElement.disabled = true;
  roomsFilterElement.disabled = true;
  guestsFilterElement.disabled = true;
  featuresFilterElement.disabled = true;

  adFormElement.classList.add('ad-form--disabled');
  titleFormElement.disabled = true;
  adFormHeaderElement.disabled = true;
  addressFormElement.disabled = true;
  propertyTypeFormElement.disabled = true;
  priceFormElement.disabled = true;
  timeInFormElement.disabled = true;
  timeOutFormElement.disabled = true;
  roomNumberFormElement.disabled = true;
  capacityRoomFormElement.disabled = true;
  featuresFormElement.disabled = true;
  descriptionFormElement.disabled = true;
  imagesFormElement.disabled = true;
  submitFormElement.disabled = true;
};

document.addEventListener('DOMContentLoaded', makesInactiveFormHandler);
