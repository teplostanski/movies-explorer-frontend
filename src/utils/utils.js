export function filterMovies(movies, keyword, isShort) {
  if (movies) {
    const result = [];
    movies.forEach(it => {
      const isPassKeywordFilter = isPassingKeywordFilter(it, keyword);
      const isPassingDurationFilter = !isShort || it.duration <= 40;
      if (isPassKeywordFilter && isPassingDurationFilter) {
        result.push(it);
      }
    });
    return result;
  }
  return null;
}

function isPassingKeywordFilter(movie, keyword) {
  const keys = Object.keys(movie);
  for (let i = 0, count = keys.length; i < count; i++) {
    const key = keys[i];
    const value = movie[key];
    if (typeof value === 'string' && value.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}

export function getMovieImageUrl(path) {
  return `https://api.nomoreparties.co/${path}`;
}

export function timeMovie(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}ч${minutes}м`
}