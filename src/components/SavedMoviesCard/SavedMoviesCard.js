import './SavedMoviesCard.css';
import React from "react";
import moviePhotoPath from '../../images/movie/exampl.png';


function SavedMoviesCard() {
  const [isSaved, setIsIsSaved] = React.useState(false);
  const onClickHandler = () => {
    setIsIsSaved(!isSaved);
  };
  return (
    <article className="movie">
      <img className="movie__photo" src={moviePhotoPath} alt="Название фильма"/>
      <div className="movie__text-block">
        <h2 className="movie__title">Название</h2>
        <button className="movie__delete-button" type="button" onClick={onClickHandler}/>
      </div>
      <span className="movie__time">1ч42м</span>
    </article>
  );
}

export default SavedMoviesCard;
