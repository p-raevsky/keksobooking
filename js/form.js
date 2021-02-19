import {offersLabelsMap} from './data.js';

const mapFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const allFildsetsElement = document.querySelectorAll('fieldset');
const allSelectsFilterElement = mapFilterElement.querySelectorAll('select');
const propertyTypeFormElement = adFormElement.querySelector('#type');
const priceFormElement = adFormElement.querySelector('#price');
const timeInFormElement = adFormElement.querySelector('#timein');
const timeOutFormElement = adFormElement.querySelector('#timeout');

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

const getDisabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const getEnabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const makesInactiveFormHandler = () => {
  mapFilterElement.classList.add('map__filters--disabled');
  adFormElement.classList.add('ad-form--disabled');

  getDisabledElements(allFildsetsElement);
  getDisabledElements(allSelectsFilterElement);
};

makesInactiveFormHandler();

const makesActiveFormHandler = () => {
  mapFilterElement.classList.remove('map__filters--disabled');
  adFormElement.classList.remove('ad-form--disabled');

  getEnabledElements(allFildsetsElement);
  getEnabledElements(allSelectsFilterElement);
};

export {makesActiveFormHandler};
