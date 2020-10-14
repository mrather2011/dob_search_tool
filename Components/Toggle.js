import React from "react";

const Toggle = (props) => {
  return (
    <div>
      <div
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          top: "-120px",
          left: "0px",
          border: "1px solid black",
        }}
      >
        Search
      </div>
      <div
        style={{
          height: "100px",
          width: "100px",
          position: "absolute",
          top: "-120px",
          left: "0px",
          border: "1px solid black",
        }}
      >
        Results
      </div>
    </div>
  );
};

export default Toggle;
