import './Profile.css';
import React from "react";
import Header from "../Header/Header";

function Profile() {
  return (
    <>
      <Header isLoggedIn={true}/>
      <section className="profile">
        <div className="profile__content">
          <h1 className="profile__title">Привет, Username! </h1>
          <form className="profile__form">
            <div className="profile__form-field">
              <label className="profile__form-label">Имя</label>
              <input className="profile__form-input" placeholder={"Username"}/>
            </div>
            <div className="profile__form-field">
              <label className="profile__form-label">email</label>
              <input className="profile__form-input" placeholder={"username@example.com"}/>
            </div>
            <div className="profile__form-footer">
              <button className="profile__button" type={"submit"}>Редактировать</button>
              <button className="profile__button profile__button_red" >Выйти из аккаунта</button>
            </div>
          </form>
        </div>
      </section>
    </>

  );
}

export default Profile;
