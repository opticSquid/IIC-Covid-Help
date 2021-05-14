import React from "react";
import { Link } from "react-router-dom";
import IsOk from "../svgs/ok.svg";
import "./style.css";

const Verifyemail = () => {
  return (
    <div className="verifiedBack">
      <div className="verifieddiv">
        <h3 className="Veri">Verification mail sent also please remember to check your spam folder
        <img src={IsOk} alt="ok text" className="okimg"></img>
        </h3>
        
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Verifyemail;
