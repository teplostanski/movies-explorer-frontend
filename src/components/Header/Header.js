import "./Header.css";

import logoPath from "../../images/header/logo.svg";
import menuLogoPath from "../../images/header/menu.svg";

import React from "react";
import { Link, useLocation } from "react-router-dom";

import Navigation from '../Navigation/Navigation';
import NavigationOverlay from '../NavigationOverlay/NavigationOverlay';
import menuCloseButtonPath from '../../images/header/close.svg';

function Header({ loggedIn }) {
  const location = useLocation();
  const [isChecked, setIsChecked] = React.useState(false);

  const closeMenu = () => {
    setIsChecked(false);
  }

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <header className={`header ${location.pathname === '/'}`}>
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logoPath} alt="Лого"/>
      </Link>
      <Navigation loggedIn={loggedIn} />
      {loggedIn &&
        <>
          <label className="header__menu-button">
            <img className="header__menu-logo" src={!isChecked ? menuLogoPath : menuCloseButtonPath } alt="Кнопка меню"></img>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={handleChange}
              className='header__menu-checkbox'>
            </input>
          </label>

          <NavigationOverlay
            isChecked={isChecked}
            onCloseMenu={closeMenu}
          />
        </>
      }
    </header>
  )
}

export default Header;