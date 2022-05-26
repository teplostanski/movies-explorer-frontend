import './Register.css';
import React from "react";
import { Link } from "react-router-dom";
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";
import { useFormValidation } from "../../validation/FormValidation";

const Register = ({ onRegisterSubmit }) => {
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [registerError, setRegisterError] = React.useState("");
  const buttonClassName = isValid ? "form__submit-button" : "form__submit-button form__submit-button_inactive"
  const errorClass = !!registerError ? 'form__footer-error form__footer-error_active' : 'form__footer-error';

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(values);
  }

  function handleClearErrors() {
    resetForm();
    setRegisterError("");
  }

  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form id="register-form" name="register-form" className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field-group">
            <NameInput label={"Имя"} error={errors.name} value={values.name} onChange={handleChange}/>
            <EmailInput label={"E-mail"} error={errors.email} value={values.email} onChange={handleChange}/>
            <PasswordInput label={"Пароль"} error={errors.password} value={values.password} onChange={handleChange}/>
          </div>
          <div className="form__footer">
            <button className={buttonClassName} type="submit">Зарегистрироваться</button>
            <span className={errorClass}>{registerError}</span>
            <div className="form__span-block">
              <span className="form__span">Уже зарегистрированы?</span>
              <Link to="/sign-in" className="form__link" onClick={handleClearErrors}>Войти</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
