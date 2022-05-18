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


function App() {
  return (
      <div className="page">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/sign-up" element={<Register/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
