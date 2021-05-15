import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  // faCheck,
  faPhoneAlt,
  faMapMarkerAlt,
  // faStar,
  faAngleDown,
  faSyringe,
  faPumpMedical,
  faUserMd,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/card.css";

function Card(props) {
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
  // const ratingSum = props?.rating?.reduce(function (a, b) {
  //   return a + b;
  // }, 0);
  // const isAvailable = props.available ? (
  //   <div className="status available">Available</div>
  // ) : (
  //   <div className="status">Unavailable</div>
  // );
  let isAvailable = () => {
    let av = false;
    if (props.active === 0 && props?.data?.Oxygen > 0) av = true;
    else if (props.active === 1 && props?.data?.Beds?.Normal > 0) av = true;
    else if (props.active === 2 && props?.data?.Beds?.ICU > 0) av = true;
    else if (props.active === 3 && props?.data?.Doctors > 0) av = true;
    else if (props.active === 4 && props?.data?.CovidVaccines.Available) {
      av = true;
    }

    if (av) {
      return <div className="status available">Available</div>;
    } else {
      return <div className="status">Unavailable</div>;
    }
  };
  const animVarient = {
    in: {
      opacity: 0,
    },
    out: {
      opacity: 1,
    },
  };

  const tagBuilder = (text, icon, color) => {
    if (text) {
      return (
        <div className="tag">
          <FontAwesomeIcon icon={icon} color={color} />
          <span>{text}</span>
        </div>
      );
    } else {
      return "";
    }
  };

  const buildoxygen = () => {
    if (props?.data?.Oxygen > 0) {
      return tagBuilder(
        props?.data?.Oxygen + " Cylinder Oxygen",
        faPumpMedical,
        "#fa764d"
      );
    }
  };
  const buildVaccine = () => {
    if (props?.data?.CovidVaccines.Available) {
      return (
        <div className="tag">
          <FontAwesomeIcon icon={faSyringe} color="#7e70fa" />
          <span>
            {props?.data?.CovidVaccines?.VaccineName} (
            {props?.data?.CovidVaccines?.Quantity})
          </span>
        </div>
      );
    }
  };
  const buildRegBed = () => {
    if (props?.data?.Beds?.Normal > 0) {
      return (
        <div className="tag">
          <FontAwesomeIcon icon={faBed} color="#22e38c" />
          <span>{props?.data?.Beds?.Normal} Regular Beds</span>
        </div>
      );
    }
  };
  const buildICUBed = () => {
    if (props?.data?.Beds?.ICU > 0) {
      return (
        <div className="tag">
          <FontAwesomeIcon icon={faBed} color="#c40a1c" />
          <span>{props?.data?.Beds?.ICU} ICU Beds</span>
        </div>
      );
    }
  };
  const buildDoctor = () => {
    if (props?.data?.Doctors > 0) {
      return (
        <div className="tag">
          <FontAwesomeIcon icon={faUserMd} color="#e31b5e" />
          <span>{props?.data?.Doctors} Doctors</span>
        </div>
      );
    }
  };
  const editLink = `/edit/${props.data.uid}`;
  const buildEdit = () => {
    let refTk = localStorage.getItem("refreshToken");
    if (refTk !== null && refTk !== undefined) {
      return (
        <Link to={editLink}>
          <div className="card__EDIT">EDIT</div>
        </Link>
      );
    }
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
          <div className="location">{props?.data?.FacilityName}</div>
        </div>
        <div className="status-wrapper">
          {isAvailable()}
          <div className="updated">
            {calcTimeDiff(props?.data?.updatedAt)} ago
          </div>
        </div>
      </div>
      <div className="HP__card--information">
        {/* oxygen */}
        {buildoxygen()}
        {buildVaccine()}
        {buildDoctor()}
        {buildRegBed()}
        {buildICUBed()}
        {/* phone number */}
        <a
          style={{ fontWeight: "400", overflowWrap: "break-word" }}
          href={"tel:" + props.phone}
        >
          {tagBuilder(props?.data?.PhoneNumber, faPhoneAlt, "#01C853")}
        </a>
        {/* email id  */}
        {/* <a style={{ fontWeight: "400" }} href={"mailto::" + props.mail}>
          {tagBuilder(props?.data?.Email, faEnvelope, "#fa764d")}
        </a> */}
        {/* location */}
        {tagBuilder(
          props?.data?.Address?.StreetAddress?.District ||
            props?.data?.Address?.StreetAddress?.City,
          faMapMarkerAlt,
          "#2196F3"
        )}
        {/* <div className="HP__cards--flex">
          <div className="stars tag">
            <FontAwesomeIcon icon={faStar} color="#FFFF00" />
            <span>
              {props?.rating?.length > 0
                ? (ratingSum / props?.rating?.length).toFixed(2)
                : (5.0).toString()}
            </span>
          </div>
          <div className="oxygen tag">
            <FontAwesomeIcon icon={faPills} color="#e21d2a" />
            <span>{props.stock} Dosage</span>
          </div>
        </div> */}
      </div>
      {buildEdit()}
      <div className="HP__card--footer">
        <div>
          <span>
            <FontAwesomeIcon icon={faAngleDown} color="#707070" />{" "}
          </span>
          More Details
        </div>

        {/* <div>
          <FontAwesomeIcon icon={faStar} color="#FFFF00" />
          <span>
            {props?.rating?.length > 0
              ? (ratingSum / props?.rating?.length).toFixed(2)
              : (5.0).toString()}
          </span>
        </div> */}

        {/* <div>
          <FontAwesomeIcon icon={faCheck} color="#fff" />
        </div> */}
      </div>
    </motion.div>
  );
}

export default Card;
