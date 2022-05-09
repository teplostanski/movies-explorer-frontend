import './SearchForm.css';
import React from "react";
import photoPath from '../../images/author-photo/photo.jpg';
import Portfolio from "../Portfolio/Portfolio";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }
  return (
    <div className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__form-field">
          <input id="search__form-input" required className="search__form-input"
                 name="search-input" placeholder="Фильм"/>
          <button className="search__submit-button" type="submit">Поиск</button>
        </div>
        <FilterCheckbox/>
      </form>
    </div>
  );
}

export default SearchForm;
