import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPhoneAlt,
  faMapMarkerAlt,
  faStar,
  faAngleDown,
  faEnvelope,
  faUserMd,
  faSyringe,
  faPills,
} from "@fortawesome/free-solid-svg-icons";

function VaccineCard(props) {
  const spring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };
  const calcTimeDiff = (time) => {
    let now = new Date();
    time = new Date(time);
    let secdiff = (now.getTime() - time.getTime()) / 1000;
    if (secdiff >= 86400) return `${Math.round(secdiff / 86400)} days`;
    else if (secdiff >= 3600) return `${Math.round(secdiff / 3600)} hrs`;
    else if (secdiff >= 60) return `${Math.round(secdiff / 60)} mins`;
    else return `${Math.round(secdiff)} seconds`;
  };
  const ratingSum = props.rating.reduce(function (a, b) {
    return a + b;
  }, 0);
  const isAvailable = props.available ? (
    <div className="status available">Available</div>
  ) : (
    <div className="status">Unavailable</div>
  );
  const animVarient = {
    in: {
      opacity: 0,
    },
    out: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      transition={spring}
      initial={animVarient.in}
      animate={animVarient.out}
      layout
      className="HP__card--oxygen HP__card"
    >
      <div className="HP__card--header">
        <div>
          <div className="location">{props.place}</div>
          {/* <div className="verified">
            <FontAwesomeIcon icon={faCheck} />
          </div> */}
        </div>
        <div className="status-wrapper">
          {isAvailable}
          <div className="updated">{calcTimeDiff(props.updated)} ago</div>
        </div>
      </div>
      <div className="HP__card--information">
        <a style={{ fontWeight: "400" }} href={"tel:" + props.phone}>
          <div className="phone tag">
            <FontAwesomeIcon icon={faPhoneAlt} color="#01C853" />
            <span>{props.phone}</span>
          </div>
        </a>
        <div className="location tag">
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#2196F3" />
          <span>{props.location}</span>
        </div>
        <div className="varient tag">
          <FontAwesomeIcon icon={faSyringe} color="#e21d2a" />
          <span>{props.vaccine}</span>
        </div>
        <div className="HP__cards--flex">
          <div className="stars tag">
            <FontAwesomeIcon icon={faStar} color="#FFFF00" />
            <span>
              {props.rating.length > 0
                ? (ratingSum / props.rating.length).toFixed(2)
                : (5.0).toString()}
            </span>
          </div>
          <div className="oxygen tag">
            <FontAwesomeIcon icon={faPills} color="#e21d2a" />
            <span>{props.stock} Dosage</span>
          </div>
        </div>
      </div>
      <div className="HP__card--footer">
        <div>
          <span>
            <FontAwesomeIcon icon={faAngleDown} color="#707070" />{" "}
          </span>
          More Details
        </div>
        <div>
          <FontAwesomeIcon icon={faCheck} color="#fff" />
        </div>
      </div>
    </motion.div>
  );
}

export default VaccineCard;
