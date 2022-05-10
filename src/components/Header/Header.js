import './Header.css';
import logoPath from '../../images/header/logo.png';
import profileLogoPath from '../../images/header/icon-acc.svg';
import React from "react";
import {Link} from "react-router-dom";

function Header(props) {

  return (
    <header className="header">

      <div className="header__links">
      <img className="header__logo" src={logoPath} alt="Лого"/>
        {props.isLoggedIn
          ?
          <>
            <div className="header__movie-link">
              <Link to="/movies" className="header__link"> Фильмы </Link>
              <Link to="/saved-movies" className="header__link"> Сохраненные фильмы </Link>
            </div>


            <Link to="/profile" className="header__profile-link">
              <button className="header__profile-button">
                <img className="header__profile-logo" src={profileLogoPath}/>
                <span>Аккаунт</span>
              </button>
            </Link>
          </>
          :
          <>
            <Link to="/sign-up" className="header__link"> Регистрация </Link>
            <button className="header__auth-button"> Войти </button>
          </>
        }
        <>

        </>
      </div>

    </header>
  );
}

export default Header;
