import '../../index.css';

import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

function App() {
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
    <CurrentUserContext.Provider value={currentUser}>
      {isInitialized && (
        <div className="page">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main loggedIn={isLoggedIn}/>}/>
              <Route path="/movies"
                     element={
                       <ProtectedRoute redirectTo="/sign-up" loggedIn={isLoggedIn}>
                         <Movies loggedIn={isLoggedIn}/>
                       </ProtectedRoute>
                     }/>
              <Route path="/saved-movies"
                     element={
                       <ProtectedRoute redirectTo="/sign-up" loggedIn={isLoggedIn}>
                         <SavedMovies loggedIn={isLoggedIn}/>
                       </ProtectedRoute>
                     }/>
              <Route path="/profile"
                     element={
                       <ProtectedRoute redirectTo="/sign-up" loggedIn={isLoggedIn}>
                         <Profile currentUser={currentUser} setCurrentUser={setCurrentUser} loggedIn={isLoggedIn}/>
                       </ProtectedRoute>
                     }/>
              <Route path="/sign-up" element={<Register/>}/>
              <Route path="/sign-in" element={<Login/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </CurrentUserContext.Provider>

  );
}

export default App;
