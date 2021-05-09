import React, { useEffect } from "react";
import "../assets/styles/homePage.css";
import SelectLocation from "../components/homePage/SelectLocation";
import Services from "../components/homePage/Services";

import Navigation from "../components/homePage/Navigation";
import { Link } from "react-router-dom";

/*
this is the hopepage component
it acts as a wrapper to all the other components

*/

function HomePage() {
  /* the following code below checks if location is available and then logs it to console
  if location is unavailable its logs it too
  */
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {});
    } else {
    }
  }, []);

  //classname for the wrapper div
  //in future homepage__wrapper--dark will be used for dark theme
  //the classname should be generated procedualy in that case
  let wrapperDivClass = "homepage__wrapper homepage__wrapper--light";

  return (
    <>
      <Navigation />
      <div className={wrapperDivClass}>
        <Link to="/hospitals">
        	<div
        	  style={{
        	    position: "fixed",
        	    bottom: "1em",
        	    right: "1em",
        	    padding: "1em 1.2em",
        	    background: "#5600e7",
        	    zIndex: "5",
        	    borderRadius: "50%",
        	    fontSize: "1.5rem",
        	    color: "white",
        	  }}
        	>
        	  <FontAwesomeIcon icon={faPlus} />
        	</div>
        </Link>
        {/* the top right profile icon */}
        <Link to="/login">
          <div className="homepage__profile">
            <div className="homepage__profile--tag">Hey, User</div>
            <div className="homepage__profile--avatar" />
          </div>
        </Link>
        {/* headings */}
        <div className="homepage__heading">
          <h3>Covid-19</h3>
          <h2>Help Resources</h2>
        </div>
        {/* (select option to select location and the cards based on categories )
        separated into thier own components
      */}
        <SelectLocation />
        <Services />
      </div>
    </>
  );
}

export default HomePage;
