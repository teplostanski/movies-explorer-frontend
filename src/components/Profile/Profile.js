import './Profile.css';
import React from "react";
import {Link} from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <div className="profile__content">
        <h1 className="profile__title">Привет, Username! </h1>
        <ul className="profile__info">
          <li className="profile__info-row">
            <div className="profile__row-block profile__row-block_bold">Имя</div>
            <div className="profile__row-block">Username</div>
          </li>
          <li className="profile__info-row">
            <div className="profile__row-block profile__row-block_bold">email</div>
            <div className="profile__row-block">username@example.com</div>
          </li>
        </ul>
      </div>
      <div className="profile__links">
        <Link to="/" className="profile__link">Редактировать</Link>
        <Link to="/" className="profile__link profile__link_red ">Выйти из аккаунта</Link>
      </div>
    </section>

  );
}

export default Profile;
