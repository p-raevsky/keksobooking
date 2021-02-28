import './popup.js';
import './form.js';
import './map.js';
import './api.js';

import {initMap, resetMainPin} from './map.js';
import {getData, sendData} from './api.js';
import {showAlert, isEscEvent, isEnterEvent} from './util.js';
import {defaultForm, activateForm, updateCurentPinCoordinates, resetFormData, adForm, adFormButton, adFormReset} from './form.js';
import {createSimilarAd, createSuccessMsg, createErrorMsg} from './popup.js';

const resetPage = () => {
  resetFormData();
  resetMainPin();
}

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
}

getData(showAlert).then(data => {
  defaultForm();
  initMap(data, activateForm, updateCurentPinCoordinates, createSimilarAd);
});

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

adFormButton.addEventListener('click', onAdFormButtonClick);
