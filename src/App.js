import React, { useEffect, Suspense, lazy } from "react";
import "./assets/styles/main.css";
import { useStateContext } from "./contexts/ContextProvider";
import checkJWT from "./components/Checkjwt";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loading from "./components/Loading";
//import loading from "./svgs/loading.gif";

// Lazy loading the components on demand to load faster
const HomePage = lazy(() => import("./pages/HomePage"));
const Verify = lazy(() => import("./EmailVerification/Verify"));
const Login = lazy(() => import("./signInUpPages/SignIn"));
const Signup = lazy(() => import("./signInUpPages/SignUp"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Hospitals = lazy(() => import("./components/hospitals/Hospitals"));
const EditHospital = lazy(() => import("./pages/EditHospital"));
const Error = lazy(() => import("./errorPage/error"));
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
            console.log("Old Access token still valid");
          }
        })
        .catch((error) => {
          console.log("Check jwt could not be called", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Suspense
        fallback={
          //Put some loading animation here later
          <Loading />
        }
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/hospitals" component={Hospitals} />
          <Route path="/verify" component={Verify} />
          <Route path="/edit/:uid" component={EditHospital} />
          <Route path="/error/:id" component={Error} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
