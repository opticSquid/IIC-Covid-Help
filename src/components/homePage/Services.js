import React, { useState, useEffect, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import Card from "./Cards/Card";

function Services() {
  const checkboxRef = createRef();
  const radiusRef = createRef();
  const [radius, setRadius] = useState(5);
  const sortList = ["Oxygen", "Normal Bed", "ICU Bed", "Doctor", "Vaccine"];

  const [{ origin, data }, dispatch] = useStateContext();
  // console.log(data?.Centres || "NO DATA");
  /* this variable sets the active selection from diffrent categories
  like oxygen/beds/vaccines etc*/
  const [active, setActive] = useState(0);

  //generates the active classname based on user selected option
  const isActive = (n) => {
    if (n === active) {
      return "active";
    }
  };

  const fetchData = (pos) => {
    let crd = pos.coords;
    let locationDoc = {
      Location: {
        type: "Point",
        coordinates: [crd.longitude, crd.latitude],
      },
      Radius: parseInt(radius),
      SortBy: sortList[active],
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

  // useeffect to fetch data
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
  }, [active, radius]);

  //controlled checkbox input
  const checkboxControl = () => {
    if (checkboxRef.current.checked) {
      setActive(2);
    } else {
      setActive(1);
    }
  };

  // controlled input for radius
  const searchControl = () => {
    setRadius(radiusRef.current.value);
    // console.log(radiusRef.current.value);
  };

  // this function builds the checkbox to show icu beds
  const checkbox = (
    <div className="icu">
      <div>ICU BEDS</div>
      <div>
        <input
          onChange={checkboxControl}
          ref={checkboxRef}
          type="checkbox"
          id="switch"
        />
        <label htmlFor="switch">Toggle</label>
      </div>
    </div>
  );

  //the following function builds the cards
  const cardBuilder = () => {
    return data?.Centres.map((cardData) => {
      return <Card key={cardData.uid} active={active} data={cardData} />;
    });
  };

  const noneBuilder = () => {
    if (data?.Centres?.length === 0) {
      return (
        <div className="HP__noData">
          <h4>No Data Found</h4>
          <h5>Please enter a larger search radius.</h5>
        </div>
      );
    }
  };

  return (
    <>
      <div className="HPCat__selector">
        <div className={isActive(0)} onClick={() => setActive(0)}>
          Oxygen
        </div>
        <div
          className={isActive(1) || isActive(2)}
          onClick={() => setActive(1)}
        >
          Hospital Beds
        </div>
        <div className={isActive(3)} onClick={() => setActive(3)}>
          Doctors
        </div>
        <div className={isActive(4)} onClick={() => setActive(4)}>
          Vaccine
        </div>
      </div>
      <div className="HPCat__search--container">
        <input
          ref={radiusRef}
          type="number"
          placeholder="Enter Search Radius in Km"
        />
        <div onClick={searchControl}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3 className="HPCat--h3">Nearby Places</h3>
      {active === 1 || active === 2 ? checkbox : ""}
      {/* {btnBuilder} */}
      {noneBuilder()}
      <div className="HP__cards--container">{cardBuilder()}</div>
    </>
  );
}

export default Services;
