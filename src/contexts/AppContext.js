import * as React from 'react';
import { removeMovieById, setCachedSearchState } from "../utils/utils";

export const reducer = (state, action) => {
  switch (action.type) {
    case "setIsLoading":
      return {...state, isLoading: action.payload.isLoading};
    case "savedMoviesLoaded":
      return {...state, savedMovies: action.payload.savedMovies, isLoading: false };
    case "onSearchFormSubmit":
      return {
        ...state,
        isLoading: false,
        movies: action.payload.movies,
        savedMovies: action.payload.savedMovies,
        searchParams: action.payload.searchParams
      };
    case "saveMovie":
      return {
        ...state,
        savedMovies: {movies: [...(state.savedMovies?.movies || []), action.payload.movie]}
      };
    case "unSaveMovie":
      return {
        ...state,
        savedMovies: {movies: removeMovieById(state.savedMovies?.movies, 'movieId', action.payload.movieId)}
      };
    default:
      return state;
  }
};

export const reducerWithLocalStorage = (state, action) => {
  const newState = reducer(state, action);
  setCachedSearchState(newState);
  return newState;
};

export const AppContext = React.createContext({});

export const useAppContext = () => React.useContext(AppContext);
