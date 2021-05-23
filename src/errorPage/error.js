import React from "react";
import wrong from "../svgs/wrong.svg";
import { Link, useParams } from "react-router-dom";
import "./style.css";

const Error = () => {
  const { id } = useParams();
  return (
    <div className="errorBack">
      <div className="errorbox">
        <h1 className="ErrorHead">Error</h1>
        <img className="ErrorImg" src={wrong} alt="default text" />
      </div>
        <p className="ErrorPara">{id}</p>
        <Link to="/" className="ErrorText">
          Home
        </Link>
    </div>
  );
};

export default Error;
