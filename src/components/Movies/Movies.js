import React from "react";
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";


function Movies() {
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
      <Header currentPage="movies" isLoggedIn={true} onMenuClick={handleOpen}/>
      <SearchForm/>
      <MoviesCardList/>
      <Navigation isOpen={isOpen} onClose={handleClose} />
      <Footer/>
    </>
  );
}

export default Movies;
