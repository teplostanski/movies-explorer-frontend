import './Header.css';

import logoPath from '../../images/header/logo.png';
import menuLogoPath from '../../images/header/menu.svg';

import React from "react";
import {Link} from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";

function Header(props) {
  const {currentPage, onMenuClick} = props;
  return (
    <header className="header">
      {props.isLoggedIn
        ?
        <>
          <div className="header__links">
            <Link to="/" className="header__logo-link">
              <img className="header__logo" src={logoPath} alt="Лого"/>
            </Link>
            <div className="header__link-container">
              <Link to="/movies"
                    className={currentPage === 'movies' ? "header__link header__link_active" : "header__link"}>
                Фильмы
              </Link>
              <Link to="/saved-movies"
                    className={currentPage === 'saved-movies' ? "header__link header__link_active" : "header__link"}>
                Сохраненные фильмы
              </Link>
            </div>
            <ProfileButton/>
          </div>
          <button className="header__menu-button" onClick={onMenuClick}>
            <img className="header__menu-logo" src={menuLogoPath} alt="Кнопка меню"/>
          </button>
        </>
        :

        <div className="header__creds-container">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src={logoPath} alt="Лого"/>
          </Link>
          <div className="header__creds">
            <Link to="/sign-up" className="header__link"> Регистрация </Link>
            <Link to="/sign-in">
              <button className="header__auth-button"> Войти</button>
            </Link>
          </div>
        </div>
      }
    </header>
  );
}

export default Header
