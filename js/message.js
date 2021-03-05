const Z_INDEX_VALUE = 1000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const createSuccessMsg = () => {
  const successElement = successTemplate.cloneNode(true);
  successElement.style.zIndex = Z_INDEX_VALUE;

  main.appendChild(successElement);

  return successElement;
};

const createErrorMsg = () => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.style.zIndex = Z_INDEX_VALUE;

  main.appendChild(errorElement);

  return errorElement;
};

const showSuccessMsg = (onCloseMsg, onKeydown) => {
  const element = createSuccessMsg();

  element.addEventListener('click', onCloseMsg);

  document.addEventListener('keydown', onKeydown);
};

const showErrorMsg = (onCloseMsg, onKeydown) => {
  const element = createErrorMsg();

  element.addEventListener('click', onCloseMsg);

  document.addEventListener('keydown', onKeydown);
};

export {showSuccessMsg, showErrorMsg};
