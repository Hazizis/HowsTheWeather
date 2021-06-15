import React from "react";
import "./Hallo.css";

const Hallo = () => {
  document.body.style.backgroundImage = `url('./background/hallo.png')`;
  return (
    <div className="wrapper-welcome">
      <div className="welcome-circle align-welcome"></div>
      <div className="welcome-text align-welcome">
        <p>How's the weather like in...</p>
      </div>
    </div>
  );
};

export default Hallo;
