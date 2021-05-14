import React, { useState } from "react";
import "../../assets/styles/verticalNavigation.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHome,
  faInfoCircle,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";

/* the vertical location bar */

function Navigation() {
  const location = useLocation();
  const initCount = () => {
    if (location.pathname === "/") return 0;
    else if (location.pathname === "/about") return 2;
  };
  /* for detecting the active link in the navigation */
  const [count, setCount] = useState(initCount());
  const isActive = (n) => {
    if (n === count) {
      return "navigation--active";
    }
  };
  return (
    // sidebar navigation
    <>
      <nav className="navigation">
        <div className="navigation__logo" />
        <div className="navigation--vertical">
          <Link to="/">
            <div onClick={() => setCount(0)} className={isActive(0)}>
              Home
              <div />
            </div>
          </Link>
          <div onClick={() => setCount(1)} className={isActive(1)}>
            Saved
            <br />
            Places
            <div />
          </div>
          <Link to="/about">
            <div onClick={() => setCount(2)} className={isActive(2)}>
              About
              <br />
              Us
              <div />
            </div>
          </Link>
          <div onClick={() => setCount(3)} className={isActive(3)}>
            Contact
            <br />
            Us
            <div />
          </div>
        </div>
      </nav>
      <nav className="navigation--horizontal">
        <div>
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div>
          <FontAwesomeIcon icon={faMapMarkedAlt} />
        </div>
        <Link to="/about">
          <div>
            <FontAwesomeIcon icon={faInfoCircle} />
          </div>
        </Link>
        <div>
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
      </nav>
    </>
  );
}
/* links with react router to be added in future */
export default Navigation;
