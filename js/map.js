/* global L:readonly */

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

const createtMap = (onLoadMap) => {
  return L.map('map-canvas')
    .on('load', onLoadMap)
    .setView({
      lat: centerPointCoordinates.lat,
      lng: centerPointCoordinates.lng,
    }, 10);
};

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

const initMainPin = (setPinCoordinates) => {
  setPinCoordinates(centerPointCoordinates['lat'], centerPointCoordinates['lng']);

  marker.on('move', (evt) => {
    const x = evt.target.getLatLng().lat.toFixed(FLOAT_NUMBER);
    const y = evt.target.getLatLng().lng.toFixed(FLOAT_NUMBER);
    setPinCoordinates(x, y);
  });
};

const resetMainPin = () => {
  marker.setLatLng({
    lat: centerPointCoordinates.lat,
    lng: centerPointCoordinates.lng,
  });
};

const createSimilarPins = (elements, createAd, map) => {
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
        createAd(element),
        {
          keepInView: true,
        },
      );
  });
};

const initMap = (elements, onLoadMap, setPinCoordinates, createAd) => {
  const map = createtMap(onLoadMap)

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  marker.addTo(map);

  initMainPin(setPinCoordinates);
  createSimilarPins(elements, createAd, map);
};

export {initMap, resetMainPin};
