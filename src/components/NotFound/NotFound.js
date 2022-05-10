import './NotFound.css';
import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__text">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Страница не найдена</h2>
      </div>
      <div className="not-found__return-block">
        <Link to="/" className="not-found__return-link">Назад</Link>
      </div>
    </div>

  );
}

export default NotFound;
