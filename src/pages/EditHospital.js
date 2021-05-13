import React, { useState } from "react";
import "../assets/styles/editHospital.css";
import logo from "../assets/images/vector/logo.svg";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import jwtCheck from "../components/Checkjwt";
function EditHospital(props) {
  const { uid } = props.match.params;
  const [{ origin, data }, dispatch] = useStateContext();
  const hospitalData = data?.Centres.filter((x) => x.uid === uid)[0];
  const history = useHistory();

  const [facilityName, setFacilityName] = useState(hospitalData?.FacilityName);
  const [facilityEmail, setFacilityEmail] = useState(hospitalData?.Email);
  const [facilityPhone, setFacilityPhone] = useState(hospitalData?.PhoneNumber);
  const [regularBed, setRegularBed] = useState(hospitalData?.Beds?.Normal);
  const [icuBed, setIcuBed] = useState(hospitalData?.Beds?.ICU);
  const [vacType, setVacType] = useState(
    hospitalData?.CovidVaccines?.VaccineName
  );
  const [vacAmt, setVacAmt] = useState(hospitalData?.CovidVaccines?.Quantity);
  const [Oxygen, setOxygen] = useState(hospitalData?.Oxygen);
  const [docNo, setDocNo] = useState(hospitalData?.Doctors);
  const [state, setstate] = useState(
    hospitalData?.Address?.StreetAddress?.State
  );
  const [city, setCity] = useState(hospitalData?.Address?.StreetAddress?.City);
  const [district, setDistrict] = useState(
    hospitalData?.Address?.StreetAddress?.District
  );

  const submitHandler = (e) => {
    e.preventDefault();
    let updatedData = {
      FacilityName: facilityName,
      PhoneNumber: facilityPhone,
      Email: facilityEmail,
      Beds: {
        ICU: icuBed,
        Normal: regularBed,
      },
      Oxygen: Oxygen,
      CovidVaccines: {
        Available: vacAmt > 0 ? true : false,
        VaccineName: vacType,
        Quantity: vacAmt,
      },
      Doctors: docNo,
      Address: {
        Location: hospitalData?.Address?.Location,
        StreetAddress: {
          State: state,
          District: district,
          City: city,
        },
      },
      verified: false,
      uid: uid,
    };

    if (localStorage.getItem("refreshToken") !== null) {
      jwtCheck(origin)
        .then((resp) => {
          Axios.post(`${origin}/newHealthCentre`, updatedData, {
            headers: { accesstoken: sessionStorage.getItem("accessToken") },
          })
            .then((response) => {
              history.push("/");
            })
            .catch((error) => {
              if (error)
                console.log(
                  "Error occoured while posting new hospital details",
                  error
                );
            });
        })
        .catch((error) => {
          console.log("JWT check failed for new Hospitals", error);
        });
    }
  };

  return (
    <div className="EH--wrapper">
      <Link to="/">
        <img src={logo}></img>
      </Link>

      <h2>EDIT DATA</h2>
      <div className="form">
        <form onSubmit={submitHandler}>
          <div className="EH__form--group">
            <div className="EH__input--group">
              <label htmlFor="facilityName">Enter Facility Name:</label>
              <input
                type="text"
                onChange={(event) => setFacilityName(event.target.value)}
                value={facilityName}
                name="facilityName"
              />
            </div>
            <div className="EH__input--group">
              <label htmlFor="facilityEmail">Enter Email:</label>
              <input
                type="email"
                onChange={(event) => setFacilityEmail(event.target.value)}
                value={facilityEmail}
                name="facilityEmail"
                id=""
              />
            </div>
            <div className="EH__input--group">
              <label htmlFor="facilityPhone">Enter Phone No:</label>
              <input
                type="tel"
                value={facilityPhone}
                onChange={(event) => setFacilityPhone(event.target.value)}
                name="facilityPhone"
                id=""
              />
            </div>
          </div>
          <div className="EH__form--group">
            <div className="EH__input--group--flex">
              <div>
                <label htmlFor="regularBed">Normal Beds:</label>
                <input
                  value={regularBed}
                  type="number"
                  onChange={(event) => setRegularBed(event.target.value)}
                  name="regularBed"
                />
              </div>
              <div>
                <label htmlFor="icuBed">ICU Beds:</label>
                <input
                  type="number"
                  value={icuBed}
                  onChange={(event) => setIcuBed(event.target.value)}
                  name="icuBed"
                />
              </div>
            </div>
            <div className="EH__input--group--flex">
              <div>
                <label htmlFor="vacType">Vaccine:</label>
                <select
                  value={vacType}
                  onChange={(event) => setVacType(event.target.value)}
                  name="vacType"
                  id=""
                >
                  <option value="">None</option>
                  <option value="Covaxin">Covaxin</option>
                  <option value="Covisheild">Covishield</option>
                  <option value="Sputnik V">Sputnik V</option>
                </select>
              </div>
              <div>
                <label htmlFor="vacAmt">Amount:</label>
                <input
                  type="number"
                  onChange={(event) => setVacAmt(event.target.value)}
                  value={vacAmt}
                  name="vacAmt"
                />
              </div>
            </div>
            <div className="EH__input--group">
              <label htmlFor="Oxygen">Oxygen Amount:</label>
              <input
                type="number"
                onChange={(event) => setOxygen(event.target.value)}
                value={Oxygen}
                name="Oxygen"
                id=""
              />
            </div>
            <div className="EH__input--group">
              <label htmlFor="docNo">Number of Doctors:</label>
              <input
                type="number"
                onChange={(event) => setDocNo(event.target.value)}
                value={docNo}
                name="docNo"
                id=""
              />
            </div>
          </div>

          <div className="EH__form--group">
            <div className="EH__input--group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                onChange={(event) => setstate(event.target.value)}
                value={state}
                name="state"
              />
            </div>
            <div className="EH__input--group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                onChange={(event) => setCity(event.target.value)}
                value={city}
                name="city"
                id=""
              />
            </div>
            <div className="EH__input--group">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                name="district"
                id=""
              />
            </div>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
}

export default EditHospital;
