import './Register.css';
import React from "react";
import {Link} from "react-router-dom";
import logoPath from '../../images/header/logo.png';
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";


function Register() {
  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form className="form" name="register-form" noValidate>
          <div className="form__field-group">
            <NameInput label={"Имя"}/>
            <EmailInput label={"E-mail"}/>
            <PasswordInput label={"Пароль"}/>
          </div>
          <div className="form__footer">
            <button className="form__submit-button" type="submit">Зарегистрироваться</button>
            <div className="form__span-block">
              <span className="form__span">Уже зарегистрированы?</span>
              <Link to="/sign-in" className="form__link">Войти</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
