import React from "react";
import "./assets/styles/main.css";
import Navigation from "./components/homePage/Navigation";
import OxygenContextProvider from "./contexts/OxygenContextProvider";
import HomePage from "./pages/HomePage";

function App() {
  /*OxygenContextProvider is a context provider that has 
  been created in src/contexts/OxygenContextProvider.js 
  it acts as a central data storage for the cards that display oxygen data
  */
  return (
    <>
      <OxygenContextProvider>
        <Navigation />
        <HomePage />
      </OxygenContextProvider>
    </>
  );
}

export default App;
