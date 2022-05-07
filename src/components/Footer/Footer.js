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
            <a href="#" className="footer__link-name" target="_blank"> Яндекс.Практикум </a>
          </li>
          <li className="footer__link">
            <a href="#" className="footer__link-name" target="_blank"> Github </a>
          </li>
          <li className="footer__link">
            <a href="#" className="footer__link-name" target="_blank"> Facebook </a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;
