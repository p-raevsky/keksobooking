const Z_INDEX_VALUE = 1000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showMsg = (onCloseMsg, onKeydown, elementTemplate) => {
  const element = elementTemplate.cloneNode(true);
  element.style.zIndex = Z_INDEX_VALUE;

  main.appendChild(element);

  element.addEventListener('click', onCloseMsg);

  document.addEventListener('keydown', onKeydown);
};

export {
  successTemplate,
  errorTemplate,
  showMsg
};
