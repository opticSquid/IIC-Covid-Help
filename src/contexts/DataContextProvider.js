import React, { useState, createContext } from "react";
// this acts as a central data storage for the  data

//the context object
export const DataContext = createContext();

//dummy Oxygen Data
const dummyOxygendata = [
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
const dummyBeddata = [
  {
    id: 7,
    place: "AMRI Hospital",
    available: true,
    updated: "2 hrs",
    phone: "1000200004",
    location: "Kolkata",
    rating: 4.3,
    stock: 52,
  },
  {
    id: 2,
    place: "AIIMS Hospital",
    available: true,
    updated: "4 hrs",
    phone: "1008520004",
    location: "Salt Lake",
    rating: 4.9,
    stock: 23,
  },
  {
    id: 3,
    place: "CMRI Hospital",
    available: true,
    updated: "5 mins",
    phone: "1005285004",
    location: "Asansol",
    rating: 3.7,
    stock: 12,
  },
  {
    id: 4,
    place: "BMRI Hospital",
    available: false,
    updated: "6 hrs",
    phone: "8560200004",
    location: "New Town",
    rating: 4.1,
    stock: 0,
  },
];

function DataContextProvider(props) {
  const [oxygenData] = useState(dummyOxygendata);
  const [bedData] = useState(dummyBeddata);
  return (
    <DataContext.Provider value={{ oxygen: oxygenData, bed: bedData }}>
      {props.children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
