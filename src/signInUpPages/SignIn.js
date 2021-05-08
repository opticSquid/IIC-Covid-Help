import React, { useState } from "react";
import logoImg from "../svgs/logo.svg";
import { Link } from "react-router-dom";
import "./signIn.css";

const Signin = () => {
  return (
    <>
      <div className="signIn">
        <Logo />
        <Form />
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <>
      <section className="logoSignIn">
        <img src={logoImg} />
        <h2>Helping people connect to the emergency services</h2>
      </section>
    </>
  );
};

const Form = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter your email");
    } else {
      if (password === "") {
        alert("Please enter the password");
      }
    }
    console.log(email, password);
  };
  return (
    <form className="form">
      <input
        type="text"
        onChange={(e) => SetEmail(e.target.value)}
        className="input"
        placeholder="Email or Mobile Number"
        required
      />
      <input
        type="password"
        onChange={(e) => SetPassword(e.target.value)}
        className="input"
        placeholder="Password"
        required
      />
      <button
        type="submit"
        onClick={(e) => submitHandler(e)}
        className="signin"
      >
        Sign In
      </button>
      <button className="forgetPassword">Forget Password?</button>
      <p>
        Don't Have an Account?{" "}
        <Link to="/signup" className="signup">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default Signin;
