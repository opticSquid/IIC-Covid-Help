import React, { useState, useEffect, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OxygenCard from "./Cards/OxygenCard";
import BedCard from "./Cards/BedCard";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import DoctorCard from "./Cards/DoctorCard";
import VaccineCard from "./Cards/VaccineCard";
import { v4 as uuidv4 } from "uuid";
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
      Radius: radius,
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

  const checkboxControl = () => {
    if (checkboxRef.current.checked) {
      setActive(2);
    } else {
      setActive(1);
    }
  };

  const searchControl = () => {
    setRadius(radiusRef.current.value);
    // console.log(radiusRef.current.value);
  };

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
  //the following function makes the cards that are to be shown
  // data comes from oxygen context
  // dynamic : based on user selction
  // only oxygen works as of now

  const cardBuilder = () => {
    return <Card />;

    // return data?.Centres.map((card) => {
    //   return (
    //     <OxygenCard
    //       key={card.uid}
    //       place={card?.FacilityName}
    //       updated={card?.updatedAt}
    //       phone={card?.PhoneNumber}
    //       location={card?.Address?.StreetAddress?.District}
    //       rating={card.Rating}
    //       stock={card?.Oxygen}
    //     />
    //   );
    // });

    // if (active === 0) {
    //   return data?.Centres.map((card) => {
    //     return (
    //       <OxygenCard
    //         key={card.uid}
    //         place={card?.FacilityName}
    //         updated={card?.updatedAt}
    //         phone={card?.PhoneNumber}
    //         location={card?.Address?.StreetAddress?.District}
    //         rating={card.Rating}
    //         stock={card?.Oxygen}
    //       />
    //     );
    //   });
    // } else if (active === 1) {
    //   return data?.Centres.map((card) => {
    //     return (
    //       <BedCard
    //         key={card.uid}
    //         place={card?.FacilityName}
    //         updated={card?.updatedAt}
    //         phone={card?.PhoneNumber}
    //         location={card?.Address?.StreetAddress?.District}
    //         rating={card?.Rating}
    //         mail={card?.Email}
    //         stock={card?.Beds?.Normal}
    //         type="normal"
    //       />
    //     );
    //   });
    // } else if (active === 2) {
    //   return data?.Centres.map((card) => {
    //     return (
    //       <BedCard
    //         key={uuidv4()}
    //         place={card?.FacilityName}
    //         updated={card?.updatedAt}
    //         phone={card?.PhoneNumber}
    //         location={card?.Address?.StreetAddress?.District}
    //         rating={card?.Rating}
    //         mail={card?.Email}
    //         stock={card?.Beds?.ICU}
    //         type="ICU"
    //       />
    //     );
    //   });
    // } else if (active === 3) {
    //   return data?.Centres.map((card) => {
    //     return (
    //       <DoctorCard
    //         key={card.uid}
    //         place={card?.FacilityName}
    //         updated={card?.updatedAt}
    //         phone={card?.PhoneNumber}
    //         location={card?.Address?.StreetAddress?.District}
    //         rating={card?.Rating}
    //         mail={card?.Email}
    //         stock={card?.Doctors}
    //       />
    //     );
    //   });
    // } else if (active === 4) {
    //   return data?.Centres.map((card) => {
    //     return (
    //       <VaccineCard
    //         key={card.uid}
    //         place={card?.FacilityName}
    //         updated={card?.updatedAt}
    //         phone={card?.PhoneNumber}
    //         location={card?.Address?.StreetAddress?.District}
    //         rating={card?.Rating}
    //         vaccine={card?.CovidVaccines?.VaccineName}
    //         stock={card?.CovidVaccines?.Quantity}
    //         available={card?.CovidVaccines?.Available}
    //       />
    //     );
    //   });
    // }
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
          type="tel"
          placeholder="Enter Search Radius in Km"
        />
        <div onClick={searchControl}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3 className="HPCat--h3">Nearby Places</h3>
      {active === 1 || active === 2 ? checkbox : ""}
      {/* {btnBuilder} */}
      <div className="HP__cards--container">{cardBuilder()}</div>
    </>
  );
}

export default Services;
