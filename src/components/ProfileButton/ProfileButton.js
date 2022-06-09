import './ProfileButton.css';
import profileLogoPath from "../../images/header/icon-acc.svg";
//import {Link} from "react-router-dom";

function ProfileButton() {
  return (
    <div className="header__profile-link">
      <button className="header__profile-button">
        <img className="header__profile-logo" src={profileLogoPath} alt="Профиль лого"/>
        <span>Аккаунт</span>
      </button>
    </div>
  );
}

export default ProfileButton;
