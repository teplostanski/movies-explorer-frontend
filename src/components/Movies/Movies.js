import React from "react";
import './Movies.css'
import SearchForm from "../SearchForms/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from '../MoviesCard/MoviesCard';
import { filterMovies } from "../../utils/utils";
import Preloader from "../Preloader/Preloader";

function Movies({ movies, onSubmit, initialCardsCount, moreCardsCount, onSaveMovie, savedMoviesItems, onDislikeMovie, isLoading }) {

  const [filteredMovies, setFilteredMovies] = React.useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
  const [shortFilteredMovies, setShortFilterseMovies] = React.useState(JSON.parse(localStorage.getItem('shortFilteredMovies')) || []);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(JSON.parse(localStorage.getItem('checkboxStatus')) || false);
  const [cardsToRender, setCardsToRender] = React.useState(initialCardsCount);
  const [isSeachHandeled, setIsSearchHandled] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
    setIsSearchHandled(true);
  }

  React.useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
      setShortFilterseMovies(filteredMovies.filter((item) => item.duration <= 40));
    }
  }, [])

  const handleCheckboxOnLoadFromLocalstorage = (message) => {
    filterMovies(movies, message)
  }
  const handleSearch = (message) => {
    setCardsToRender(initialCardsCount);
    onSubmit((movies) => {
      const result = filterMovies(movies, message)
      setFilteredMovies(result);
      const resultShort = result.filter((item) => item.duration <= 40);
      setShortFilterseMovies(resultShort);
      if (isCheckboxChecked) {
        localStorage.setItem('shortFilteredMovies', JSON.stringify(resultShort));
        localStorage.removeItem('filteredMovies');
      } else {
        localStorage.setItem('filteredMovies', JSON.stringify(result));
        localStorage.removeItem('shortFilteredMovies');
      }
      localStorage.setItem('checkboxStatus', JSON.stringify(isCheckboxChecked));
    });
    setIsSearchHandled(true);
  }

  const handleButtonMoreClick = () => {
    setCardsToRender(cardsToRender + moreCardsCount)
  }

  const onToggleSave = (card) => {
    onSaveMovie(card)
  }

  return (
    <>
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
        onChange={handleCheckboxChange}
        onSubmit={handleSearch}
        handleCheckboxOnLoadFromLocalstorage={handleCheckboxOnLoadFromLocalstorage}
      />
      {isLoading ?
        <Preloader/>
        :
        <>
          {isCheckboxChecked ?
            <>{(isSeachHandeled && shortFilteredMovies.length === 0) &&
              <p className="movies__message">По вашему запросу ничего не найдено</p>}
            </>
            :
            <>{(isSeachHandeled && filteredMovies.length === 0) &&
              <p className="movies__message">По вашему запросу ничего не найдено</p>}
            </>
          }
          <MoviesCardList>
            {isCheckboxChecked ?
              <>
                {shortFilteredMovies.slice(0, cardsToRender).map((item) => (
                  <MoviesCard
                  movie={item} {...item}
                  key={item.id}
                  onToggleSave={onToggleSave}
                  savedMoviesItems={savedMoviesItems}
                  onDislikeMovie={onDislikeMovie} />
                ))}
              </>
              :
              <>
                {filteredMovies.slice(0, cardsToRender).map((item) => (
                  <MoviesCard
                    movie={item} {...item}
                    key={item.id}
                    onToggleSave={onToggleSave}
                    savedMoviesItems={savedMoviesItems}
                    onDislikeMovie={onDislikeMovie} />
                ))}
              </>}
          </MoviesCardList>
          {isCheckboxChecked ?
            <>
              {shortFilteredMovies.length > shortFilteredMovies.slice(0, initialCardsCount).length && shortFilteredMovies.length >= cardsToRender ?
                <div className='movies__more'>
                  <button className='movies__more-button' onClick={handleButtonMoreClick}>Ещё</button>
                </div>
                :
                null}
            </>
            :
            <>
              {filteredMovies.length > filteredMovies.slice(0, initialCardsCount).length && filteredMovies.length >= cardsToRender ?
                <div className='movies__more'>
                    <button className='movies__more-button' onClick={handleButtonMoreClick}>Ещё</button>
                </div>
                :
                null}
            </>}
        </>
      }
    </>
  );
}

export default Movies;
