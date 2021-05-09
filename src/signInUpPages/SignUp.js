import React, { useState, useEffect } from "react";
import logoImg from "../svgs/logo.svg";
import { Link } from "react-router-dom";
import IsOk from "../svgs/ok.svg";
import wrong from "../svgs/wrong.svg";
import { useStateContext } from "../contexts/ContextProvider";
import Axios from "axios";
import "./signup.css";

const Signup = () => {
  const [{ origin }, dispatch] = useStateContext();
  return (
    <div className="signUp1">
      <Logo />
      <Form origin={origin} dispatch={dispatch} />
    </div>
  );
};

const Logo = () => {
  return (
    <>
      <section className="logoSignUp1">
        <img src={logoImg} alt="logo img" />
        <h2>Helping people connect to the emergency services</h2>
      </section>
    </>
  );
};

const Form = ({ origin, dispatch }) => {
  let VerifiedClass = null;
  //const [flag,Setflag] = useState("");
  const [verifedPassword, SetVerifiedPassword] = useState("");
  const [password, Setpassword] = useState("");
  const [name, Setname] = useState("");
  const [email, Setemail] = useState("");
  const clickHandler = (e) => {
    e.preventDefault();
    console.log(verifedPassword, password, name, email);
    if (name === "") {
      alert("Please Enter Your Name");
    } else {
      if (email === "") {
        alert("Please Enter Your Email");
      } else {
        if (password === "") {
          alert("Please Enter A Password");
        } else {
          if (verifedPassword === "") {
            alert("Please Verify Your Password");
          } else if (verifedPassword !== password) {
            alert("Please Enter Correct Password");
          } else {
            let newUser = { Email: email, Name: name, Password: password };
            Axios.post(`${origin}/signup`, newUser)
              .then((response) => {
                console.log({
                  refreshToken: response.data.refreshToken,
                  accessToken: response.data.accessToken,
                });
                localStorage.setItem(
                  "refreshToken",
                  response.data.refreshToken
                );
                dispatch({
                  type: "Add Token",
                  data: response.data.accessToken,
                });
              })
              .catch((error) => {
                if (error) {
                  console.log("Error occoured while signing up", error);
                }
              });
          }
        }
      }
    }
  };

  if (password !== verifedPassword) {
    console.log("wrong");
    VerifiedClass = wrong;
  } else {
    console.log("ok");
    VerifiedClass = IsOk;
  }
  console.log("a");
  return (
    <form className="form1">
      <input
        type="text"
        className="input1"
        onChange={(e) => Setname(e.target.value)}
        placeholder="Your Name"
        required
      ></input>
      <input
        type="email"
        className="input1"
        onChange={(e) => Setemail(e.target.value)}
        placeholder="Email"
        required
      ></input>
      <input
        type="password"
        className="input1"
        onChange={(e) => Setpassword(e.target.value)}
        placeholder="Password"
        required
      ></input>
      <div className="verify">
        <input
          type="password"
          className={`input1 ${VerifiedClass}`}
          onChange={(e) => SetVerifiedPassword(e.target.value)}
          placeholder="Verified Password"
          required
        ></input>
        <img src={VerifiedClass} alt="default text" />
      </div>
      <button type="submit" className="signup1" onClick={clickHandler}>
        Sign Up
      </button>
      <button className="fp">Forget Password?</button>
      <p className="p1">
        Already Have an Account?{" "}
        <Link to="/login" className="signin1">
          {" "}
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default Signup;
