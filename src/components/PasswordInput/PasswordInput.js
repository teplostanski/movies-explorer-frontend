import React from "react";
import './PasswordInput.css';
import InputBase from "../InputBase/InputBase";

function PasswordInput(props) {
  const { label, error, value, onChange } = props;
  return (
    <InputBase label={label} error={error}>
      <input
        id="password-input"
        required
        className="form__input-field form__input-field_white"
        type="password"
        name="password"
        placeholder="password"
        minLength="8"
        maxLength="200"
        value={value || ''}
        onChange={onChange}
      />
    </InputBase>
  );
}

export default PasswordInput;
