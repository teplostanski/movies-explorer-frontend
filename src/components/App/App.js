import '../../index.css';
import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {BrowserRouter} from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  function handleLogout() {
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>
          <Header isLoggedIn={loggedIn} handleLogout={handleLogout}/>
        </BrowserRouter>
        <Movies/>
        <Footer/>

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
