import React from "react";
import "./FilterCheckbox.css"

function FilterCheckbox() {
  const [isToggled, setIsToggled] = React.useState(false);
  const indicatorClassName = isToggled ? "checkbox__indicator checkbox__indicator_active" : "checkbox__indicator";
  const onClickHandler = () => {
    setIsToggled(!isToggled);
  };
  return (
        <div className="checkbox">
          <div className="checkbox__toggle" onClick={onClickHandler}>
            <input id="toggle" type="checkbox"/>
            <div className={indicatorClassName}/>
          </div>
          <label htmlFor="toggle" className="checkbox__label">Короткометражки</label>
        </div>
  );
}

export default FilterCheckbox;
