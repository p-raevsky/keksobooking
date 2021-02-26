/* global L:readonly */

import {createSimilarAd} from './popup.js';
import {activateForm, updateCurentPinCoordinates} from './form.js';


const FLOAT_NUMBER = 5;

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
    setTimeout(activateForm, 0);
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

const initMainPin = () => {
  updateCurentPinCoordinates(centerPointCoordinates['lat'], centerPointCoordinates['lng']);

  marker.on('move', (evt) => {
    let x = evt.target.getLatLng().lat.toFixed(FLOAT_NUMBER);
    let y = evt.target.getLatLng().lng.toFixed(FLOAT_NUMBER);
    updateCurentPinCoordinates(x, y);
  });
};

const createSimilarPins = (elements) => {
  elements.forEach((element) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
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

initMainPin();

export {createSimilarPins};
