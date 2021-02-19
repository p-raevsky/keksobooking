import {createSimilarPin} from './map.js';
import {createAd} from './data.js';

const SIMILAR_AD_COUNT = 10;

const similarAds = new Array(SIMILAR_AD_COUNT).fill().map(() => createAd());

createSimilarPin(similarAds);
