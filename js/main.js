import './popup.js';
import './form.js';
import './map.js';
import './api.js';

import {initMap} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {defaultForm, activateForm, updateCurentPinCoordinates} from './form.js';
import {createSimilarAd} from './popup.js';

getData(showAlert).then(data => {
  defaultForm();
  initMap(data, activateForm, updateCurentPinCoordinates, createSimilarAd);
});
