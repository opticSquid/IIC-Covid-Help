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
  const [{ origin, userName }, dispatch] = useStateContext();
  const fetchData = (pos) => {
    let crd = pos.coords;
    let locationDoc = {
      Location: {
        type: "Point",
        coordinates: [crd.longitude, crd.latitude],
      },
      Radius: 5,
      SortBy: "Oxygen",
    };
    // console.log("Request that will be going: ", locationDoc);
    axios
      .post(`${origin}/getHealthCentres`, locationDoc)
      .then((response) => {
        // console.log(response);
        dispatch({
          type: "Update Data",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("Error occoured while fetching data from backend", error);
      });
  };
  const errors = (err) => {
    alert(
      "Location Permission Denied! Emable permission to detect location",
      err
    );
  };
  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(fetchData);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(fetchData, errors, options);
        } else if (result.state === "denied") {
          alert(
            "Location Permission Denied! Emable permission to detect location"
          );
        }
        result.onchange = function () {};
      });
    } else {
      alert("Sorry Not available!");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(origin);
  // console.log(data?.Centres || "NO DATA");
  // console.log(dispatch);
  //classname for the wrapper div
  //in future homepage__wrapper--dark will be used for dark theme
  //the classname should be generated procedualy in that case
  let wrapperDivClass = "homepage__wrapper homepage__wrapper--light";

  const buildRouteToHospital = () => {
    if (localStorage.getItem("refreshToken") === null) {
      return "/login";
    } else {
      return "/hospitals";
    }
  };

  const buildLoginText = () => {
    if (localStorage.getItem("refreshToken") === null) {
      return "Login";
    } else {
      return `Hello, ${userName} click to logout`;
    }
  };
  const buildLoginLink = () => {
    if (localStorage.getItem("refreshToken") === null) {
      return "/login";
    } else {
      return "/login";
    }
  };

  const handleLogout = () => {
    if (localStorage.getItem("refreshToken") !== null) {
      const x = window.confirm("Are you sure, you want to logout?");
      if (x) {
        axios
          .delete(`${origin}/logout`, {
            headers: { accesstoken: sessionStorage.getItem("accessToken") },
          })
          .then((response) => {
            if (response.data.status === "Logged Out") {
              try {
                sessionStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({
                  type: "Remove name",
                });
              } catch (err) {
                console.log(err);
              }
            } else {
              alert("Could not Logout the user Try again.");
            }
          })
          .catch((error) => {
            alert("Could not send request to Servers for this reason", error);
          });
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className={wrapperDivClass}>
        <Link to={buildRouteToHospital()}>
          <div className="hospital--route">
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Link>
        {/* the top right profile icon */}
        <Link to={buildLoginLink()} onClick={handleLogout}>
          <div className="homepage__profile">
            <div className="homepage__profile--tag">{buildLoginText()}</div>
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
