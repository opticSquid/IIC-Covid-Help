import React from "react";
import wrong from "../svgs/wrong.svg";
import { Link , useParams } from "react-router-dom";
import "./style.css";

const Error = () => {
    const { id } = useParams();
    return (
        <div className='errorBack'>
            <div className='errorbox'>
                <h1 className='ErrorHead'>Error</h1>
                <img className='ErrorImg' src={wrong} alt='default text' />
            </div>
            {id === "0" ? (
                <Link to='/signup' className='ErrorText'>
                    Please try again
                </Link>
            ) : (
                <Link to='/login' className='ErrorText'>
                    Please try again
                </Link>
            )}
        </div>
    );
};

export default Error;
