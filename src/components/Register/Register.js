import './Register.css';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../../utils/auth"
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";
import { useFormValidation } from "../../validation/FormValidation";


function Register() {
  const navigate = useNavigate()

  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [registerError, setRegisterError] = React.useState("");
  const buttonClassName = isValid ? "form__submit-button" : "form__submit-button form__submit-button_inactive"
  const errorClass = !!registerError ? 'form__footer-error form__footer-error_active' : 'form__footer-error';

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
    resetForm();
  }

  function handleClearErrors() {
    resetForm();
    setRegisterError("");
  }

  function handleChangeInput(e) {
    handleChange(e);
    if (registerError.length > 0) {
      setRegisterError("");
    }
  }

  function handleRegister(name, email, password) {
    auth.register(name, email, password)
      .then(data => {
        console.log("data", data)
        if (data?.error) {
          setRegisterError(data.error);
        } else if (data.email) {
          navigate("/sign-in")
        } else {
          setRegisterError('Что-то пошло не так')
        }
      }).catch((error) => {
        if (error === 'Ошибка: 409') return setRegisterError('Пользователь с таким email уже зарегестрирован');
        setRegisterError('Что-то пошло не так')
    });
  }

  return (
    <>
      <div className="form__container">
        <FormLogo/>
        <h2 className="form__title">Добро пожаловать!</h2>
        <form id="register-form" name="register-form" className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__field-group">
            <NameInput label={"Имя"} error={errors.name} value={values.name} onChange={handleChangeInput}/>
            <EmailInput label={"E-mail"} error={errors.email} value={values.email} onChange={handleChangeInput}/>
            <PasswordInput label={"Пароль"} error={errors.password} value={values.password}
                           onChange={handleChangeInput}/>
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
