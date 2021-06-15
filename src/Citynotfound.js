import React from "react";
import "./Citynotfound.css";

const Citynotfound = () => {
  document.body.style.backgroundImage = `url('./background/notfound.jpg')`;
  return (
    <div className="wrapper-welcome">
      <div className="welcome-circle align-welcome"> </div>{" "}
      <div className="welcome-text align-welcome">
        <p> City Not Found </p>{" "}
      </div>{" "}
    </div>
  );
};

export default Citynotfound;
