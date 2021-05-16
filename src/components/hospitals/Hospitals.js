import React, { useState, useEffect } from "react";
import "./Hospitals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useMediaQuery } from "react-responsive";
import jwtCheck from "../Checkjwt";
import logo from "./bondhu.png";
import { Link } from "react-router-dom";

function Hospitals() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [location, setLocation] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width:750px)" });
  const [
    {
      origin,
      Oxygen,
      Normal,
      Icu,
      Doctor,
      Available,
      VaccineName,
      Quantity,
      NewHospitalLocation,
    },
    dispatch,
  ] = useStateContext();
  const [Centre, setCentre] = useState({
    facility: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    city: "",
  });
  const setValues = (event) => {
    setCentre({ ...Centre, [event.target.name]: event.target.value });
  };
  const setMaualLocation = (e) => {
    //console.log("Maual location");
    let location = e.target.value.split(",");
    let locationDoc = {
      type: "Point",
      coordinates: [parseFloat(location[1]), parseFloat(location[0])],
    };
    dispatch({
      type: "AddHospitalLocation",
      data: locationDoc,
    });
  };
  const history = useHistory();
  const success = (pos) => {
    let crd = pos.coords;

    let locationDoc = {
      type: "Point",
      coordinates: [crd.longitude, crd.latitude],
    };
    console.log(locationDoc);
    dispatch({
      type: "AddHospitalLocation",
      data: locationDoc,
    });
  };
  const errors = (err) => {
    alert(
      "Location Permission Denied! Emable permission to detect location",
      err
    );
  };
  useEffect(() => {
    if (show5 === true) {
      let options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      };

      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
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
    }
    dispatch({
      type: "AddOxygen",
      data: "",
    });
    dispatch({
      type: "AddNormalBeds",
      data: "",
    });
    dispatch({
      type: "AddICUBeds",
      data: "",
    });
    dispatch({
      type: "AddDoctors",
      data: "",
    });
    dispatch({
      type: "AddVaccineAvailable",
      data: false,
    });
    dispatch({
      type: "AddVaccineName",
      data: "",
    });
    dispatch({
      type: "AddQuantity",
      data: "",
    });
    dispatch({
      type: "AddHospitalLocation",
      data: undefined,
    });
    console.log("UseEffect firing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show5]);

  function dropdown() {
    return (
      <div className="resources">
        <div
          style={{ cursor: "pointer" }}
          id="cross"
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <ul style={{ listStyle: "none" }}>
          <li>
            <label className="options">
              <div>
                <input onClick={() => setShow1(!show1)} type="radio"></input>
              </div>
              <div style={{ cursor: "pointer" }} className="oxygen radio">
                Oxygen
              </div>
            </label>
            {show1 ? (
              <input
                style={{
                  borderRadius: "10px",
                  width: "15em",
                  height: "3em",
                  outline: "none",
                  paddingLeft: "1em",
                }}
                type="number"
                placeholder="Enter the amount of oxygen"
                onChange={(e) => {
                  dispatch({
                    type: "AddOxygen",
                    data: e.target.value,
                  });
                }}
              ></input>
            ) : null}
          </li>
          <li>
            <label className="options">
              <div>
                <input type="radio" onClick={() => setShow2(!show2)}></input>
              </div>
              <div style={{ cursor: "pointer" }} className="bed radio">
                Hospital Bed
              </div>
            </label>
            {show2 ? (
              <div>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                  }}
                  type="number"
                  placeholder="Enter number of normal beds"
                  onChange={(e) => {
                    dispatch({
                      type: "AddNormalBeds",
                      data: e.target.value,
                    });
                  }}
                ></input>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                    marginLeft: "1em",
                  }}
                  onChange={(e) => {
                    dispatch({
                      type: "AddICUBeds",
                      data: e.target.value,
                    });
                  }}
                  type="number"
                  placeholder="Enter number of ICU beds"
                ></input>
              </div>
            ) : null}
          </li>
          <li>
            <label className="options">
              <div>
                <input onClick={() => setShow3(!show3)} type="radio"></input>
              </div>
              <div style={{ cursor: "pointer" }} className="doctor radio">
                Doctor
              </div>
            </label>
            {show3 ? (
              <input
                style={{
                  borderRadius: "10px",
                  width: "16em",
                  height: "3em",
                  outline: "none",
                  paddingLeft: "1em",
                }}
                onChange={(e) => {
                  dispatch({
                    type: "AddDoctors",
                    data: e.target.value,
                  });
                }}
                type="number"
                placeholder="Enter number of doctors"
              ></input>
            ) : null}
          </li>
          <li>
            <label className="options">
              <div>
                <input type="radio" onClick={() => setShow4(!show4)}></input>
              </div>
              <div style={{ cursor: "pointer" }} className="covid19 radio">
                Covid-19 Vaccine
              </div>
            </label>
            {show4 ? (
              <div>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                  }}
                  type="text"
                  placeholder="Enter the name of the vaccine"
                  onChange={(e) => {
                    dispatch({
                      type: "AddVaccineAvailable",
                      data: true,
                    });
                    dispatch({
                      type: "AddVaccineName",
                      data: e.target.value,
                    });
                  }}
                ></input>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                    marginLeft: "1em",
                  }}
                  type="number"
                  placeholder="Enter the quantity of vaccine"
                  onChange={(e) => {
                    dispatch({
                      type: "AddVaccineAvailable",
                      data: true,
                    });
                    dispatch({
                      type: "AddQuantity",
                      data: e.target.value,
                    });
                  }}
                ></input>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
  const submitHandler = (e) => {
    e.preventDefault();
    let newCentre = {
      FacilityName: Centre.facility,
      PhoneNumber: Centre.phone,
      Email: Centre.email,
      Beds: {
        ICU: Icu,
        Normal: Normal,
      },
      Oxygen: Oxygen,
      CovidVaccines: {
        Available: Available,
        VaccineName: VaccineName,
        Quantity: Quantity,
      },
      Doctors: Doctor,
      Address: {
        Location: NewHospitalLocation,
        StreetAddress: {
          State: Centre.state,
          District: Centre.district,
          City: Centre.city,
        },
        verified: false,
      },
    };
    console.log("Document to send", newCentre);
    if (localStorage.getItem("refreshToken") !== null) {
      jwtCheck(origin)
        .then(() => {
          Axios.post(`${origin}/newHealthCentre`, newCentre, {
            headers: { accesstoken: sessionStorage.getItem("accessToken") },
          })
            .then(() => {
              history.push("/");
            })
            .catch((error) => {
              if (error)
                console.log(
                  "Error occoured while posting new hospital details",
                  error
                );
            });
        })
        .catch((error) => {
          console.log("JWT check failed for new Hospitals", error);
        });
    }
  };
  return (
    <div className="hospital--wrapper">
      <div className="hospital">
        <div className="hospital__icon">
          <Link to="/">
            <img
              style={{ maxWidth: "15em", cursor: "pointer", objectFit:"contain" }}
              src={logo}
              alt="Logo"
            ></img>
          </Link>
        </div>
        <h1>Add a new hostipal:</h1>
        <form>
          <div className="information">
            <input
              name="facility"
              className="facility__name"
              type="text"
              placeholder="Enter Facility Name"
              required
              onChange={setValues}
            ></input>
            <input
              name="phone"
              className="phone__number"
              type="tel"
              placeholder=" Enter Phone Number"
              maxLength="10"
              required
              onChange={setValues}
            ></input>
            <input
              name="email"
              className="email"
              type="email"
              placeholder=" Enter email"
              required
              onChange={setValues}
            ></input>

            <div style={{ display: "flex", marginRight: "auto" }}>
              <input
                onClick={() => {
                  setShow5(!show5);
                }}
                type="checkbox"
              ></input>
              <p style={{ paddingLeft: "1em" }}>Add location automatically</p>
            </div>

            {!show5 ? (
              <input
                name="location"
                className="location"
                type="text"
                placeholder=" Enter Location(longitude,latitude)"
                required
                onBlur={setMaualLocation}
              ></input>
            ) : null}

            {show5 ? (
              <div>
                <div
                  onClick={() => setLocation(!location)}
                  id={location ? "success__button" : "location__button"}
                >
                  <div style={{ color: location ? "black" : "white" }}>
                    {!location ? "Detect Location" : "Location Detected"}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="select__facility">
              <div className="facility" onClick={() => setShow(!show)}>
                Select the type of Facility
              </div>
              <div id="chevronDown" onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            {show ? dropdown() : null}

            <div className="street__location">
              <input
                name="state"
                id="state"
                onChange={setValues}
                type="text"
                placeholder="State"
              ></input>
              <input
                name="district"
                id="district"
                type="text"
                onChange={setValues}
                placeholder="District"
              ></input>
              <input
                name="city"
                id="city"
                type="text"
                onChange={setValues}
                placeholder="City"
              ></input>
            </div>

            <button
              className={
                isTabletOrMobile ? "mobile__submit" : "desktop__submit"
              }
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hospitals;
