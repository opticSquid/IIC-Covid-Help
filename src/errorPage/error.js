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
      {id === "0" ? (
        <Link to="/signup" className="ErrorText">
          Error while Signing Up
        </Link>
      ) : (
        <Link to="/login" className="ErrorText">
          Email or Password wrong please try again
        </Link>
      )}
      {/* {() => {
        switch (id) {
          case "0":
            <Link to="/signup" className="ErrorText">
              Error while Signing Up
            </Link>;
            break;
          case "1":
            <Link to="/hospitals" className="ErrorText">
              New Hospital could not be addded try again
            </Link>;
            break;
          case "2":
            <Link to="/hospitals" className="ErrorText">
              A hospital already exists in that location
            </Link>;
            break;
          default:
            <Link to="/login" className="ErrorText">
              Email or Password wrong please try again
            </Link>;
            break;
        }
      }} */}
    </div>
  );
};

export default Error;
