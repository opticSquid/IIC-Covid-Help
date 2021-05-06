import React, { useState } from "react";
import "../../assets/styles/verticalNavigation.css";

/* the vertical location bar */

function Navigation() {
  /* for detecting the active link in the navigation */
  const [count, setCount] = useState(0);
  const isActive = (n) => {
    if (n === count) {
      return "navigation--active";
    }
  };
  return (
    // sidebar navigation
    <nav className="navigation">
      <div className="navigation__logo"></div>
      <div className="navigation--vertical">
        <div onClick={() => setCount(0)} className={isActive(0)}>
          Home
          <div></div>
        </div>
        <div onClick={() => setCount(1)} className={isActive(1)}>
          Saved
          <br />
          Places
          <div></div>
        </div>
        <div onClick={() => setCount(2)} className={isActive(2)}>
          Contact
          <br />
          Us
          <div></div>
        </div>
      </div>
    </nav>
  );
}
/* links with react router to be added in future */
export default Navigation;
