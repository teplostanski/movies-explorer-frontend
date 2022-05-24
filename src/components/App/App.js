import '../../index.css';

import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Authorized from "../Authorized/Authorized";
import { AppContext, reducerWithLocalStorage } from "../../contexts/AppContext";
import { getCachedSearchState } from "../../utils/utils";

function App() {
  const [state, dispatch] = React.useReducer(reducerWithLocalStorage, getCachedSearchState());
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const isLoggedIn = !!currentUser.email;

  React.useEffect(() => {
    auth.checkToken().then((res) => {
      if (res) {
        setCurrentUser({name: res.user.name, email: res.user.email});
      } else {
        setCurrentUser({});
      }
      setIsInitialized(true);
    }).catch((error) => {
      setIsInitialized(true);
      console.error(error);
    });
  }, []);

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
                <Route path="/profile"
                       element={
                         <Unauthorized redirectTo="/" loggedIn={isLoggedIn}>
                           <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} loggedIn={isLoggedIn}/>
                         </Unauthorized>
                       }/>
                <Route path="/sign-up"
                       element={
                         <Authorized redirectTo="/" loggedIn={isLoggedIn}>
                           <Register/>
                         </Authorized>}/>
                <Route path="/sign-in"
                       element={
                         <Authorized redirectTo="/" loggedIn={isLoggedIn}>
                           <Login/>
                         </Authorized>}/>
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
