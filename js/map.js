/* global L:readonly */

import {makesActiveFormHandler} from './form.js';
import {createAd} from './data.js';
import {createSimilarAd} from './popup.js';


const FLOAT_NUMBER = 5;
const SIMILAR_AD_COUNT = 10;

const centerPointCoordinates = {
  lat: 35.68038,
  lng: 139.76906,
};
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas')
  .on('load', () => {
    makesActiveFormHandler();
  })
  .setView({
    lat: centerPointCoordinates.lat,
    lng: centerPointCoordinates.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: centerPointCoordinates.lat,
    lng: centerPointCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
  {
    riseOnHover: true,
  },
);

marker.addTo(map);

const addressFildFormElement = document.querySelector('#address');
addressFildFormElement.value = `${centerPointCoordinates.lat}, ${centerPointCoordinates.lng}`;
addressFildFormElement.setAttribute('readonly', true);

marker.on('moveend', (evt) => {
  const x = evt.target.getLatLng().lat.toFixed(FLOAT_NUMBER);
  const y = evt.target.getLatLng().lng.toFixed(FLOAT_NUMBER);
  addressFildFormElement.value = `${x}, ${y}`;
});

const similarAds = new Array(SIMILAR_AD_COUNT).fill().map(() => createAd());

const createSimilarPin = (elements) => {
  elements.forEach((element) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: element.location.x,
        lng: element.location.y,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createSimilarAd(element),
        {
          keepInView: true,
        },
      );
  });
};

createSimilarPin(similarAds);
