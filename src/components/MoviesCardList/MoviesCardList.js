import './MoviesCardList.css';
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { movies, onToggleSave, onRemove } = props;
  return (
    <>
      <section className="movies">
        {movies.map(i => <MoviesCard key={i.id} movie={i} onToggleSave={onToggleSave} onRemove={onRemove}/>)}
      </section>
      <div className="movies__more">
        <button className="movies__more-button">Еще</button>
      </div>
    </>
  );
}

export default MoviesCardList;
