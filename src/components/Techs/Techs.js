import './Techs.css';
import React from "react";

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__main">
        <h3 className="techs__title">Технологии</h3>
        <div className="techs__content">
          <h2 className="techs__main-title">7 технологий</h2>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
            проекте.</p>
          <ul className="techs__tools">
            <a href="https://ru.wikipedia.org/wiki/HTML" target="_blank" rel="noreferrer">
              <button className="techs__button">HTML</button>
            </a>
            <a href="https://ru.wikipedia.org/wiki/CSS" target="_blank" rel="noreferrer">
              <button className="techs__button">CSS</button>
            </a>
            <a href="https://ru.wikipedia.org/wiki/JavaScript" target="_blank" rel="noreferrer">
              <button className="techs__button">JS</button>
            </a>
            <a href="https://ru.reactjs.org" target="_blank" rel="noreferrer">
              <button className="techs__button">React</button>
            </a>
            <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
              <button className="techs__button">Git</button>
            </a>
            <a href="https://expressjs.com/ru" target="_blank" rel="noreferrer">
              <button className="techs__button">Express.js</button>
            </a>
            <a href="https://www.mongodb.com" target="_blank" rel="noreferrer">
              <button className="techs__button">mongoDB</button>
            </a>
          </ul>
        </div>
      </div>
    </section>

  );
}

export default Techs;
