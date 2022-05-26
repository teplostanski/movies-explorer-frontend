import './Register.css';
import React from "react";
import { Link } from "react-router-dom";
//import * as auth from "../../utils/auth"
import FormLogo from "../FormLogo/FormLogo";
import EmailInput from "../EmailInput/EmailInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import NameInput from "../NameInput/NameInput";
import { useFormValidation } from "../../validation/FormValidation";
//import { clearCachedSearchState } from "../../utils/utils";

const Register = ({ onRegisterSubmit }) => {
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [registerError, setRegisterError] = React.useState("");
  const buttonClassName = isValid ? "form__submit-button" : "form__submit-button form__submit-button_inactive"
  const errorClass = !!registerError ? 'form__footer-error form__footer-error_active' : 'form__footer-error';
  //const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(values);
  }

  function handleClearErrors() {
    resetForm();
    setRegisterError("");
  }

  //function handleChangeInput(e) {
  //  handleChange(e);
  //  if (registerError.length > 0) {
  //    setRegisterError("");
  //  }
  //}

  //function handleRegister(name, email, password) {
  //  auth.register(name, email, password)
  //    .then(data => {
  //      if (data?.error) {
  //        setRegisterError(data.error);
  //      } else if (data.email) {
  //        clearCachedSearchState();
  //        Navigate('/movies');
  //      } else {
  //        setRegisterError('Что-то пошло не так')
  //      }
  //    }).catch((error) => {
  //    if (error === 'Ошибка: 409') return setRegisterError('Пользователь с таким email уже зарегестрирован');
  //    setRegisterError('Успешная регистрация')
  //  });
  //}

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
