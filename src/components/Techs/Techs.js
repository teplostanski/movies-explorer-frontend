import './Techs.css';
import React from "react";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__main">
        <h3 className="techs__title">Технологии</h3>
        <div className="techs__content">
          <h2 className="techs__main-title">7 технологий</h2>
          <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
            проекте.</p>
          <ul className="techs__tools">
            <button className="techs__button">HTML</button>
            <button className="techs__button">CSS</button>
            <button className="techs__button">JS</button>
            <button className="techs__button">React</button>
            <button className="techs__button">Git</button>
            <button className="techs__button">Express.js</button>
            <button className="techs__button">mongoDB</button>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
