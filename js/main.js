import './popup.js';
import './form.js';
import './map.js';
import './api.js';

import {initMap, resetMainPin, DEFAULT_MAP_SETTINGS, removePins, adPins} from './map.js';
import {getData, sendData} from './api.js';
import {showAlert, isEscEvent, isEnterEvent} from './util.js';
import {defaultForm, activateForm, updateCurentPinCoordinates, resetFormData, adForm, adFormButton, adFormReset} from './form.js';
import {createSimilarAd, createSuccessMsg, createErrorMsg} from './popup.js';

let curentMap;

const onEscEtnerKeydown = (evt) => {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    closeMsg();
  }
};

const closeMsg = () => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  if (successElement) {
    successElement.remove();
  }

  if (errorElement) {
    errorElement.remove();
  }

  document.removeEventListener('keydown', onEscEtnerKeydown);
};

const setSuccessResult = () => {
  const element = createSuccessMsg();

  element.addEventListener('click', () => {
    closeMsg();
  });
  document.addEventListener('keydown', onEscEtnerKeydown);

  resetPage();
};

const setErrorResult = () => {
  const element = createErrorMsg();

  element.addEventListener('click', () => {
    closeMsg();
  });
  document.addEventListener('keydown', onEscEtnerKeydown);
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    setSuccessResult,
    setErrorResult,
    formData,
  );

  adForm.removeEventListener('submit', onAdFormSubmit);
};

const onAdFormButtonClick = () => {
  adForm.addEventListener('submit', onAdFormSubmit);
};

const loadMap = () => {
  getData(showAlert).then(data => {
    defaultForm();
    curentMap = initMap(data, activateForm, updateCurentPinCoordinates, createSimilarAd);
  });
};

const resetPage = () => {
  resetFormData();
  resetMainPin();
  curentMap.setView(
    DEFAULT_MAP_SETTINGS.coordinates,
    DEFAULT_MAP_SETTINGS.scale,
  );
  removePins();
  adPins(curentMap);
};

loadMap();

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

adFormButton.addEventListener('click', onAdFormButtonClick);
