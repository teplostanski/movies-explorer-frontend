import './Login.css';
import React from "react";
import { Link } from "react-router-dom";
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import * as auth from "../../utils/auth";


function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleLogin(email, password)
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          window.location.href = '/movies';
        }
      })
      .catch(() => {
        console.log('Что-то пошло не так');
      });
  }
  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form" name="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form__field-group">
            <EmailInput label={"E-mail"} value={email} onChange={handleEmailChange}/>
            <PasswordInput label={"Пароль"} value={password} onChange={handlePasswordChange}/>
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
