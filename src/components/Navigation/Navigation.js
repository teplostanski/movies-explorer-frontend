import "./Navigation.css";
import React from "react";
import ProfileButton from "../ProfileButton/ProfileButton";
import { Link, NavLink } from "react-router-dom";
import "../Header/Header.css";

const Navigation = ({ loggedIn }) => {

  const navigationClassName = ({ isActive }) => {
    return `header__link ${isActive && "header__link_active"}`;
  }

  return (
    <>
      {
        !loggedIn ?
          <div className="header__creds-container">
            <div className="header__creds">
              <Link to="/sign-up" className="header__link">Регистрация</Link>
              <Link to="/sign-in"><button className="header__auth-button">Войти</button></Link>
            </div>
          </div>
          :
          <>
            <div className="header__links">
              <div className="header__link-container">
                <NavLink to="/movies" className={navigationClassName}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={navigationClassName}>Сохранённые фильмы</NavLink>
              </div>
              <Link to="/profile">
                <ProfileButton/>
              </Link>

            </div>


          </>
      }
    </>
  )
}

export default Navigation;
