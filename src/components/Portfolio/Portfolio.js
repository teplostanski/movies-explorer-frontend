import './Portfolio.css';
import React from "react";

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <p className="portfolio__item-name">Статичный сайт</p>
          <a href="#" className="portfolio__item-link"> ↗ </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-name">Адаптивный сайт</p>
          <a href="#" className="portfolio__item-link"> ↗ </a>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__item-name">Одностраничное приложение</p>
          <a href="#" className="portfolio__item-link"> ↗ </a>
        </li>

      </ul>
    </div>
  );
}

export default Portfolio;
