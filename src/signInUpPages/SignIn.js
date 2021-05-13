import React, { useState } from "react";
import logoImg from "../svgs/bondhu.png";
import { Link, useHistory } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Axios from "axios";
import "./signIn.css";

const Signin = () => {
  const [{ origin }] = useStateContext();
  const history = useHistory();
  return (
    <>
      <div className="signIn">
        <Logo />
        <Form origin={origin} history={history} />
      </div>
    </>
  );
};

const Logo = () => {
  return (
    <>
      <section className="logoSignIn">
        <img
          style={{ maxWidth: "30em", paddingBottom: "4em" }}
          src={logoImg}
          alt="Logo"
        />
        <h2>Helping people connect to the emergency services</h2>
      </section>
    </>
  );
};

const Form = ({ origin, history }) => {
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
            console.log("login response", response.data.tokens.Name);
            if (response.data.status === "Logged in successfully") {
              localStorage.setItem(
                "refreshToken",
                response.data.tokens.refreshToken
              );
              sessionStorage.setItem(
                "accessToken",
                response.data.tokens.accessToken
              );
              localStorage.setItem("userName", response.data.tokens.Name);
              history.push("/");
            } else {
              //signin error
              history.push("error/1");
            }
          })
          .catch((error) => {
            if (error) {
              console.log("Error occoured while signing up", error);
            }
          });
      }
    }
  };

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
