import './map.js';
import './popup.js';
import './form.js';
import './api.js';

import {createSimilarPins} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initForm} from './form.js';

initForm();
getData(createSimilarPins, showAlert);
