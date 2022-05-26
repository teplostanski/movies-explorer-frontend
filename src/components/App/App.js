import '../../index.css';

import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { mainApi } from '../../utils/MainApi';
import Unauthorized from "../Unauthorized/Unauthorized";
import * as auth from "../../utils/auth";
import { clearCachedSearchState } from "../../utils/utils";import { AppContext, reducerWithLocalStorage } from "../../contexts/AppContext";
import { getCachedSearchState } from "../../utils/utils";

function App() {
  const [state, dispatch] = React.useReducer(reducerWithLocalStorage, getCachedSearchState());
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [setLoginError] = React.useState("");

  const navigate = useNavigate();

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
          clearCachedSearchState();
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
    <AppContext.Provider value={{state, dispatch}}>
      <CurrentUserContext.Provider value={currentUser}>
        {isInitialized && (
          <div className="page">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main loggedIn={isLoggedIn}/>}/>
                <Route path="/movies"
                       element={
                         <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                           <Movies loggedIn={isLoggedIn}/>
                         </Unauthorized>
                       }/>
                <Route path="/saved-movies"
                       element={
                         <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                           <SavedMovies loggedIn={isLoggedIn}/>
                         </Unauthorized>
                       }/>

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
            </BrowserRouter>
          </div>
        )}
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
