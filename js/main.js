/* Функция на получение числа из диапазона чисел включительно с ними, при условии, что диапазон может быть только положительный, включая ноль.
Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

// Функция, для получения целого числа.

const getRandomNumber = function(minNumber, maxNumber) {
  if (minNumber >= 0 && maxNumber >= 0) {
    minNumber = Math.ceil(minNumber);
    maxNumber = Math.floor(maxNumber);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  } else {
    alert('Введите значения в диапазоне большие или равные нулю');
  }
}

alert(getRandomNumber(0, 100));

// Функция, для получения числа с плавающей точкой с заданным количеством знаков, после запятой.

const getRandomNumberPoint = function(minNumber, maxNumber, numbersAfterPoint) {
  if (minNumber >= 0 && maxNumber >= 0) {
    return Math.floor((Math.random() * (maxNumber - minNumber) + minNumber) * (10 ** numbersAfterPoint)) / (10 ** numbersAfterPoint);
  } else {
    alert('Введите значения в диапазоне большие или равные нулю');
  }
}

alert(getRandomNumberPoint(0, 100, 3));
