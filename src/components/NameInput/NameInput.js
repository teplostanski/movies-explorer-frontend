import React from "react";
import './NameInput.css';
import InputBase from "../InputBase/InputBase";

function NameInput(props) {
  const { label, error } = props;
  return (
    <InputBase label={label} error={error}>
      <input id="name-input" required className="form__input-field" name="name" minLength="4" maxLength="40"/>
    </InputBase>
  );
}

export default NameInput;
