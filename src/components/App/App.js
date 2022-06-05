import '../../index.css';

import './App.css';
import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Unauthorized from "../Unauthorized/Unauthorized";
import * as auth from "../../utils/auth";
import { mainApi } from '../../utils/MainApi';
import fetchMovies from '../../utils/MoviesApi'
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [setLoginError] = React.useState("");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesItems, setSavedMoviesItems] = React.useState([]);
  const [isLoading, setisLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [initialCardsCount, setInitialCardsCount] = React.useState(0);
  const [moreCardsCount, setMoreCardsCount] = React.useState(0);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const pathToHeader = ['/', '/movies', '/saved-movies', '/profile'];
  const pathToFooter = ['/', '/movies', '/saved-movies'];

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      mainApi.checkToken().then(() => {
        setIsLoggedIn(true);
        setIsInitialized(true);
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('token');
      })
    } else {
      setIsInitialized(true);
    }
  }, [])

  React.useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    Promise.all([mainApi.getUserInfo(), mainApi.fetchSavedMovies()])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies.filter((item) => item.owner === user._id));
        setSavedMoviesItems(movies.filter((item) => item.owner === user._id).map(item => item.movieId));
      })
      .catch((error) => {
        console.log(error);
      })
  }, [isLoggedIn])

    // поиск фильмов

  const getMovies = (filterCallback) => {
    setisLoading(true);
    return fetchMovies.getMovies()
      .then((res) => {
        setMovies(res);
        filterCallback(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  const handleMoviesSearchSumit = (filterCallback) => {
    getMovies(filterCallback);
  }

  const resizeHandler = () => {
    setTimeout(() => {
      setScreenWidth(window.innerWidth);
    }, 10000)
  }

  React.useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [])

  React.useMemo(() => {
    let current;
    let more;
    switch (true) {
      case screenWidth >= 1280:
        current = 12;
        more = 3;
        break;
      case screenWidth >= 768:
        current = 8;
        more = 2;
        break;
      case screenWidth >= 320:
        current = 5;
        more = 2;
        break;
      default:
        current = 6;
        more = 3;
        break;
    }
    setInitialCardsCount(current);
    setMoreCardsCount(more);
  }, [screenWidth]
  );

  const handleSaveMovies = (movie) => {
    return mainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setSavedMoviesItems([newMovie.movieId, ...savedMoviesItems])
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDeleteMoviesFromSaved = (movie) => {
    return mainApi.removeMovie(movie)
      .then((res) => {
        setSavedMovies(state => state.filter(element => element._id !== res._id));
        setSavedMoviesItems(state => state.filter(element => element !== res.movieId));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleDislikeMovie = (id) => {
    const movieToDelete = savedMovies.find((element) => element.movieId === id);
    handleDeleteMoviesFromSaved(movieToDelete);
  }

  const handleRegister = ({ name, password, email }) => {
    auth.register({ name, password, email })
      .then(() => {
        handleLogin({ password: password, email: email });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  const handleLogin = ({ password, email }) => {
    auth.authorize({ password, email })
      .then((res) => {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          //clearCachedSearchState();
          navigate('/movies');
      })
      .catch((error) => {
        console.log(error)
        setLoginError('Что-то пошло не так');
      });
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.clear();
    setCurrentUser({});
  }

  const handleUpdateUser = ({ name, email }) => {
    mainApi.patchUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);

      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isInitialized ?
          <>
            {pathToHeader.includes(location.pathname) ?
              <Header
                loggedIn={isLoggedIn} />
              : null}
            <Routes>
              <Route path="/" element={<Main loggedIn={isLoggedIn}/>}/>
              <Route
                path="/movies"
                element={
                  <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                    <Movies
                      movies={movies}
                      onSubmit={handleMoviesSearchSumit}
                      initialCardsCount={initialCardsCount}
                      moreCardsCount={moreCardsCount}
                      onSaveMovie={handleSaveMovies}
                      onDeleteMovie={handleDeleteMoviesFromSaved}
                      savedMoviesItems={savedMoviesItems}
                      onDislikeMovie={handleDislikeMovie}
                      isLoading={isLoading}
                    />
                  </Unauthorized>
                }
              />

              <Route
                path="/saved-movies"
                element={
                  <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                    <SavedMovies
                      savedMovies={savedMovies}
                      onDeleteMovie={handleDeleteMoviesFromSaved}
                      savedMoviesItems={savedMoviesItems}
                      isLoading={isLoading}
                    />
                  </Unauthorized>
                }
              />

              <Route
                path="/profile"
                element={
                  <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                    <Profile
                      onLogout={handleLogout}
                      onUpdateUser={handleUpdateUser}
                      loggedIn={isLoggedIn}
                    />
                  </Unauthorized>
                }
              />

              <Route
                path="/sign-up"
                element={
                  <Register onRegisterSubmit={handleRegister}/>
                }
              />

              <Route
                path='/sign-in'
                element={
                  <Login onLoginSubmit={handleLogin}/>
                }
              />

              <Route path="*" element={<NotFound/>}/>

            </Routes>
            {pathToFooter.includes(location.pathname) ?
              <Footer />
            : null}
          </>
          :
          <Preloader />
        }
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
