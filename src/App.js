import React from "react";
import "./assets/styles/main.css";
import DetectLocation from "./components/DetectLocation";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./signInUpPages/SignIn";
import Signup from "./signInUpPages/SignUp";
import AboutPage from "./pages/AboutPage";

function App() {
  /*OxygenContextProvider is a context provider that has 
  been created in src/contexts/OxygenContextProvider.js 
  it acts as a central data storage for the cards that display oxygen data

  detect location component handles the user location 
  */
  return (
    <>
      <Router>
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={HomePage} />
        <Route path="/hospitals" component={Hospitals} />
      </Router>
      <DetectLocation />
    </>
  );
}

export default App;
