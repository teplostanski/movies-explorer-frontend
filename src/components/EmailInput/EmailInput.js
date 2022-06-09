import React from "react";
import './EmailInput.css';
import InputBase from "../InputBase/InputBase";

function EmailInput(props) {
  const { label, error, value, onChange } = props;
  return (
    <InputBase label={label} error={error}>
      <input
        id="email-input"
        required
        className="form__input-field"
        type="email"
        name="email"
        placeholder="email"
        minLength="4"
        maxLength="40"
        value={value || ''}
        onChange={onChange}
      />
    </InputBase>
  );
}

export default EmailInput;
