import React, { useState } from "react";
import logoImg from "../svgs/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Axios from "axios";
import "./signIn.css";

const Signin = () => {
  const [{ origin }, dispatch] = useStateContext();
  const history = useHistory();
  return (
    <>
      <div className="signIn">
        <Logo />
        <Form origin={origin} dispatch={dispatch} history={history} />
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <>
      <section className="logoSignIn">
        <img src={logoImg} alt="Logo" />
        <h2>Helping people connect to the emergency services</h2>
      </section>
    </>
  );
};

const Form = ({ origin, dispatch, history }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("Please enter your email");
    } else {
      if (password === "") {
        alert("Please enter the password");
      } else {
        let newUser = { Email: email, Password: password };
        Axios.post(`${origin}/login`, newUser)
          .then((response) => {
            console.log({
              refreshToken: response.data.refreshToken,
              accessToken: response.data.accessToken,
            });
            localStorage.setItem("refreshToken", response.data.refreshToken);
            // dispatch({
            //   type: "Add Token",
            //   data: response.data.accessToken,
            // });
            sessionStorage.setItem("accessToken", response.data.accessToken);
            history.push("/");
          })
          .catch((error) => {
            if (error) {
              console.log("Error occoured while signing up", error);
            }
          });
      }
    }
  };
  console.log(email, password);
  return (
    <form className="form">
      <input
        type="email"
        onChange={(e) => SetEmail(e.target.value)}
        className="input"
        placeholder="Email"
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
// 1234
// abc@gmail.com
