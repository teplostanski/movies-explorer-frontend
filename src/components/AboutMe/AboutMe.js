import './AboutMe.css';
import React from "react";
import photoPath from '../../images/author-photo/photo.jpg';
import Portfolio from "../Portfolio/Portfolio";


function AboutMe() {
  return (
    <section className="author" id="author">
      <h3 className="author__title">Студент</h3>
      <div className="author__content">
        <article className="author__column">
          <h3 className="author__name">Игорь</h3>
          <p className="author__profession">26 лет</p>
          <p className="author__description">Обо мне </p>
          <ul className="author__links">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="author__link">Facebook</a>
            <a href="https://github.com/r0bomurlok?tab=repositories" rel="noreferrer" className="author__link" >Github</a>
          </ul>
        </article>
          <img className="author__photo" src={photoPath} alt="Фото автора"/>
      </div>
      <Portfolio/>
    </section>

  );
}

export default AboutMe;
