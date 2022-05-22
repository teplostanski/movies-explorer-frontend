import './MoviesCardList.css';
import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { getInitialCardsCount, getMoreCardsCount } from "../../utils/utils";

function MoviesCardList(props) {
  const [cardsCount, setCardsCount] = React.useState(getInitialCardsCount());
  const { currentPage, movies, onToggleSave, onRemove } = props;
  const onMoreClick = () => setCardsCount(cardsCount + getMoreCardsCount());
  const displayMovies = movies.slice(0, cardsCount);
  return (
    <>
      <section className="movies">
        {displayMovies.map(i => <MoviesCard key={i.id} movie={i} onToggleSave={onToggleSave} onRemove={onRemove}/>)}
      </section>
      {(currentPage === 'movies' && cardsCount < movies.length) && (
      <div className="movies__more">
        <button className="movies__more-button" onClick={onMoreClick}>Еще</button>
      </div>
      )}
    </>
  );
}

export default MoviesCardList;
