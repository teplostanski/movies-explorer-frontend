import './AboutProject.css';
import React from "react";
import NavTab from "../NavTab/NavTab";

function AboutProject() {
  return (
    <section className="about">
      <h3 className="about__title">О проекте </h3>
      <div className="about__columns">
        <article className="about__column">
          <h4 className="about__column-title">Дипломный проект включал 5 этапов</h4>
          <p className="about__column-text"> Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </article>
        <article className="about__column">
          <h4 className="about__column-title">На выполнение диплома ушло 4 недели</h4>
          <p className="about__column-text"> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about__roadmap">
        <div className="about__roadmap-block about__roadmap-block_backend">
          <div className="about__time about__time_backend">1 неделя</div>
          <span className="about__roadmap-title"> Back-end </span>
        </div>
        <div className="about__roadmap-block about__roadmap-block_frontend">
          <div className="about__time about__time_fronted">5 недель</div>
          <span className="about__roadmap-title"> Front-end </span>
        </div>
      </div>

    </section>

  );
}

export default AboutProject;
