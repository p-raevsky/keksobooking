import {offersLabelsMap} from './data.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

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
const addressField = adForm.querySelector('#address');
const roomsNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const images = adForm.querySelector('#images');

const actionValue = 'https://22.javascript.pages.academy/keksobooking';

const setDefaultAttributes = () => {
  adForm.setAttribute('action', actionValue);
  avatarFile.setAttribute('accept', 'image/png, image/jpeg');
  titleField.setAttribute('required', '');
  titleField.setAttribute('minlength', MIN_LENGTH_TITLE);
  titleField.setAttribute('maxlength', MAX_LENGTH_TITLE);
  priceType.setAttribute('required', '');
  priceType.setAttribute('max', MAX_VALUE_PRICE);
  images.setAttribute('accept', 'image/png, image/jpeg');
  images.setAttribute('multiple', '');
  addressField.setAttribute('readonly', '');
};

const updateCurentPinCoordinates = (x, y) => {
  addressField.value = `${x}, ${y}`;
};

const syncRoomsAndCapacity = () => {
  const roomsOption = roomsNumber.value;

  if (roomsOption === '100') {
    capacity.value = '0';

    capacityOptions.forEach((element) => {
      if (element.value > '0') {
        element.setAttribute('hidden', '');
      }
    });
  } else {
    capacityOptions.forEach((element) => {
      if (roomsOption >= element.value && element.value > '0') {
        element.removeAttribute('hidden');
      } else {
        element.setAttribute('hidden', '');
      }
    });

    capacity.value = roomsOption;
  }
};

roomsNumber.addEventListener('change', () => {
  syncRoomsAndCapacity();
});

const syncTypeAndPrice = () => {
  const offerType = propertyType.value;
  const offerPriceLabel = offersLabelsMap[offerType].price;

  priceType.setAttribute('min', offerPriceLabel);
  priceType.setAttribute('placeholder', offerPriceLabel);
};

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

const activateForm = () => {
  mapFilter.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  enableElements(fieldsets);
  enableElements(selectsFilter);
};

const initForm = () => {
  syncRoomsAndCapacity();
  syncTypeAndPrice();
  setDefaultAttributes();
  deactivateForm();
};

initForm();

export {activateForm, addressField, updateCurentPinCoordinates};
