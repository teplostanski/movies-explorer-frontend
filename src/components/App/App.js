import '../../index.css';
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          <Header isLoggedIn={loggedIn}/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/movies" element={<Movies/>}/>
          </Routes>
        </BrowserRouter>
        <Footer/>

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
