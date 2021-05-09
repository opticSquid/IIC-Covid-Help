import React, { useEffect } from "react";
import "./assets/styles/main.css";
import DetectLocation from "./components/DetectLocation";
//import HomePage from "./pages/HomePage";
import test from "./components/test";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./signInUpPages/SignIn";
import Signup from "./signInUpPages/SignUp";
import AboutPage from "./pages/AboutPage";
import Hospitals from "./components/hospitals/Hospitals";
import Axios from "axios";
import { useStateContext } from "./contexts/ContextProvider";
function App() {
  /*OxygenContextProvider is a context provider that has 
  been created in src/contexts/OxygenContextProvider.js 
  it acts as a central data storage for the cards that display oxygen data

  detect location component handles the user location 
  */
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
    //return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Router>
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={test} />
        <Route path="/hospitals" component={Hospitals} />
      </Router>
      <DetectLocation />
    </>
  );
}

export default App;
