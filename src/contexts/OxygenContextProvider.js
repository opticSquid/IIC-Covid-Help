import React, { useState, createContext } from "react";

// this acts as a central data storage for the oxygen data
// in future create same type of structure for vaccines,hospital beds etc

//the context object
export const OxygenContext = createContext();

//dummy data just for testing
const dummydata = [
  {
    id: 1,
    place: "AMRI Hospital",
    available: true,
    updated: "2 hrs",
    phone: "1000200004",
    location: "Kolkata",
    rating: 4.3,
    stock: 8,
  },
  {
    id: 2,
    place: "AIIMS Hospital",
    available: true,
    updated: "4 hrs",
    phone: "1008520004",
    location: "Salt Lake",
    rating: 4.9,
    stock: 3,
  },
  {
    id: 3,
    place: "CMRI Hospital",
    available: false,
    updated: "5 mins",
    phone: "1005285004",
    location: "Asansol",
    rating: 3.7,
    stock: 0,
  },
  {
    id: 4,
    place: "BMRI Hospital",
    available: true,
    updated: "6 hrs",
    phone: "8560200004",
    location: "New Town",
    rating: 4.1,
    stock: 5,
  },
];

const OxygenContextProvider = (props) => {
  const [oxygenData, setOxygenData] = useState(dummydata);

  return (
    <OxygenContext.Provider value={oxygenData}>
      {props.children}
    </OxygenContext.Provider>
  );
};

export default OxygenContextProvider;
