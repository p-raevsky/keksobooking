/* global L:readonly */

import {makesActiveFormHandler} from './form.js';

const centerPointCoordinates = {
  lat: 35.68169,
  lng: 139.76846,
}

const map = L.map('map-canvas')
  .on('load', () => {
    makesActiveFormHandler();
  })
  .setView({
    lat: centerPointCoordinates.lat,
    lng: centerPointCoordinates.lng,
  }, 10)

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
