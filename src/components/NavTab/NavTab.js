import './NavTab.css';
import React from "react";

function NavTab() {
  return (
    <nav className="navtab">
      <button className="navtab__button">О проекте</button>
      <button className="navtab__button">Технологии</button>
      <button className="navtab__button">Студент</button>
    </nav>

  );
}

export default NavTab;
