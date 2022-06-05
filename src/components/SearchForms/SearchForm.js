import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

const SearchForm = ({ isCheckboxChecked, onChange, onSubmit }) => {
  const location = useLocation();
  const [searchQuery, setSearchMessage] = React.useState(location.pathname === "/movies" ? localStorage.getItem("searchQuery") || '' : '');

  const buttonClassName = searchQuery !== '' ? "search__submit-button" : "search__submit-button search__submit-button_inactive"

  const handleChange = (e) => {
    setSearchMessage(e.target.value);
  }

  const handleToggleIsShort = () => {
    onChange();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
    location.pathname === "/movies" && localStorage.setItem("searchQuery", searchQuery);
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__form-container">
          <div className="search__form-field">
            <input
              id="search__form-input"
              value={searchQuery || ''}
              required
              className="search__form-input"
              name="search-input"
              placeholder="Фильм"
              onChange={handleChange}>
            </input>
          </div>
          <button className={buttonClassName} disabled={searchQuery === ''} type="submit"></button>
        </div>
          <FilterCheckbox isChecked={isCheckboxChecked} onChange={handleToggleIsShort} />
      </form>
    </div>
  )
}

export default SearchForm;
