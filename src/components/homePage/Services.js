import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import OxygenCard from "./Cards/OxygenCard";
import BedCard from "./Cards/BedCard";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import DoctorCard from "./Cards/DoctorCard";
import VaccineCard from "./Cards/VaccineCard";

function Services() {
  const [{ origin, data }, dispatch] = useStateContext();
  console.log(data?.Centres || "NO DATA");
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
      Radius: 5000,
      SortBy: "Vaccines",
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
    console.log("fetching");
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
  }, [active]);

  // const btnBuilder =
  //   /*data.isLogin ?*/ 1 === 1 ? (
  //     <div className="HP__add">
  //       <span style={{ margin: ".5rem" }}>
  //         <FontAwesomeIcon icon={faPlus} />
  //       </span>
  //       ADD DATA
  //     </div>
  //   ) : (
  //     ""
  //   );
  //the following function makes the cards that are to be shown
  // data comes from oxygen context
  // dynamic : based on user selction
  // only oxygen works as of now

  const cardBuilder = () => {
    if (active === 0) {
      return data?.Centres.map((card) => {
        return (
          <OxygenCard
            key={card.uid}
            place={card?.FacilityName}
            updated={card?.updatedAt}
            phone={card?.PhoneNumber}
            location={card?.Address?.StreetAddress?.District}
            rating={card.Rating}
            stock={card?.Oxygen}
          />
        );
      });
    } else if (active === 3) {
      return data?.Centres.map((card) => {
        return (
          <DoctorCard
            key={card.uid}
            place={card?.FacilityName}
            updated={card?.updatedAt}
            phone={card?.PhoneNumber}
            location={card?.Address?.StreetAddress?.District}
            rating={card?.Rating}
            mail={card?.Email}
            stock={card?.Doctors}
          />
        );
      });
    } else if (active === 4) {
      return data?.Centres.map((card) => {
        return (
          <VaccineCard
            key={card.uid}
            place={card?.FacilityName}
            updated={card?.updatedAt}
            phone={card?.PhoneNumber}
            location={card?.Address?.StreetAddress?.District}
            rating={card?.Rating}
            vaccine={card?.CovidVaccines?.VaccineName}
            stock={card?.CovidVaccines?.Quantity}
            available={card?.CovidVaccines?.Available}
          />
        );
      });
    }
  };
  //   } else if (active === 1) {
  //     return data.bed.map((card) => {
  //       return (
  //         <BedCard
  //           key={card.id}
  //           place={card.place}
  //           updated={card.updated}
  //           available={card.available}
  //           phone={card.phone}
  //           location={card.location}
  //           rating={card.rating}
  //           stock={card.stock}
  //         />
  //       );
  //     });
  //   }
  // };

  return (
    <>
      <div className="HPCat__selector">
        <div className={isActive(0)} onClick={() => setActive(0)}>
          Oxygen
        </div>
        <div className={isActive(1)} onClick={() => setActive(1)}>
          Hospital Beds
        </div>
        <div className={isActive(3)} onClick={() => setActive(3)}>
          Doctors
        </div>
        <div className={isActive(4)} onClick={() => setActive(4)}>
          Vaccine
        </div>
      </div>
      <div
        className="HPCat__search--container"
        //   style={{
        //     width: "30em",
        //     height: "3em",
        //     boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.2)",
        //     marginLeft: "17em",
        //     marginRight: "22em",
        //   }
        // }
      >
        <input
          style={{ height: "3.3em" }}
          type="tel"
          placeholder="Enter Search Radius in Km"
        />
        <div style={{ height: "3em" }}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3 className="HPCat--h3">Nearby Places</h3>
      <div>
        ICU BEDS
        <input type="checkbox" />
      </div>
      {/* {btnBuilder} */}
      <div className="HP__cards--container">{cardBuilder()}</div>
    </>
  );
}

export default Services;
