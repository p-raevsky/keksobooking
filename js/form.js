import {offersLabelsMap} from './data.js';

const propertyTypeElement = document.querySelector('#type');
const priceForNightElement = document.querySelector('#price');

const selectChangeTypeHandler = () => {
  const offerType = propertyTypeElement.value;
  const offerPriceLabel = offersLabelsMap[offerType].price;
  priceForNightElement.setAttribute('min', offerPriceLabel);
  priceForNightElement.setAttribute('placeholder', offerPriceLabel);
};

propertyTypeElement.addEventListener('change', selectChangeTypeHandler);

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const selectChangeTimeHandler = (firstTimeElement, secondTimeElement) => {
  firstTimeElement.value = secondTimeElement.value;
};

timeInElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeOutElement, timeInElement);
});

timeOutElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeInElement, timeOutElement);
});
