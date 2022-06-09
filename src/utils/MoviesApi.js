class MoviesApi {
  constructor({ baseRoute }) {
    this.baseRoute = baseRoute;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies = () => {
    return fetch(`${this.baseRoute}`)
      .then(this._getResponseData);
  }
}

const fetchMovies = new MoviesApi({
  baseRoute: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default fetchMovies;