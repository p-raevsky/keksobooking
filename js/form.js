import {offersLabelsMap} from './data.js';

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const fildsets = document.querySelectorAll('fieldset');
const selectsFilter = mapFilter.querySelectorAll('select');
const propertyType = adForm.querySelector('#type');
const priceType = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const addressFild = document.querySelector('#address');

const updateCurentPinCoordinates = (x, y) => {
  addressFild.value = `${x}, ${y}`;
};

addressFild.setAttribute('readonly', true);

const syncTypeAndPrice = () => {
  const offerType = propertyType.value;
  const offerPriceLabel = offersLabelsMap[offerType].price;
  priceType.setAttribute('min', offerPriceLabel);
  priceType.setAttribute('placeholder', offerPriceLabel);
};

syncTypeAndPrice();

propertyType.addEventListener('change', () => {
  syncTypeAndPrice();
});

const syncSelectTimes = (firstTimeElement, secondTimeElement) => {
  firstTimeElement.value = secondTimeElement.value;
};

timeIn.addEventListener('change', () => {
  syncSelectTimes(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  syncSelectTimes(timeIn, timeOut);
});

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const deactivateForm = () => {
  mapFilter.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');

  disableElements(fildsets);
  disableElements(selectsFilter);
};

deactivateForm();

const activateForm = () => {
  mapFilter.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  enableElements(fildsets);
  enableElements(selectsFilter);
};

export {activateForm, addressFild, updateCurentPinCoordinates};
