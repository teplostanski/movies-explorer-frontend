import './MoviesCardList.css';
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { movies } = props;
  return (
    <>
      <section className="movies">
        {movies.map(i => <MoviesCard key={i.id} movie={i} />)}
      </section>
      <div className="movies__more">
        <button className="movies__more-button">Еще</button>
      </div>
    </>
  );
}

export default MoviesCardList;
