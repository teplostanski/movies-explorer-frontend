import './Movies.css';
import React from "react";
import photoPath from '../../images/author-photo/photo.jpg';
import Portfolio from "../Portfolio/Portfolio";
import SearchForm from "../SearchForms/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";


function Movies() {
  return (
    <>
      <SearchForm/>
      <MoviesCardList/>
      <Navigation isOpen={true}/>
    </>
  );
}

export default Movies;
