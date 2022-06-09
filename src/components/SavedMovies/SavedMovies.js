import React from "react"
import './SavedMovies.css'
import SearchForm from "../SearchForms/SearchForm";
//import Navigation from "../Navigation/Navigation";
//import Header from "../Header/Header";
//import Footer from "../Footer/Footer";
//import { mainApi } from "../../utils/MainApi";
import { filterMovies } from "../../utils/utils";
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
//import { useAppContext } from "../../contexts/AppContext";

//function SavedMovies(props) {
//  const { state: { isLoading, savedMovies }, dispatch } = useAppContext();
//  //const {loggedIn} = props;
//  const [isOpen, setIsOpen] = React.useState(false);
//  const [searchParams, setSearchParams] = React.useState(null);

//  React.useEffect(() => {
//    dispatch({ type: 'setIsLoading', payload: { isLoading: true }});
//    mainApi.fetchSavedMovies()
//      .then((res) => {
//        dispatch({ type: 'savedMoviesLoaded', payload: { savedMovies: res }});
//      })
//      .catch((err) => {
//        console.error(err)
//        dispatch({ type: 'setIsLoading', payload: { isLoading: false }});
//      })
//  }, [dispatch]);

//  //function handleOpen() {
//  //  setIsOpen(true)
//  //}

//  function handleClose() {
//    setIsOpen(false)
//  }

//  function removeSavedMovie(movie) {
//    mainApi.removeMovie(movie._id)
//      .then(() => dispatch({ type: 'unSaveMovie', payload: { movieId: movie.movieId }}))
//      .catch(err => console.error(err));
//  }

//  const mergedMovies = savedMovies?.movies?.map(it => ({...it, isSaved: true})) || [];
//  const filteredMovies = searchParams
//    ? filterMovies(mergedMovies, searchParams.searchQuery, searchParams.isShort)
//    : mergedMovies;

const SavedMovies = ({ savedMovies, onDeleteMovie, savedMoviesItems, isLoading }) => {
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [shortFilteredMovies, setShortFilterseMovies] = React.useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  React.useEffect(() => {
    setFilteredMovies([...savedMovies])
  }, [savedMovies])

  const removeSavedMovie = (movie) => {
      onDeleteMovie(movie);
  }

  const handleSearch = (message) => {
    const result = filterMovies(savedMovies, message)
    setFilteredMovies(result);
    const resultShort = result.filter((item) => item.duration <= 40);
    setShortFilterseMovies(resultShort);
  }

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked)
  }

  //return (
  //  <>
  //    {/*<Header currentPage="saved-movies" isLoggedIn={loggedIn} onMenuClick={handleOpen}/>*/}
  //    <SearchForm onSubmit={setSearchParams} allowSubmitWithoutQuery={true}/>
  //    {isLoading ? (<Preloader/>) : (
  //      <>
  //        {(!mergedMovies || !mergedMovies.length) && (
  //          <p className="movies__message">Нет сохранённых фильмов</p>
  //        )}
  //        {(!!filteredMovies && !!filteredMovies.length) && (
  //          <MoviesCardList currentPage="saved-movies" movies={filteredMovies} onToggleSave={null} onRemove={removeSavedMovie}/>
  //        )}
  //        {(mergedMovies && (!filteredMovies || !filteredMovies.length)) && (
  //          <p className="movies__message">Ничего не найдено</p>
  //        )}
  //      </>
  //    )}
  //    <Navigation isOpen={isOpen} onClose={handleClose}/>
  //    {/*<Footer/>*/}
  //  </>
  //);

  return (
    <>
      <SearchForm onSubmit={handleSearch} isCheckboxChecked={isCheckboxChecked} onChange={handleCheckboxChange}/>
      {isLoading ?
        <Preloader />
        :
        <>
          {isCheckboxChecked ?
            <>{(shortFilteredMovies.length === 0) && <p className='movies__message'>Ничего не найдено</p>}</>
            :
            <>{(filteredMovies.length === 0) && <p className='movies__message'>Ничего не найдено</p>}</>
          }
          <MoviesCardList>
            {isCheckboxChecked ?
              <>
              {shortFilteredMovies.map((item) => (
              <MoviesCard movie={item} {...item} key={item._id} savedMoviesItems={savedMoviesItems} onRemove={removeSavedMovie}/>
            ))}
              </>
              :
              <>
              {filteredMovies.map((item) => (
              <MoviesCard movie={item} {...item} key={item._id} savedMoviesItems={savedMoviesItems} onRemove={removeSavedMovie}/>
            ))}
              </>}
          </MoviesCardList>
        </>
      }
    </>
  )
}

export default SavedMovies;
