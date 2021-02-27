const ALERT_SHOW_TIME = 5000;
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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = alertValues.zIndex;
  alertContainer.style.position = alertValues.position;
  alertContainer.style.left =alertValues.left;
  alertContainer.style.top =alertValues.top;
  alertContainer.style.right =alertValues.right;
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
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

export {showAlert, isEscEvent, isEnterEvent};
