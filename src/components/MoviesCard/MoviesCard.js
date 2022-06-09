import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { getMovieImageUrl, timeMovie } from "../../utils/utils";

const MoviesCard = ({ movie, onToggleSave, onRemove, savedMoviesItems, onDislikeMovie }) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
  const [likedMovies, setLikedMovies] = React.useState([]);

  const handleLike = () => {
    setIsSaved(true);
    setLikedMovies([movie.id, ...likedMovies])
    onToggleSave(movie);
  }

  const handleDislike = () => {
    setIsSaved(false);
    onDislikeMovie(movie.id);
  }

  const checkLikeStatus = () => {
    savedMoviesItems.includes(movie.id) ? setIsSaved(true) : setIsSaved(false);
  }

  React.useEffect(checkLikeStatus, [movie.id, savedMoviesItems])

  const deleteMovie = () => {
    onRemove(movie);
  }

  return (
    <article className="movie">
      <a href={movie.trailerLink} className="movie__trailer-link" target="_blank" title="Смотреть трейлер" rel="noreferrer">
        <img className="movie__photo" src={location.pathname === '/movies' ? getMovieImageUrl(movie.image.url) : movie.image} alt={movie.nameRU}/>
      </a>
      <div className="movie__text-block">
        <h2 className="movie__title">{movie.nameRU}</h2>
        {location.pathname === "/movies" ?
          <button className={`movie__save-button ${isSaved && "movie__save-button_active"}`} onClick={isSaved ? handleDislike : handleLike}></button>
          :
          <button className="movie__delete-button" onClick={deleteMovie}></button>}
      </div>
      <span className="movie__time">{timeMovie(movie.duration)}</span>
    </article>
  )
}

export default MoviesCard;
