import React from "react";
//import isEmail from 'validator/es/lib/isEmail';

//export function useFormValidation(defaultValues = {}) {
//  const [values, setValues] = React.useState(defaultValues);
//  const [errors, setErrors] = React.useState({});
//  const [isValid, setIsValid] = React.useState(false);

//  const handleChange = (event) => {
//    const target = event.currentTarget;
//    const name = target.name;
//    const value = target.value;
//    const customCheckError = validateField(target);
//    setValues({ ...values, [name]: value });
//    setErrors({ ...errors, [name]: customCheckError || target.validationMessage });
//    setIsValid(customCheckError === null ? target.closest("form").checkValidity() : !customCheckError);
//  };

//  const resetForm = useCallback(
//    (newValues = {}, newErrors = {}, newIsValid = false) => {
//      setValues(newValues);
//      setErrors(newErrors);
//      setIsValid(newIsValid);
//    },
//    [setValues, setErrors, setIsValid]
//  );

//  return { values, handleChange, errors, isValid, resetForm, setValues };
//}

//function validateField(target) {
//  if (target.name.toLowerCase() === 'email') {
//    return validateEmail(target);
//  }
//  return null;
//}

//function validateEmail(target) {
//  const value = target.value;
//  const isValidEmail = isEmail(value);
//  if (!isValidEmail) {
//    return 'Email is not valid';
//  }
//  return null;
//}

//export function isSameProfileData(currentUser, values) {
//  return values.name === currentUser.name && values.email === currentUser.email;
//}

export function useFormValidation() {
  const [values, setValues] = React.useState({name: '', email: '', password: ''});
  const [errors, setErrors] = React.useState({name: '', email: '', password: ''});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}