import React from "react";
import './Movies.css'
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { fetchMovies } from "../../utils/MoviesApi";
import { filterMovies, mergeMovies } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";
import { useAppContext } from "../../contexts/AppContext";


function Movies(props) {
  const { state: { isLoading, movies, savedMovies, searchParams }, dispatch } = useAppContext();
  const { searchQuery, isShort } = (searchParams || {});

  const {loggedIn} = props;
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function onSearchSubmit(searchParams) {
    const fetchMoviesPromise = movies ? Promise.resolve(movies) : fetchMovies();
    const fetchSavedMoviesPromise = savedMovies ? Promise.resolve(savedMovies) : mainApi.fetchSavedMovies();
    dispatch({ type: 'setIsLoading', payload: { isLoading: true }});
    Promise.all([fetchMoviesPromise, fetchSavedMoviesPromise])
      .then(([moviesRes, savedMoviesRes]) => {
        dispatch({ type: 'onSearchFormSubmit', payload: { movies: moviesRes, savedMovies: savedMoviesRes, searchParams }});
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: 'setIsLoading', payload: { isLoading: false }});
      })
  }

  function onToggleSave(movie) {
    if (movie.isSaved) {
      const savedMovie = savedMovies?.movies?.find(it => it.movieId === movie.id);
      if (savedMovie) {
        mainApi.removeMovie(savedMovie._id)
          .then(() => dispatch({ type: 'unSaveMovie', payload: { movieId: movie.id }}))
          .catch(err => console.error(err));
      } else {
        console.error('Ничего не найдено :(');
      }
    } else {
      mainApi.saveMovie(movie)
        .then((res) => dispatch({ type: 'saveMovie', payload: { movie: res.movie }}))
        .catch(err => console.error(err));
    }
  }

  const filteredMovies = filterMovies(movies, searchQuery, isShort);
  const displayMovies = mergeMovies(filteredMovies, savedMovies?.movies);

  return (
    <>
      <Header currentPage="movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>
      <SearchForm
        defaultSearchQuery={searchQuery}
        defaultIsShort={isShort}
        onSubmit={onSearchSubmit}
      />
      {isLoading ? (
        <Preloader/>
      ) : (
        <>
          {!!searchQuery && (!displayMovies || !displayMovies.length) && (
            <p className="movies__message">По вашему запросу ничего не найдено</p>
          )}
          {!!searchQuery && (!!displayMovies && !!displayMovies.length) && (
            <MoviesCardList currentPage="movies" movies={displayMovies} onToggleSave={onToggleSave}/>
          )}
        </>
      )}
      <Navigation isOpen={isOpen} onClose={handleClose}/>
      <Footer/>
    </>
  );
}

export default Movies;
