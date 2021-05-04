import React from "react";
import "../assets/styles/homePage.css";

function HomePage() {
  let wrapperDivClass = "homepage__wrapper homepage__wrapper--light";

  return (
    <div className={wrapperDivClass}>
      <div className="homepage__header">
        <div className="homepage__logo"></div>
        <div className="homepage__profile">
          <div className="homepage__profile--tag">Hey, User</div>
          <div className="homepage__profile--avatar"></div>
        </div>
      </div>
      <div className="homepage__nav--vertical">
        <div className="active">
          Home
          <div></div>
        </div>
        <div className="">
          Saved
          <br />
          Places
          <div></div>
        </div>
        <div>
          Contact
          <br />
          Us
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
