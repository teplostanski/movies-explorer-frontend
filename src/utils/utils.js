function getScreenWidth() {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

export function mergeMovies(movies, savedMovies) {
  if (movies) {
    if (savedMovies) {
      return movies.map(it => {
        const isSaved = savedMovies.find(savedMovie => savedMovie.movieId === it.id);
        return { ...it, isSaved: !!isSaved };
      });
    }
    return movies;
  }
  return movies
}
export const filterMovies = (arr, str) => {
  const filteredMovies = arr.filter((item) => {
    const nameRuToLowerCase = item.nameRU.toLowerCase();
    const searchMessageToLowerCase = str.toLowerCase();
    return nameRuToLowerCase.includes(searchMessageToLowerCase);
  })
  return filteredMovies;
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
  const index = movies?.findIndex(it => it[key] === id) ?? -1;
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

//export function getCachedSearchState() {
//  try {
//    const serializedState = localStorage.getItem('searchState');
//    return serializedState ? JSON.parse(serializedState) : {};
//  } catch (e) {
//    console.error(e);
//    return null;
//  }
//}

//export function setCachedSearchState(state) {
//  try {
//    localStorage.setItem('searchState', JSON.stringify(state));
//  } catch (err) {
//    console.error(err);
//  }
//}

//export function clearCachedSearchState() {
//  try {
//    localStorage.removeItem('searchState');
//  } catch (err) {
//    console.error(err);
//  }
//}
