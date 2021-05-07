import React from "react";

/* componenet to select location from option
to be made dynamic in future based on backend
*/

function SelectLocation(props) {
  return (
    <div className="homepage__select">
      <select>
        <option>Kolkata</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Raipur</option>
        <option>Dhanbad</option>
      </select>
      <select>
        <option>Kolkata</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Raipur</option>
        <option>Dhanbad</option>
      </select>
      <select>
        <option>Kolkata</option>
        <option>Delhi</option>
        <option>Mumbai</option>
        <option>Raipur</option>
        <option>Dhanbad</option>
      </select>
    </div>
  );
}

export default SelectLocation;
