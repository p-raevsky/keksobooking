import './api.js';
import './popup.js';
import './form.js';
import './map.js';
import './message.js';

import {initMap, resetMainPin, defaultMapSettings, removePins, adPins, updateMap} from './map.js';
import {getData, sendData} from './api.js';
import {showAlert, isEscEvent, isEnterEvent} from './util.js';
import {deactivateForm, activateForm, updateCurentPinCoordinates, resetFormData, adForm, adFormReset, filterData, mapFilter} from './form.js';
import {showSuccessMsg, showErrorMsg} from './message.js';

const SIMILAR_AD_COUNT = 10;

let curentMap;
let curentData;

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt) || isEnterEvent(evt)) {
    evt.preventDefault();
    closeMsg(onDocumentKeydown);
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

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(
    () => {
      showSuccessMsg(closeMsg, onDocumentKeydown);
      resetPage();
    },
    () => showErrorMsg(closeMsg, onDocumentKeydown),
    formData,
  );
};

const loadMap = () => {
  getData(showAlert).then(data => {
    deactivateForm();
    curentData = data;
    curentMap = initMap(data, activateForm, updateCurentPinCoordinates);
  });
};

const resetPage = () => {
  resetFormData();
  resetMainPin();
  curentMap.setView(
    defaultMapSettings.coordinates,
    defaultMapSettings.scale,
  );
  removePins();
  adPins(curentMap);
};

loadMap();

adForm.addEventListener('submit', onAdFormSubmit);

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

mapFilter.addEventListener('change', (evt) => {
  // debugger;
  if (evt.target.matches('[id^="housing"]')) {
    console.log(curentData);
    const filteredData = filterData(curentData)
      .slice(0, SIMILAR_AD_COUNT);

    updateMap(filteredData, curentMap);
  }
});
