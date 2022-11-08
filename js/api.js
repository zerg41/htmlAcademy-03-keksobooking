const Url = Object.freeze({
  GET_OFFERS: 'https://23.javascript.pages.academy/keksobooking/data',
  POST_OFFER: 'https://23.javascript.pages.academy/keksobooking',
});

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let { status, statusText } = response;
  throw new Error(`${status} - ${statusText}`);
}

export function getData(onSuccess, onFail) {
  fetch(Url.GET_OFFERS, {
    method: 'GET',
  })
    .then((response) => checkResponse(response))
    .then((data) => onSuccess(data))
    .catch((error) => {
      onFail ? onFail(error) : alert('Ошибка при загрузке данных c сервера');
    });
}

export function postData(body, onSuccess, onFail) {
  fetch(Url.POST_OFFER, {
    method: 'POST',
    credentials: 'same-origin',
    body,
  })
    .then((response) => checkResponse(response))
    .then((data) => onSuccess(data))
    .catch((error) => {
      onFail ? onFail(error) : alert('Не удалось отправить форму');
    });
}
