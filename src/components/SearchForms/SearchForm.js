import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import './SearchForm.css';


function SearchForm(props) {
  const { onSubmit } = props;
  const [isShort, setIsShort] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const buttonClassName = isValid ? "search__submit-button" : "search__submit-button search__submit-button_inactive"

  function onSearchQueryChange(e) {
    setSearchQuery(e.currentTarget.value);
    setIsValid(e.target.checkValidity())
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ searchQuery, isShort });
    setSearchQuery("")
  }

  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
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
          <button className={buttonClassName} type="submit"></button>
        </div>
        <span className="search__form-error">{isValid ? "" : "Введите ключевое слово"}</span>
        <FilterCheckbox onChange={setIsShort}/>
      </form>
    </div>
  );
}

export default SearchForm;
