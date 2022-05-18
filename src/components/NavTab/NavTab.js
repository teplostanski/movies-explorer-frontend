import './NavTab.css';
import React from "react";
import {HashLink} from 'react-router-hash-link';

function NavTab() {
  return (
    <nav className="navtab">
      <HashLink to="#about">
        <button className="navtab__button">О проекте</button>
      </HashLink>
      <HashLink to="#techs">
        <button className="navtab__button">Технологии</button>
      </HashLink>
      <HashLink to="#author">
        <button className="navtab__button">Студент</button>
      </HashLink>

    </nav>

  );
}

export default NavTab;
