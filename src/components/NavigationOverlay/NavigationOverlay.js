import { Link, NavLink } from "react-router-dom";
import ProfileButton from "../ProfileButton/ProfileButton";

const NavigationOverlay = ({ isChecked, onCloseMenu }) => {

  const closeOverlay = () => {
    onCloseMenu()
  }
  const linkActiveClass = ({ isActive }) => {
    return `navigation__list-item ${isActive && "navigation__list-item_active"}`;
  }

  return (
    <article className={`navigation__overlay ${isChecked && "navigation__overlay_active"}`}>
      <div className="navigation">
        <div>
          <NavLink to="/" onClick={closeOverlay} className={linkActiveClass}>Главная</NavLink>
          <NavLink to="/movies" onClick={closeOverlay} className={linkActiveClass}>Фильмы</NavLink>
          <NavLink to="/saved-movies" onClick={closeOverlay} className={linkActiveClass}>Сохранённые фильмы</NavLink>
        </div>
        <Link to="/profile" onClick={closeOverlay}>
          <ProfileButton/>
        </Link>
      </div>
    </article>
  )
}

export default NavigationOverlay;
