const getRandomArrayElement = function(elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

const getRandomNumberFloat = function(minNumber, maxNumber, float = 0) {
  return +((Math.random() * (maxNumber - minNumber) + minNumber).toFixed(float));
};

const getArrayRendomLength = function(elements) {
  return (elements.slice(Math.floor(Math.random() * elements.length)));
};

export {getRandomArrayElement, getRandomNumberFloat, getArrayRendomLength};
