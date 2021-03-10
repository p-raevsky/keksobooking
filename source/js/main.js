import {
  initMap,
  resetMainPin,
  defaultMapSettings,
  removePins,
  adPins,
  updateMap
} from './map.js';
import {
  getData,
  sendData
} from './api.js';
import {
  showAlert,
  isEscEvent,
  isEnterEvent,
  delayBounce
} from './util.js';
import {
  deactivateForm,
  activateForm,
  updateCurentPinCoordinates,
  resetFormData,
  adForm,
  adFormReset,
  filterData,
  mapFilter,
  syncFormFields
} from './form.js';
import {
  successTemplate,
  errorTemplate,
  showMsg
} from './message.js';
import {resetPhotoPreview} from './upload-picture.js';

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
      showMsg(closeMsg, onDocumentKeydown, successTemplate);
      resetPage();
    },
    () => showMsg(closeMsg, onDocumentKeydown, errorTemplate),
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
  resetPhotoPreview();
};

const onMapFilterChange = delayBounce(() => {
  const filteredData = filterData(curentData)
    .slice(0, SIMILAR_AD_COUNT);

  updateMap(filteredData, curentMap);
});

loadMap();
syncFormFields();

adForm.addEventListener('submit', onAdFormSubmit);

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

mapFilter.addEventListener('change', onMapFilterChange);
