import './FormLogo.css';
import React from "react";
import {Link} from "react-router-dom";
import logoPath from '../../images/header/logo.svg';


function FormLogo() {
  return (
    <div className="form__logo-container">
      <Link to="/">
        <img className="form__logo" src={logoPath} alt="Лого"/>
      </Link>
    </div>
  );
}

export default FormLogo;
