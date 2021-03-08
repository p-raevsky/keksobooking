import {disableElements, enableElements, syncSelectValues, compareItems, isAny} from './util.js';

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

const priceFilterRanges = {
  any: 'any',
  low: {
    minValue: 0,
    maxValue: 10000,
  },
  middle: {
    minValue: 10000,
    maxValue: 50000,
  },
  high: {
    minValue: 50000,
    maxValue: Infinity,
  },
};

const mapFilter = document.querySelector('.map__filters');
const selectsFilter = mapFilter.querySelectorAll('select');
const propertyTypeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

const adForm = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const avatarFile = adForm.querySelector('#avatar');
const propertyType = adForm.querySelector('#type');
const titleField = adForm.querySelector('#title');
const priceField = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const addressField = adForm.querySelector('#address');
const roomsNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const imageFile = adForm.querySelector('#images');
const adFormReset = document.querySelector('.ad-form__reset');

const setDefaultAttributes = () => {
  avatarFile.setAttribute('accept', 'image/png, image/jpeg');
  titleField.setAttribute('required', '');
  titleField.setAttribute('minlength', MIN_LENGTH_TITLE);
  titleField.setAttribute('maxlength', MAX_LENGTH_TITLE);
  priceField.setAttribute('required', '');
  priceField.setAttribute('max', MAX_VALUE_PRICE);
  imageFile.setAttribute('accept', 'image/png, image/jpeg');
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

  priceField.setAttribute('min', offerPriceLabel);
  priceField.setAttribute('placeholder', offerPriceLabel);
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
  setDefaultAttributes();
};

const isTypeMatched = (ad) => {
  const adType = ad.offer.type;
  const selectedType = propertyTypeFilter.value;

  return isAny(selectedType, DEFAULT_ANY_VALUE) ? true : selectedType === adType;
};

const isPriceMatched = (ad) => {
  const adPrice = ad.offer.price;
  const selectedPriceRange = priceFilter.value;
  const minBorderRange = priceFilterRanges[selectedPriceRange].minValue;
  const maxBorderRange = priceFilterRanges[selectedPriceRange].maxValue;

  return isAny(selectedPriceRange, DEFAULT_ANY_VALUE) ? true : (minBorderRange <= adPrice && adPrice < maxBorderRange);
};

const isRoomsMatched = (ad) => {
  const roomsNumber = ad.offer.rooms;
  const selectedRooms = roomsFilter.value;

  return compareItems(selectedRooms, DEFAULT_ANY_VALUE, roomsNumber);
};

const isGuestsMatched = (ad) => {
  const guestsNumber = ad.offer.guests;
  const selectedGuests = guestsFilter.value;

  return compareItems(selectedGuests, DEFAULT_ANY_VALUE, guestsNumber);
}

const getCheckedFeatures = () => {
  const checkedFeatures = featuresFilter.querySelectorAll('input:checked');

  return Array.from(checkedFeatures)
    .map((element) => element.getAttribute('value'));
};

const isFeaturesMatched = (ad, checkedItems) => {
  const offerFeatures = ad.offer.features;

  return checkedItems.every((checkedItem) => offerFeatures.includes(checkedItem));
};

const filterData = (ads) => {
  const checkedFeatures = getCheckedFeatures();

  return ads.filter((ad) => isTypeMatched(ad) && isPriceMatched(ad) && isRoomsMatched(ad) && isGuestsMatched(ad) && isFeaturesMatched(ad, checkedFeatures));
};

export {offersLabelsMap, adForm, adFormReset, mapFilter, avatarFile, imageFile, setDefaultAttributes, activateForm, updateCurentPinCoordinates, deactivateForm, resetFormData, filterData};
