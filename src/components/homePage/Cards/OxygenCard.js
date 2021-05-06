import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPhoneAlt,
  faMapMarkerAlt,
  faStar,
  faAngleDown,
  faPumpMedical,
} from "@fortawesome/free-solid-svg-icons";

/* generates cards based on data provided on prop*/
// make similar sturture for other cards like vacccine and beds
//uses font awesome for icons

function OxygenCard(props) {
  return (
    <div className="HP__card--oxygen HP__card">
      <div className="HP__card--header">
        <div>
          <div className="location">{props.place}</div>
          {/* <div className="verified">
            <FontAwesomeIcon icon={faCheck} />
          </div> */}
        </div>
        <div className="status-wrapper">
          <div className="status available">Unavailable</div>
          <div className="updated">updated {props.updated} ago</div>
        </div>
      </div>
      <div className="HP__card--information">
        <div className="phone tag">
          <FontAwesomeIcon icon={faPhoneAlt} color="#01C853" />
          <span>{props.phone}</span>
        </div>
        <div className="location tag">
          <FontAwesomeIcon icon={faMapMarkerAlt} color="#2196F3" />
          <span>{props.location}</span>
        </div>
        <div className="HP__cards--flex">
          <div className="stars tag">
            <FontAwesomeIcon icon={faStar} color="#FFFF00" />
            <span>{props.rating}</span>
          </div>
          <div className="oxygen tag">
            <FontAwesomeIcon icon={faPumpMedical} color="#2196F3" />
            <span>{props.stock} Cylinders</span>
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
    </div>
  );
}

export default OxygenCard;