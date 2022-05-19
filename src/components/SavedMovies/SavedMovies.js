import React from "react";
import SearchForm from "../SearchForms/SearchForm";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Footer from "../Footer/Footer";


function SavedMovies(props) {
  const { loggedIn } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  function handleOpen() {
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
      <Header currentPage="saved-movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>
      <SearchForm/>
      <SavedMoviesCardList/>
      <Navigation isOpen={isOpen} onClose={handleClose} />
      <Footer/>
    </>
  );
}

export default SavedMovies;
