import {isEscEvent} from './util.js';
import {sendData} from './api.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_VALUE_PRICE = 1000000;

const offersLabelsMap = {
  'palace': {
    label: 'Дворец',
    price: 10000,
  },
  'flat': {
    label: 'Квартира',
    price: 1000,
  },
  'house': {
    label: 'Дом',
    price: 5000,
  },
  'bungalow': {
    label: 'Бунгало',
    price: 0,
  },
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
const addressField = adForm.querySelector('#address');
const roomsNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');
const images = adForm.querySelector('#images');
const adFormSubmit = adForm.querySelector('.ad-form__submit');
const adFormReset =  adForm.querySelector('.ad-form__reset');

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

const onEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMsg();
  }
};

const closeSuccessMsg = () => {
  const main = document.querySelector('main');
  const successElement = document.querySelector('.success');

  if (successElement) {
    main.removeChild(successElement);
  }

  document.removeEventListener('keydown', onEscKeydown);
};

const closeErrorMsg = () => {
  const main = document.querySelector('main');
  const errorElement = document.querySelector('.error');

  if (errorElement) {
    main.removeChild(errorElement);
  }

  document.removeEventListener('keydown', onEscKeydown);
};

const setSuccessResult = () => {
  const main = document.querySelector('main');
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  main.appendChild(successElement);

  successElement.addEventListener('click', () => {
    closeSuccessMsg();
  })

  document.addEventListener('keydown', onEscKeydown);
};

const setErrorResult = () => {
  const main = document.querySelector('main');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  main.appendChild(errorElement);

  errorElement.addEventListener('click', () => {
    closeErrorMsg();
  })

  document.addEventListener('keydown', onEscKeydown);
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(
      () => setSuccessResult(),
      () => setErrorResult(),
      formData,
    );
  });
}

adFormSubmit.addEventListener('click', () => {
  setUserFormSubmit();
});

const initForm = () => {
  syncRoomsAndCapacity();
  syncTypeAndPrice();
  setDefaultAttributes();
  deactivateForm();
};

initForm();

export {activateForm, updateCurentPinCoordinates, setUserFormSubmit, offersLabelsMap};
