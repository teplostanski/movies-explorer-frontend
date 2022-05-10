import './ProfileButton.css';
import profileLogoPath from "../../images/header/icon-acc.svg";
import {Link} from "react-router-dom";


function ProfileButton() {
  return (
    <Link to="/profile" className="header__profile-link">
      <button className="header__profile-button">
        <img className="header__profile-logo" src={profileLogoPath}/>
        <span>Аккаунт</span>
      </button>
    </Link>
  );
}

export default ProfileButton;
