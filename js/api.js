const SIMILAR_AD_COUNT = 10;

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads.slice(0, SIMILAR_AD_COUNT));
    })
    .catch(() => {
      onFail('Не удалось загрузить данные. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, data) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
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
