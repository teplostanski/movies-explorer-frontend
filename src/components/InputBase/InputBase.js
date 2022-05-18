import React from "react";
import './InputBase.css';

function InputBase(props) {
  const { label, error, children } = props;
  const errorClass = !!error ? 'form__input-error form__input-error_active' : 'form__input-error';
  return (
    <div className="form__field">
      <label className="form__label">{label}</label>
      {children}
        <span className={errorClass}>
          {error}
        </span>
    </div>
  );
}

export default InputBase;
