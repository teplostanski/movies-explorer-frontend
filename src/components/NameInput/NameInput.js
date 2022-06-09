import React from "react";
import './NameInput.css';
import InputBase from "../InputBase/InputBase";

function NameInput(props) {
  const { label, error, value, onChange } = props;
  return (
    <InputBase label={label} error={error}>
      <input
        id="name-input"
        required
        className="form__input-field"
        name="name"
        minLength="4"
        maxLength="40"
        value={value || ''}
        onChange={onChange}/>
    </InputBase>
  );
}

export default NameInput;