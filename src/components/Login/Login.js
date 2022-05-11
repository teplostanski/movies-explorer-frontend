import './Login.css';
import React from "react";
import {Link} from "react-router-dom";
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";


function Login() {
  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form" name="login-form" noValidate>
          <div className="form__field-group">
            <EmailInput label={"E-mail"}/>
            <PasswordInput label={"Пароль"}/>
          </div>
          <div className="form__footer">
            <button className="form__submit-button" type="submit">Войти</button>
            <div className="form__span-block">
              <span className="form__span">Еще не зарегистрированы?</span>
              <Link to="/sign-up" className="form__link">Регистрация</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
