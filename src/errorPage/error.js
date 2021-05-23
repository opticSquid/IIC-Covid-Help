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
        <img className="ErrorImg" src={wrong} alt="Error icon" />
      </div>
      <div className="ErrorText">{errmsg}</div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error;
