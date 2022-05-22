import React from "react";
import './Movies.css'
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { fetchMovies } from "../../utils/MoviesApi";
import { filterMovies, mergeMovies, removeMovieById, getCachedSearchState, setCachedSearchState } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";


function Movies(props) {
  const {loggedIn} = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchState, setSearchState] = React.useState(getCachedSearchState());

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function updateSearchState(searchParams, moviesRes, savedMoviesRes) {
    const filteredMovies = filterMovies(moviesRes, searchParams.searchQuery, searchParams.isShort);
    const displayMovies = mergeMovies(filteredMovies, savedMoviesRes.movies);
    const state = {...searchParams, displayMovies};
    setCachedSearchState(state);
    setSavedMovies(savedMoviesRes);
    setMovies(moviesRes);
    setSearchState(state);
  }

  function onSearchSubmit(searchParams) {
    const fetchMoviesPromise = movies ? Promise.resolve(movies) : fetchMovies();
    const fetchSavedMoviesPromise = savedMovies ? Promise.resolve(savedMovies) : mainApi.fetchSavedMovies();
    setIsLoading(true);
    Promise.all([fetchMoviesPromise, fetchSavedMoviesPromise])
      .then(([moviesRes, savedMoviesRes]) => {
        setIsLoading(false);
        updateSearchState(searchParams, moviesRes, savedMoviesRes);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      })
  }

  function onToggleSave(movie) {
    if (movie.isSaved) {
      const savedMovie = savedMovies.movies?.find(it => it.movieId === movie.id);
      if (savedMovie) {
        mainApi.removeMovie(savedMovie._id)
          .then(() => {
            const updatedSavedMovies = removeMovieById(savedMovies.movies, 'movieId', movie.id);
            updateSearchState({
              searchQuery: searchState.searchQuery,
              isShort: searchState.isShort,
            }, movies, { movies: updatedSavedMovies });
          })
          .catch(err => console.error(err));
      } else {
        console.error('Ничего не найдено :(');
      }
    } else {
      mainApi.saveMovie(movie)
        .then((res) => {
          const updatedSavedMovies = [...(savedMovies.movies || []), res.movie];
          updateSearchState({
            searchQuery: searchState.searchQuery,
            isShort: searchState.isShort,
          }, movies, { movies: updatedSavedMovies });
        })
        .catch(err => console.error(err));
    }
  }

  return (
    <>
      <Header currentPage="movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>
      <SearchForm
        defaultSearchQuery={searchState.searchQuery}
        defaultIsShort={searchState.isShort}
        onSubmit={onSearchSubmit}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <>
          {!!searchState.searchQuery && (!searchState.displayMovies || !searchState.displayMovies.length) && (
            <p className="movies__message">По вашему запросу ничего не найдено</p>
          )}
          {!!searchState.searchQuery && (!!searchState.displayMovies && !!searchState.displayMovies.length) && (
            <MoviesCardList currentPage="movies" movies={searchState.displayMovies} onToggleSave={onToggleSave}/>
          )}
        </>
      )}
      <Navigation isOpen={isOpen} onClose={handleClose}/>
      <Footer/>
    </>
  );
}

export default Movies;
