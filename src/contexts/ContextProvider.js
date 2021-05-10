import React, { createContext, useContext, useReducer } from "react";
export const StateContext = createContext();
export const StateProvider = (props) => {
  return (
    <StateContext.Provider
      value={useReducer(props.reducer, props.initialState)}
    >
      {props.children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
