import React from 'react';
import { Link } from 'react-router-dom'
import IsOk from "../svgs/ok.svg";
import './style.css';

const Verifyemail = () => {
    return (
        <div className="verifiedBack">
            <div className="verifieddiv">
                <h3 className="Veri">Email Verified </h3>
                <img src={IsOk} alt="ok text" className="okimg"></img>
            </div>
            <Link to="/">Home</Link>
        </div>
    );
};

export default Verifyemail;