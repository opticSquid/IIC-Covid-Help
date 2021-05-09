import React, { useEffect } from "react";
import "../assets/styles/homePage.css";
import SelectLocation from "../components/homePage/SelectLocation";
import Services from "../components/homePage/Services";
import { useStateContext } from "../contexts/ContextProvider";
import Navigation from "../components/homePage/Navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/*
this is the hopepage component
it acts as a wrapper to all the other components

*/

function HomePage() {
  /* the following code below checks if location is available and then logs it to console
  if location is unavailable its logs it too
  */
  const location = {
    type: "Point",
    coordinates: ["87.784956", "22.884775"],
  };
  const t = {
    // Location: {
    //   type: "Point",
    //   coordinates: ["87.784956", "22.884775"],
    // },
    Radius: 25,
    SortBy: "Oxygen",
    Location: ["87.784956", "22.884775"],
  };

  const fetchData = async () => {
    try {
      const data = await axios
        .get("https://stormy-temple-98364.herokuapp.com/getHealthCentres", {
          Location: {
            type: "Point",
            coordinates: [87.784956, 22.884775],
          },
          Radius: 2500,
          SortBy: "Vaccine",
        })
        .then(function (response) {
          console.log(response);
          dispatch({
            type: "Update Data",
            data: response.data,
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {});
    } else {
    }
  }, []);

  useEffect(() => fetchData(), []);

  const [{ origin, data }, dispatch] = useStateContext();
  // console.log(origin);
  // console.log(data || "NO DATA");
  // console.log(dispatch);
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
          <h2 style={{ margin: 0 }}>Help Resources</h2>
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
