import './popup.js';
import './form.js';
import './map.js';
import './api.js';

import {initMap, resetMainPin} from './map.js';
import {getData, sendData} from './api.js';
import {showAlert, isEscEvent, isEnterEvent} from './util.js';
import {defaultForm, activateForm, updateCurentPinCoordinates, resetFormData} from './form.js';
import {createSimilarAd} from './popup.js';

const adForm = document.querySelector('.ad-form');
const adFormButton = document.querySelector('.ad-form__submit');
const adFormReset =  document.querySelector('.ad-form__reset');

const resetPage = () => {
  resetFormData();
  resetMainPin();
}

const onEscEtnerKeydown = (evt) => {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    closeSuccessMsg();
    closeErrorMsg();
  }
};

const closeSuccessMsg = () => {
  const successElement = document.querySelector('.success');

  if (successElement) {
    successElement.remove();
  }

  document.removeEventListener('keydown', onEscEtnerKeydown);
};

const closeErrorMsg = () => {
  const errorElement = document.querySelector('.error');

  if (errorElement) {
    errorElement.remove();
  }

  document.removeEventListener('keydown', onEscEtnerKeydown);
};

const setSuccessResult = () => {
  const main = document.querySelector('main');
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  successElement.style.zIndex = 1000;

  main.appendChild(successElement);

  successElement.addEventListener('click', () => {
    closeSuccessMsg();
  });
  document.addEventListener('keydown', onEscEtnerKeydown);

  resetPage();
};

const setErrorResult = () => {
  const main = document.querySelector('main');
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.style.zIndex = 1000;

  main.appendChild(errorElement);

  errorElement.addEventListener('click', () => {
    closeErrorMsg();
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
