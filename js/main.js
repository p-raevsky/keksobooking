import './popup.js';
import './form.js';
import './map.js';
import './api.js';

import {createSimilarPins} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

getData(createSimilarPins, showAlert);
