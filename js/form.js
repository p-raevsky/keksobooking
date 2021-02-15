const propertyTypeElement = document.querySelector('#type');
const priceForNightElement = document.querySelector('#price');

const selectChangeTypeHandler = () => {
  switch (propertyTypeElement.value) {
    case 'bungalow':
      priceForNightElement.setAttribute('min', 0);
      priceForNightElement.setAttribute('placeholder', 0);
      break
    case 'flat':
      priceForNightElement.setAttribute('min', 1000);
      priceForNightElement.setAttribute('placeholder', 1000);
      break
    case 'house':
      priceForNightElement.setAttribute('min', 5000);
      priceForNightElement.setAttribute('placeholder', 5000);
      break
    case 'palace':
      priceForNightElement.setAttribute('min', 10000);
      priceForNightElement.setAttribute('placeholder', 10000);
      break
  }
};

propertyTypeElement.addEventListener('change', selectChangeTypeHandler);

const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const selectChangeTimeHandler = (firstTimeElement, secondTimeElement) => {
  firstTimeElement.value = secondTimeElement.value;
};

timeInElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeOutElement, timeInElement);
});

timeOutElement.addEventListener('change', () => {
  return selectChangeTimeHandler(timeInElement, timeOutElement);
});
