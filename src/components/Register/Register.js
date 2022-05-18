import './Register.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth"
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";


function Register() {
  const navigate = useNavigate()

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    console.log("")
    e.preventDefault()
    handleRegister(name, email, password)
  }

  function handleRegister(name, email, password) {
    console.log('handleSubmit', name, email, password)
    auth.register(name, email, password)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        } else if (data.email) {
          navigate("/sign-in")
        } else {
          console.log('Что-то пошло не так');
        }
      }).catch((error) => {
      console.error(error);
    });
  }
  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form id="register-form" name="register-form" className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field-group">
            <NameInput label={"Имя"} value={name} onChange={handleNameChange}/>
            <EmailInput label={"E-mail"} value={email} onChange={handleEmailChange}/>
            <PasswordInput label={"Пароль"} value={password} onChange={handlePasswordChange}/>
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
