//const baseRoute = 'https://api.diplom.nomoredomains.xyz';
const baseRoute = 'http://localhost:3000';

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function register ({ name, password, email }) {
  return fetch(`${baseRoute}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, password, email })
  })
    .then(getResponseData);
}

export function authorize({ password, email }) {
    return fetch(`${baseRoute}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
    })
      .then(getResponseData);
  }
