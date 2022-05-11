import './Footer.css';
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2022 </p>
        <ul className="footer__links">
          <li className="footer__link">
            <a href="https://practicum.yandex.ru/" className="footer__link-name" target="_blank" rel="noreferrer"> Яндекс.Практикум </a>
          </li>
          <li className="footer__link">
            <a href="https://github.com/r0bomurlok?tab=repositories" className="footer__link-name" target="_blank" rel="noreferrer"> Github </a>
          </li>
          <li className="footer__link">
            <a href="https://www.facebook.com/" className="footer__link-name" target="_blank" rel="noreferrer"> Facebook </a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;
