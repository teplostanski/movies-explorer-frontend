import './Profile.css';
import React from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from "../../validation/FormValidation";

const Profile = ({ loggedIn, onLogout, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    currentUser.name !== values.name || currentUser.email !== values.email ?
      setStatus(true)
      : setStatus(false);
  }, [currentUser.name, currentUser.email, values.email, values.name])

  React.useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {}, false)
  }, [resetForm, currentUser])

  const handleUpdateUserSubmit = (e) => {
      e.preventDefault();
      onUpdateUser(values);
      resetForm({ name: currentUser.name, email: currentUser.email }, {}, false)
  }

  const logout = () => {
    loggedIn && onLogout();
}

  function isError(error) {
    return !!error ? 'form__input-error form__input-error_active' : 'form__input-error'
  }

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleUpdateUserSubmit}>
            <div className="profile__form-field">
              <label className="profile__form-label">Имя</label>
              <input className="profile__form-input" name="name" minLength="2" maxLength="30" placeholder="Имя" value={values.name || ''} onChange={handleChange}/>
            </div>
            <span className={isError(errors.name)}>{errors.name}</span>
            <div className="profile__form-field">
              <label className="profile__form-label">E-mail</label>
              <input className="profile__form-input" type="email" name="email" placeholder="Email" value={values.email || ''} onChange={handleChange}/>
            </div>
            <span className={isError(errors.email)}>{errors.email}</span>
            <div className="profile__form-footer">
              {isValid && status ? <button type='submit' className="profile__button profile__button_type_submit">Редактировать</button>
              :
                <>
                  <button type="button" className="profile__button profile__button_red" onClick={logout}>Выйти из аккаунта</button>
                </>
              }
            </div>
          </form>
        </div>
      </section>
    </>

  );
}

export default Profile;
