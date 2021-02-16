import {createAd} from './data.js';
import {createSimilarAd} from './popup.js';

const map = document.querySelector('.map__canvas');
const similarAd = createSimilarAd(createAd());
map.appendChild(similarAd);
