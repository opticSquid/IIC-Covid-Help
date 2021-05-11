import React, { useEffect } from "react";
import "./assets/styles/main.css";
import HomePage from "./pages/HomePage";
import Verify from "./EmailVerification/Verify";
//import test from "./components/test";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./signInUpPages/SignIn";
import Signup from "./signInUpPages/SignUp";
import AboutPage from "./pages/AboutPage";
import Hospitals from "./components/hospitals/Hospitals";
import Axios from "axios";
import { useStateContext } from "./contexts/ContextProvider";
function App() {
  const [{ origin }] = useStateContext();
  useEffect(() => {
    console.log("AccessToken: ", sessionStorage.getItem("accessToken"));

    setInterval(() => {
      if (localStorage.getItem("refreshToken")) {
        console.log(
          "AccessToken while in setInterval: ",
          sessionStorage.getItem("accessToken")
        );
        Axios.get(`${origin}/generatetoken`, {
          headers: { refreshtoken: localStorage.getItem("refreshToken") },
        })
          .then((resp) => {
            console.log("Response while generating token: ", resp);
            sessionStorage.setItem("accessToken", resp.data.accessToken);
          })
          .catch((error) => {
            console.log(
              "Error occoured while regenerating access Token",
              error
            );
          });
      }
    }, 900000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/verify" component={Verify} />
          <Route path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
