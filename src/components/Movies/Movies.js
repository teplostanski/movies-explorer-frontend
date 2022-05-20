import React from "react";
import './Movies.css'
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { fetchMovies } from "../../utils/MoviesApi";
import { filterMovies, mergeMovies, removeMovieById } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";
import { mainApi } from "../../utils/MainApi";


function Movies(props) {
  const {loggedIn} = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({});
  const [movies, setMovies] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  function onSearchSubmit(searchParams) {
    if (!movies) {
      setIsLoading(true);
      fetchMovies()
        .then(res => {
          setIsLoading(false);
          setMovies(res);
        }).catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    }

    if (!savedMovies) {
      mainApi.fetchSavedMovies()
        .then((res) => setSavedMovies(res.movies || []))
        .catch((err) => {
          console.error(err)
        })
    }

    setSearchParams(searchParams);
  }

  function onToggleSave(movie) {
    if (movie.isSaved) {
      const savedMovie = savedMovies.find(it => it.movieId === movie.id);
      if (savedMovie) {
        mainApi.removeMovie(savedMovie._id)
          .then(() => setSavedMovies(removeMovieById(savedMovies, 'movieId', movie.id)))
          .catch(err => console.error(err));
      } else {
        console.error('Ничего не найдено :(');
      }
    } else {
      mainApi.saveMovie(movie)
        .then((res) => setSavedMovies([...savedMovies, res.movie]))
        .catch(err => console.error(err));
    }
  }

  const filteredMovies = filterMovies(movies, searchParams.searchQuery, searchParams.isShort);
  const displayMovies = mergeMovies(filteredMovies, savedMovies);

  return (
    <>
      <Header currentPage="movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>
      <SearchForm onSubmit={onSearchSubmit}/>
      {isLoading ? (
        <Preloader/>
      ) : (
        <>
          {!!searchParams.searchQuery && (!displayMovies || !displayMovies.length) && (
            <p className="movies__message">По вашему запросу ничего не найдено</p>
          )}
          {!!searchParams.searchQuery && (!!displayMovies && !!displayMovies.length) && (
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
