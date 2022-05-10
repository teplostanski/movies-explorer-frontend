import './Header.css';

import logoPath from '../../images/header/logo.png';
//import menuLogoPath from '../../images/header/menu.svg';

import React from "react";
import {Link} from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого"/>

      {props.isLoggedIn
        ?
        <>
          <div className="header__links">
            <div  className="header__movie-link">
            <Link to="/movies" className="header__link"> Фильмы </Link>
            <Link to="/saved-movies" className="header__link"> Сохраненные фильмы </Link>
          </div>

            <ProfileButton/>
          </div>

        </>
        :
        <div className="header__creds">
          <Link to="/sign-up" className="header__link"> Регистрация </Link>
          <button className="header__auth-button"> Войти</button>
        </div>
      }
    </header>
  );
}

export default Header;
