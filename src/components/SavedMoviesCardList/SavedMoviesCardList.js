import './SavedMoviesCardList.css';
import React from "react";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";

function SavedMoviesCardList() {
  return (
    <>
      <section className="movies movies_saved">
        <SavedMoviesCard/>
        <SavedMoviesCard/>
        <SavedMoviesCard/>
      </section>
    </>
  )
    ;
}

export default SavedMoviesCardList;
