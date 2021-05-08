import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {StateProvider} from "./contexts/ContextProvider";
import reducer from "./contexts/Reducer";
import { InitialState } from "./contexts/InitialState";
ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={InitialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
