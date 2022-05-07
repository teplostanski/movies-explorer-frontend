import './Header.css';
import logoPath from '../../images/header/logo.png';
import React from "react";
import {Link} from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Лого"/>
      <div className="header__auth">
        {props.isLoggedIn
          ?
          <>
            <Link to="/sign-in" className="header__link"> Выйти </Link>
          </>
          :
          <>
            <Link to="/sign-up" className="header__link"> Регистрация </Link>
            <button className="header__auth-button"> Войти </button>
          </>
        }
      </div>

    </header>
  );
}

export default Header;
