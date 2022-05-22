function getScreenWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

export function mergeMovies(movies, savedMovies) {
  if (movies) {
    if (savedMovies) {
      return movies.map(it => {
        const isSaved = savedMovies.find(savedMovie => savedMovie.movieId === it.id);
        return { ...it, isSaved: isSaved };
      });
    }
    return movies;
  }
  return null
}

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

export function removeMovieById(movies, key, id) {
  const index = movies?.findIndex(it => it[key] === id) || -1;
  if (index === -1) {
    return movies;
  } else {
    const result = [...movies];
    result.splice(index, 1);
    return result;
  }
}

export function getInitialCardsCount() {
  const screenWidth = getScreenWidth();
  if (screenWidth < 720) return 5;
  if (screenWidth < 890) return 8;
  return 12;
}

export function getMoreCardsCount() {
  const screenWidth = getScreenWidth();
  if (screenWidth <= 720) return 1;
  if (screenWidth <= 890) return 2;
  if (screenWidth <= 1180) return 3;
  return 3;
}

export function getCachedSearchState() {
  try {
    const serializedState = localStorage.getItem('searchState');
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function setCachedSearchState(state) {
  try {
    localStorage.setItem('searchState', JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
}

export function clearCachedSearchState() {
  try {
    localStorage.removeItem('searchState');
  } catch (err) {
    console.error(err);
  }
}
