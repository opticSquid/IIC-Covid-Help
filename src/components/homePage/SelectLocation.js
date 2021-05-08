import React from "react";

/* componenet to select location from option
to be made dynamic in future based on backend
*/

function SelectLocation(props) {
  return (
    <div className="homepage__select">
      <select>
        <option>State</option>
        <option>Delhi</option>
        <option>Bihar</option>
        <option>Jharkhand</option>
        <option>Maharashtra</option>
        <option>West Bengal</option>
        <option>Karnataka</option>
      </select>
      <select>
        <option>District</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Raipur</option>
        <option>Dhanbad</option>
      </select>
      <select>
        <option>City</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Raipur</option>
        <option>Dhanbad</option>
      </select>
    </div>
  );
}

export default SelectLocation;
