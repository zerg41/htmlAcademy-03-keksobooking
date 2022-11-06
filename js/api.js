const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  let { status, statusText } = response;
  return new Error(`${status} - ${statusText}`);
}

export function getData(onSuccess, onFail) {
  fetch(GET_URL, {
    method: 'GET',
  })
    .then((response) => checkResponse(response))
    .then((data) => {
      onSuccess && onSuccess(data);
    })
    .catch((error) =>
      onFail ? onFail(error) : alert('Ошибка при загрузке данных:\n' + error)
    );
}

export function postData(body, onSuccess, onFail) {
  fetch(POST_URL, {
    method: 'POST',
    body,
  })
    .then((response) => checkResponse(response))
    .then((data) => {
      onSuccess && onSuccess(data);
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}
