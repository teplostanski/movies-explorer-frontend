import './Navigation.css';
import React from "react";
import ProfileButton from "../ProfileButton/ProfileButton";
import {Link} from "react-router-dom";


function Navigation(props) {
  const navigationClassName = props.isOpen ? "navigation__overlay navigation__overlay_active" : "navigation__overlay";
  return (
    <div className={navigationClassName}>
      <div className="navigation">
        <button className="navigation__close-button" type="button" onClick={props.onClose}>
        </button>
        <ul className="navigation__list">
          <Link className="navigation__list-item" to="/">Главная</Link>
          <Link className="navigation__list-item" to="/movies">Фильмы</Link>
          <Link className="navigation__list-item" to="/movies">Сохраненные фильмы</Link>
        </ul>
        <div className="navigation__button-container">
          <ProfileButton/>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
