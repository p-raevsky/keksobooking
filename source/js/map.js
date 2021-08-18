import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {createSimilarAd} from './popup.js';

const FLOAT_NUMBER = 5;

const defaultMapSettings = {
  coordinates: {
    lat: 35.68038,
    lng: 139.76906,
  },
  scale: 10,
  mainPin: {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
  marker: {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
};

const mainPinIcon = L.icon(defaultMapSettings.mainPin);

const createMap = (onMapLoad) => {
  return L.map('map-canvas')
    .on('load', onMapLoad)
    .setView(
      defaultMapSettings.coordinates,
      defaultMapSettings.scale,
    );
};

const marker = L.marker(
  {
    lat: defaultMapSettings.coordinates.lat,
    lng: defaultMapSettings.coordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
  {
    riseOnHover: true,
  },
);

const initMainPin = (setPinCoordinates) => {
  setPinCoordinates(defaultMapSettings.coordinates.lat, defaultMapSettings.coordinates.lng);

  marker.on('move', (evt) => {
    const x = evt.target.getLatLng().lat.toFixed(FLOAT_NUMBER);
    const y = evt.target.getLatLng().lng.toFixed(FLOAT_NUMBER);
    setPinCoordinates(x, y);
  });
};

const resetMainPin = () => {
  marker.setLatLng({
    lat: defaultMapSettings.coordinates.lat,
    lng: defaultMapSettings.coordinates.lng,
  });
};

const markers = [];

const createSimilarPins = (elements, map) => {
  elements.forEach((element) => {
    const icon = L.icon(defaultMapSettings.marker);

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

    markers.push(marker);
  });
};

const removePins = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
};

const adPins = (map) => {
  markers.forEach((marker) => {
    marker.addTo(map);
  });
};

const initMap = (elements, onMapLoad, setPinCoordinates) => {
  const map = createMap(onMapLoad);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  marker.addTo(map);

  initMainPin(setPinCoordinates);
  createSimilarPins(elements, map);

  return map;
};

const updateMap = (elements, map) => {
  map.setView(
    defaultMapSettings.coordinates,
    defaultMapSettings.scale,
  );
  removePins();
  createSimilarPins(elements, map);
};

export {
  defaultMapSettings,
  markers,
  initMap,
  resetMainPin,
  removePins,
  adPins,
  updateMap
};
