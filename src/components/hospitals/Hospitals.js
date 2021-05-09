import React, { useState } from "react";
import "./Hospitals.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
function Hospitals() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [location, setLocation] = useState(false);
  const [autoDectect, setAutoDectect] = useState(true);

  function Location() {
    setAutoDectect(false);
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      console.log("Latitude is :", lat);
      console.log("Longitude is :", long);
    });
  }

  function dropdown() {
    return (
      <div className='resources'>
        <div
          style={{ cursor: "pointer" }}
          id='cross'
          onClick={() => setShow(!show)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <ul style={{ listStyle: "none" }}>
          <li>
            <label className='options'>
              <div>
                <input onClick={() => setShow1(!show1)} type='radio'></input>
              </div>
              <div style={{ cursor: "pointer" }} className='oxygen radio'>
                Oxygen
              </div>
            </label>
            {show1 ? (
              <input
                style={{
                  borderRadius: "10px",
                  width: "15em",
                  height: "3em",
                  outline: "none",
                  paddingLeft: "1em",
                }}
                type='number'
                placeholder='Enter the amount of oxygen'
              ></input>
            ) : null}
          </li>
          <li>
            <label className='options'>
              <div>
                <input type='radio' onClick={() => setShow2(!show2)}></input>
              </div>
              <div style={{ cursor: "pointer" }} className='bed radio'>
                Hospital Bed
              </div>
            </label>
            {show2 ? (
              <div>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                  }}
                  type='number'
                  placeholder='Enter number of normal beds'
                ></input>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                    marginLeft: "1em",
                  }}
                  type='number'
                  placeholder='Enter number of normal beds'
                ></input>
              </div>
            ) : null}
          </li>
          <li>
            <label className='options'>
              <div>
                <input onClick={() => setShow3(!show3)} type='radio'></input>
              </div>
              <div style={{ cursor: "pointer" }} className='doctor radio'>
                Doctor
              </div>
            </label>
            {show3 ? (
              <input
                style={{
                  borderRadius: "10px",
                  width: "16em",
                  height: "3em",
                  outline: "none",
                  paddingLeft: "1em",
                }}
                type='number'
                placeholder='Enter number of doctors'
              ></input>
            ) : null}
          </li>
          <li>
            <label className='options'>
              <div>
                <input
                  type='radio'
                  onClick={() => setShow4(!show4)}
                  type='radio'
                ></input>
              </div>
              <div style={{ cursor: "pointer" }} className='covid19 radio'>
                Covid-19 Vaccine
              </div>
            </label>
            {show4 ? (
              <div>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                  }}
                  type='text'
                  placeholder='Enter the name of the vaccine'
                ></input>
                <input
                  style={{
                    borderRadius: "10px",
                    width: "16em",
                    height: "3em",
                    outline: "none",
                    paddingLeft: "1em",
                    marginLeft: "1em",
                  }}
                  type='number'
                  placeholder='Enter the quantity of vaccine'
                ></input>
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
  const submitHandler= e => {
    e.preventDefault();

  } 
  return (
    <div className='hospital'>
      <div className='hospital__icon'>
        <div className='homepage__icon'>
          <h1>C</h1>
          <h3>
            <span>O</span> Help
          </h3>
        </div>
      </div>
      <h1>Add a new hostipal:</h1>
      <div className='information'>
        <input
          className='facility__name'
          type='text'
          placeholder='Enter Facility Name'
        ></input>
        <input
          className='phone__number'
          type='tel'
          placeholder=' Enter Phone Number'
        ></input>

        <div class='select__facility'>
          <div className='facility' onClick={() => setShow(!show)}>
            Select the type of Facility
          </div>
          <div id='chevronDown' onClick={() => setShow(!show)}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {show ? dropdown() : null}

        <input
          className='resources__available'
          type='text'
          placeholder='Enter the number of resources available'
        ></input>
        {autoDectect ? (
          <div>
            <input
              id='location'
              placeholder='Enter your location (latitude,longitude)'
            ></input>

            <div onClick={() => setLocation(!location)} id='location__button'>
              <div>Auto Detect</div>
            </div>
            {location ? Location() : null}
          </div>
        ) : null}

        <div className='street__location'>
          <input id='state' type='text' placeholder='Enter state'></input>
          <input id='district' type='text' placeholder='Enter district'></input>
          <input id='city' type='text' placeholder='Enter city'></input>
        </div>
          <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
}

export default Hospitals;
