class Api {
  constructor({ baseRoute }) {
    this.baseRoute = baseRoute;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  getUserInfo() {
    return fetch(`${this.baseRoute}/users/me`, {
      headers: {
        authorization: this.getToken()
      }
    })
      .then(this._getResponseData);
  }

  patchUserInfo(data) {
    return fetch(`${this.baseRoute}/users/me`, {
      method: 'PATCH',
      headers: {
          authorization: this.getToken(),
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(this._getResponseData)
  }

  fetchSavedMovies() {
    return fetch(`${this.baseRoute}/movies`, {
      headers: {
        authorization: this.getToken()
      }
    })
      .then(this._getResponseData);
  }

  saveMovie(movie) {
    return fetch(`${this.baseRoute}/movies`, {
      method: 'POST',
      headers: {
        authorization: this.getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movie.country || '',
        director: movie.director || '',
        duration: movie.duration || '',
        year: movie.year || '',
        description: movie.description || '',
        image: `https://api.nomoreparties.co${movie.image.url}` || '',
        trailerLink: movie.trailerLink || '',
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}` || '',
        movieId: movie.id,
        nameRU: movie.nameRU || '',
        nameEN: movie.nameEN || '',
      })
    })
      .then(this._getResponseData);
}

  removeMovie(id) {
    return fetch(`${this.baseRoute}/movies/${id._id}`, {
      method: 'DELETE',
      headers: {
        authorization: this.getToken(),
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return this._getResponseData(res)
      });
  }

  checkToken() {
    return fetch(`${this.baseRoute}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.getToken()
      }
    })
      .then(this._getResponseData)
  }
}

export const mainApi = new Api({
  baseRoute: 'http://localhost:3000',
});
