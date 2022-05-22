import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';


function SearchForm(props) {
  const { defaultSearchQuery, defaultIsShort, onSubmit, allowSubmitWithoutQuery } = props;
  const [isShort, setIsShort] = React.useState(defaultIsShort || false);
  const [searchQuery, setSearchQuery] = React.useState(defaultSearchQuery || "");
  const [isValid, setIsValid] = React.useState(false);
  const buttonClassName = isValid ? "search__submit-button" : "search__submit-button search__submit-button_inactive"

  function onSearchQueryChange(e) {
    setSearchQuery(e.currentTarget.value);
    setIsValid(e.target.checkValidity())
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ searchQuery, isShort });
  }

  function handleToggleIsShort(value) {
    if (searchQuery || allowSubmitWithoutQuery) {
      onSubmit({ searchQuery, isShort: value });
    }
    setIsShort(value);
  }

  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
      <div className="search__form-container">
        <div className="search__form-field">
            <input
              id="search__form-input"
              value={searchQuery}
              required
              className="search__form-input"
              name="search-input"
              placeholder="Фильм"
              onChange={onSearchQueryChange}
            />

          </div>
          <button className={buttonClassName} type="submit"></button>
      </div>


        <FilterCheckbox defaultValue={defaultIsShort} onChange={handleToggleIsShort}/>
      </form>
    </div>
  );
}

export default SearchForm;
