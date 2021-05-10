import React, { useEffect} from "react";

function DetectLocation() {
  const location = []; // location array
  const success = (pos) => {
    let crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    let locationDoc = {
      type: "Point",
      coordinates: [crd.longitude, crd.latitude],
    };
    location.push(locationDoc);
    console.log(locationDoc);
  };
  const errors = (err) => {
    alert("Location Permission Denied! Emable permission to detect location");
  };
  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 50000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          alert(
            "Location Permission Denied! Emable permission to detect location"
          );
        }
        result.onchange = function () {};
      });
    } else {
      alert("Sorry Not available!");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}

export default DetectLocation;
