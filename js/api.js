const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let { status, statusText } = response;
  throw new Error(`${status} - ${statusText}`);
}

export function getData(onSuccess, onFail) {
  fetch(GET_URL, {
    method: 'GET',
  })
    .then((response) => checkResponse(response))
    .then((data) => onSuccess(data))
    .catch((error) => {
      onFail ? onFail(error) : alert('Ошибка при загрузке данных');
    });
}

export function postData(body, onSuccess, onFail) {
  fetch(POST_URL, {
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
