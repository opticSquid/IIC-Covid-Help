import React, { useEffect } from "react";
import "./assets/styles/main.css";
import HomePage from "./pages/HomePage";
import Verify from "./EmailVerification/Verify";
//import test from "./components/test";
import { useStateContext } from "./contexts/ContextProvider";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import checkJWT from "./components/Checkjwt";
import Login from "./signInUpPages/SignIn";
import Signup from "./signInUpPages/SignUp";
import AboutPage from "./pages/AboutPage";
import Hospitals from "./components/hospitals/Hospitals";
function App() {
  const [{ origin }] = useStateContext();
  useEffect(() => {
    //If user is already logged in
    if (localStorage.getItem("refreshToken")) {
      // Regenerating new access token
      checkJWT(origin)
        .then((res) => {
          if (res) {
            console.log("New access token generated");
          } else {
            console.log("New access token could not be granted");
          }
        })
        .catch((error) => {
          console.log("Check jwt could not be called", error);
        });
    }
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
