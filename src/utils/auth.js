const API_URL = 'https://api.diplom.nomoredomains.xyz';

export const AUTH_PARAMS = {
  baseRoute: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}


const noAuthHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const register = (name, email, password) => {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: noAuthHeaders,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    credentials: 'include',
  }).then(res => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    console.log(res)
    return res.json();
  }).then(body => {
    if (body.error) {
      return {error: body.error};
    }
    if (body.message) {
      return {error: body.message};
    }
    return {email: body.user.email};
  });
};

export const authorize = (email, password) => {
  return fetch(`${API_URL}/signin`, {
    method: 'POST',
    headers: noAuthHeaders,
    body: JSON.stringify({email, password}),
    credentials: 'include',
  })
    .then((response => {
      if (response.status === 401) {
        return {error: "Вы ввели некорректный email или пароль"};
      }
      if (response.status === 400) {
        return {error: "Убедитесь, что email и пароль указаны верно"};
      }
    }));
};

export const checkToken = () => {
  return fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return data
    });
}