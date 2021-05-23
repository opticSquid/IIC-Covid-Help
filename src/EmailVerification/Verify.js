import React from "react";
import { Link, useParams } from "react-router-dom";
import IsOk from "../svgs/ok.svg";
import "./style.css";

const Verifyemail = () => {
  const { vmsg } = useParams();
  return (
    <div className="verifiedBack">
      <div className="verifieddiv">
        <h3 className="Veri">
          {vmsg}
          <img src={IsOk} alt="ok text" className="okimg"></img>
        </h3>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Verifyemail;
