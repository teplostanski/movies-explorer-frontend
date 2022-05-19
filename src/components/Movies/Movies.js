import React from "react";
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import {fetchMovies} from "../../utils/MoviesApi";
import { filterMovies } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";


function Movies(props) {
  const { loggedIn } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({});
  const [movies, setMovies] = React.useState(null);
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
    setSearchParams(searchParams);
  }

  console.log('good', searchParams.searchQuery, searchParams.isShort);
  const displayMovies = filterMovies(movies, searchParams.searchQuery, searchParams.isShort);

  return (
    <>
      <Header currentPage="movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>
      <SearchForm onSubmit={onSearchSubmit}/>
      {isLoading ? (
        <Preloader/>
      ) : (
        <>
          {!!searchParams.searchQuery && !movies && (
            <div>Ничего не найдено</div>
          )}
          {!!searchParams.searchQuery && !!movies && (
            <MoviesCardList movies={displayMovies}/>
          )}
        </>
      )}
      <Navigation isOpen={isOpen} onClose={handleClose} />
      <Footer/>
    </>
  );
}

export default Movies;
