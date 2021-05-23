import React from "react";
import wrong from "../svgs/wrong.svg";
import { Link, useParams } from "react-router-dom";
import "./style.css";

const Error = () => {
  const { errmsg } = useParams();
  return (
    <div className="errorBack">
      <div className="errorbox">
        <h1 className="ErrorHead">Error</h1>
        <img className="ErrorImg" src={wrong} alt="default text" />
      </div>
      <Link to="/" className="ErrorText">
        {errmsg}
      </Link>
    </div>
  );
};

export default Error;
