export const fetchMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies')
    .then(res => res.json());
};
