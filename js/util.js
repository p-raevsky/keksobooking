import {debounce} from 'lodash';

const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

const alertValues = {
  zIndex: 1000,
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'rgb(255, 0, 0, 0.8)',
  color:'white',
};

const alertContainer = document.createElement('div');

const showAlert = (message) => {
  alertContainer.style.zIndex = alertValues.zIndex;
  alertContainer.style.position = alertValues.position;
  alertContainer.style.left = alertValues.left;
  alertContainer.style.top = alertValues.top;
  alertContainer.style.right = alertValues.right;
  alertContainer.style.padding = alertValues.padding;
  alertContainer.style.fontSize = alertValues.fontSize;
  alertContainer.style.textAlign = alertValues.textAlign;
  alertContainer.style.backgroundColor = alertValues.backgroundColor;
  alertContainer.style.color = alertValues.color;

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const syncSelectValues = (firstTimeElement, secondTimeElement) => firstTimeElement.value = secondTimeElement.value;

const isAny = (selectedItem, any) => selectedItem === any;

const compareItems = (selectedItem, any, adItem) => {
  const isMatched = Number(selectedItem) === adItem;

  return isAny(selectedItem, any) || isMatched;
};

const delayBounce = (debouncedItem) => debounce(debouncedItem, RERENDER_DELAY);

export {
  showAlert,
  isEscEvent,
  isEnterEvent,
  disableElements,
  enableElements,
  syncSelectValues,
  compareItems,
  isAny,
  delayBounce
};
