import { AUTH_PARAMS } from "./auth";
import { getMovieImageUrl } from "./utils";

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

  fetchSavedMovies() {
    return fetch(`${this._params.baseRoute}/movies`, this._queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  saveMovie(movie) {
    const queryParams = {
      ...this._queryParams,
      method: 'POST',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: getMovieImageUrl(movie.image.url),
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.trailerLink,
        movieId: movie.id,
      })
    }
    return fetch(`${this._params.baseRoute}/movies`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }

  removeMovie(id) {
    const queryParams = {
      ...this._queryParams,
      method: 'DELETE',
    }
    return fetch(`${this._params.baseRoute}/movies/${id}`, queryParams)
      .then(res => {
        return this._getResponseData(res)
      });
  }
}

export const mainApi = new Api( AUTH_PARAMS );
