import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import OxygenCard from "./Cards/OxygenCard";
import { DataContext } from "../../contexts/DataContextProvider";
import BedCard from "./Cards/BedCard";

function Services() {
  /* uses oxygen context for data */ const data = useContext(DataContext);

  /* this variable sets the active selection from diffrent categories
  like oxygen/beds/vaccines etc*/
  const [active, setActive] = useState(0);

  //generates the active classname based on user selected option
  const isActive = (n) => {
    if (n === active) {
      return "active";
    }
  };

  const btnBuilder = data.isLogin ? (
    <div className="HP__add">
      <span style={{ margin: ".5rem" }}>
        <FontAwesomeIcon icon={faPlus} />
      </span>
      ADD DATA
    </div>
  ) : (
    ""
  );
  //the following function makes the cards that are to be shown
  // data comes from oxygen context
  // dynamic : based on user selction
  // only oxygen works as of now
  const cardBuilder = () => {
    if (active === 0) {
      return data.oxygen.map((card) => {
        return (
          <OxygenCard
            key={card.id}
            place={card.place}
            updated={card.updated}
            available={card.available}
            phone={card.phone}
            location={card.location}
            rating={card.rating}
            stock={card.stock}
          />
        );
      });
    } else if (active === 1) {
      return data.bed.map((card) => {
        return (
          <BedCard
            key={card.id}
            place={card.place}
            updated={card.updated}
            available={card.available}
            phone={card.phone}
            location={card.location}
            rating={card.rating}
            stock={card.stock}
          />
        );
      });
    }
  };

  return (
    <>
      <div className="HPCat__selector">
        <div className={isActive(0)} onClick={() => setActive(0)}>
          Oxygen
        </div>
        <div className={isActive(1)} onClick={() => setActive(1)}>
          Hospital Beds
        </div>
        <div className={isActive(2)} onClick={() => setActive(2)}>
          Medicines
        </div>
        <div className={isActive(3)} onClick={() => setActive(3)}>
          Vaccine
        </div>
      </div>
      <div className="HPCat__search--container" style={{width:"63em",zIndex:"5", height:"3em",boxShadow:"0px 0px 15px 0px rgba(0, 0, 0, 0.2)"}}>
        <input type="text" placeholder="Enter Search Radius" />
        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3 className="HPCat--h3">Nearby Places</h3>
      {btnBuilder}
      <div className="HP__cards--container">{cardBuilder()}</div>
    </>
  );
}

export default Services;
