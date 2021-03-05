import {disableElements, enableElements, syncSelectValues} from './util.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;
const ROOM_NUMBER_MAX = 100;
const CAPACITY_MIN = 0;
const DEFAULT_ANY_VALUE = 'any';

const offersLabelsMap = {
  palace: {
    label: 'Дворец',
    price: 10000,
  },
  flat: {
    label: 'Квартира',
    price: 1000,
  },
  house: {
    label: 'Дом',
    price: 5000,
  },
  bungalow: {
    label: 'Бунгало',
    price: 0,
  },
};

const mapFilter = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const propertyTypeFilter = mapFilter.querySelector('#housing-type');
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
const adFormReset =  document.querySelector('.ad-form__reset');

const setDefaultAttributes = () => {
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
  const roomsOption = Number(roomsNumber.value);

  if (roomsOption === ROOM_NUMBER_MAX) {
    capacity.value = CAPACITY_MIN;

    capacityOptions.forEach((element) => {
      if (element.value > CAPACITY_MIN) {
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

timeIn.addEventListener('change', () => {
  syncSelectValues(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  syncSelectValues(timeIn, timeOut);
});

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

const resetFormData = () => {
  adForm.reset();
  mapFilter.reset();
  syncRoomsAndCapacity();
  syncTypeAndPrice();
  setDefaultAttributes()
};

const isTypeFilterValue = (ad) => {
  const selectedType = propertyTypeFilter.value;
  const adType = ad.offer.type;
  return selectedType === DEFAULT_ANY_VALUE ? true : selectedType === adType ? true : false;
};

const filterData = (ads) => {
  return ads.filter(isTypeFilterValue);
};

export {offersLabelsMap, adForm, adFormReset, propertyTypeFilter, activateForm, updateCurentPinCoordinates, deactivateForm, resetFormData, filterData};
