const SIMILAR_AD_COUNT = 10;
const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';
const ON_FAIL_MSG = 'Не удалось загрузить данные. Попробуйте обновить страницу';

const getData = (onFail) => {
  return fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((ads) => {
      return ads.slice(0, SIMILAR_AD_COUNT);
    })
    .catch(() => {
      onFail(ON_FAIL_MSG);
    });
};

const sendData = (onSuccess, onFail, data) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
