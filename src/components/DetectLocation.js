import React, { useEffect, useState } from "react";

function DetectLocation() {
  const location = []; // location array
  const [, setdisabled] = useState(false);
  const [detectlocation] = useState(true);
  const success = (pos) => {
    let crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    let locationDoc = {
      type: "Point",
      coordinates: [crd.longitude, crd.latitude],
    };
    location.push(locationDoc);
    console.log(location);
    // if (where === "vendor") {
    //   dispatch({
    //     type: "VENDOR_LOCATION",
    //     data: locationDoc,
    //   });
    // } else if (where === "user") {
    //   dispatch({
    //     type: "USER_LOCATION",
    //     data: locationDoc,
    //   });
    // } else {
    //   return;
    // }
  };
  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    alert("Location Permission Denied! Emable permission to detect location");
  };
  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0,
    };
    for (let i = 0; i < 1; i++) {
      if (detectlocation === true) {
        if (navigator.geolocation) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then((result) => {
              if (result.state === "granted") {
                console.log("result state = ", result.state);
                navigator.geolocation.getCurrentPosition(success);
              } else if (result.state === "prompt") {
                console.log("result state = ", result.state);
                navigator.geolocation.getCurrentPosition(
                  success,
                  errors,
                  options
                );
              } else if (result.state === "denied") {
                alert(
                  "Location Permission Denied! Emable permission to detect location"
                );
                setdisabled(true);
              }
              result.onchange = function () {
                console.log(result.state);
              };
            });
        } else {
          alert("Sorry Not available!");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectlocation]);
  return <></>;
}

export default DetectLocation;
