import {offersLabelsMap} from './data.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

const roomsGuestsRatio = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const selectsFilter = mapFilter.querySelectorAll('select');
const avatarFile = adForm.querySelector('#avatar');
const propertyType = adForm.querySelector('#type');
const titleField = adForm.querySelector('#title');
const priceType = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const addressFild = adForm.querySelector('#address');
const roomsNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const images = adForm.querySelector('#images');

const actionValue = 'https://22.javascript.pages.academy/keksobooking';

capacity.value = roomsGuestsRatio[1];

const syncRoomsAndCapacity = () => {
  const roomsOptions = roomsGuestsRatio[roomsNumber.value];

  capacityOptions.forEach((element) => {
    if (roomsOptions.indexOf(element.value) === -1) {
      element.setAttribute('hidden', '');
    } else {
      element.removeAttribute('hidden')
    }
  });

  capacity.value = roomsNumber.value;

  if (roomsNumber.value === '100') {
    capacity.value = '0';
  }
};

syncRoomsAndCapacity()

roomsNumber.addEventListener('change', () => {
  syncRoomsAndCapacity();
});

adForm.setAttribute('action', actionValue);
avatarFile.setAttribute('accept', 'image/png, image/jpeg');
titleField.setAttribute('required', '');
titleField.setAttribute('minlength', MIN_LENGTH_TITLE);
titleField.setAttribute('maxlength', MAX_LENGTH_TITLE);
priceType.setAttribute('required', '');
priceType.setAttribute('max', MAX_VALUE_PRICE);
images.setAttribute('accept', 'image/png, image/jpeg');
images.setAttribute('multiple', '');

const updateCurentPinCoordinates = (x, y) => {
  addressFild.value = `${x}, ${y}`;
};

addressFild.setAttribute('readonly', '');

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

  disableElements(fieldsets);
  disableElements(selectsFilter);
};

deactivateForm();

const activateForm = () => {
  mapFilter.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  enableElements(fieldsets);
  enableElements(selectsFilter);
};

export {activateForm, addressFild, updateCurentPinCoordinates};
