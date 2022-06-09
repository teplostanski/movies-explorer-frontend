import './Login.css';
import React from "react";
import { Link } from "react-router-dom";
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useFormValidation } from "../../validation/FormValidation";

const Login = ({ onLoginSubmit }) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();
  const [loginError, setLoginError] = React.useState("");
  const buttonClassName = isValid ? "form__submit-button" : "form__submit-button form__submit-button_inactive"
  const errorClass = !!loginError ? 'form__footer-error form__footer-error_active' : 'form__footer-error';

  function handleSubmit(e) {
    e.preventDefault();
    onLoginSubmit(values);
    resetForm();
  }

  function handleClearErrors() {
    resetForm();
    setLoginError("");
  }
  function handleChangeInput(e) {
    handleChange(e);
    if (loginError.length > 0) {
      setLoginError("");
    }
  }

  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Рады видеть!</h2>
        <form className="form" name="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form__field-group">
            <EmailInput label={"E-mail"} error={errors.email} value={values.email || ""} onChange={handleChangeInput}/>
            <PasswordInput label={"Пароль"} error={errors.password} value={values.password || ""} onChange={handleChangeInput}/>
          </div>
          <div className="form__footer">
            <button className={buttonClassName} type="submit">Войти</button>
            <span className={errorClass}>{loginError}</span>
            <div className="form__span-block">
              <span className="form__span">Еще не зарегистрированы?</span>
              <Link to="/sign-up" className="form__link" onClick={handleClearErrors}>Регистрация</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
