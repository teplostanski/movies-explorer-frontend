import './MoviesCard.css';
import React from "react";
import moviePhotoPath from '../../images/movie/exampl.png';


function MoviesCard() {
  const [isSaved, setIsIsSaved] = React.useState(false);
  const saveButtonClassName = isSaved ? "movie__save-button movie__save-button_active" : "movie__save-button";
  const onClickHandler = () => {
    setIsIsSaved(!isSaved);
  };
  return (
    <article className="movie">
      <img className="movie__photo" src={moviePhotoPath} alt="Название фильма"/>
      <div className="movie__text-block">
        <h2 className="movie__title">Название</h2>
        <button className={saveButtonClassName} type="button" onClick={onClickHandler}/>
      </div>
      <span className="movie__time">1ч42м</span>
    </article>
  );
}

export default MoviesCard;
