import { AUTH_PARAMS } from "./auth";

class Api {
  constructor(params) {
    this._params = params;
    this._queryParams = {
      credentials: 'include',
      headers: this._params.headers,
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._params.baseRoute}/users/me`, this._queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  patchUserInfo(name, email) {
    const queryParams = {
      ...this._queryParams,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        email: email
      })
    }
    return fetch(`${this._params.baseRoute}/users/me`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  signOut() {
    const queryParams = {
      ...this._queryParams,
      method: 'POST',
    }
    return fetch(`${this._params.baseRoute}/signout`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }
}

export const mainApi = new Api(AUTH_PARAMS);