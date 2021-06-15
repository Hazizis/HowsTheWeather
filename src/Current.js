import React from "react";

import "./Current.css";

const Current = (props) => {
  let currentTemp = Math.round(props.temperature);
  let currentHumidity = Math.round(props.humidity);
  let currentWind = Math.round(props.wind);
  let unitFahrenheit = props.unit;
  if (unitFahrenheit) {
    unitFahrenheit = `${Math.round((props.temperature * 9) / 5 + 32)}°F`;
  } else {
    unitFahrenheit = `${Math.round(props.temperature)}°C`;
  }

  document.body.style.backgroundImage = `url('./background/${props.icon}.jpg')`;

  let newColor = currentTemp;
  if (newColor >= 44) {
    newColor = { backgroundColor: `#d1eafdff` };
  } else if (newColor >= 40) {
    newColor = { backgroundColor: `#bde3fcff` };
  } else if (newColor >= 36) {
    newColor = { backgroundColor: `#7fcbfdff` };
  } else if (newColor >= 32) {
    newColor = { backgroundColor: `#5db6f3ff` };
  } else if (newColor >= 28) {
    newColor = { backgroundColor: `#32a8f8ff` };
  } else if (newColor >= 24) {
    newColor = { backgroundColor: `#109fffff` };
  } else if (newColor >= 20) {
    newColor = { backgroundColor: `#0f8ed8ff` };
  } else if (newColor >= 16) {
    newColor = { backgroundColor: `#0c85ccff` };
  } else if (newColor >= 12) {
    newColor = { backgroundColor: `#0d7fd8ff` };
  } else if (newColor >= 8) {
    newColor = { backgroundColor: `#0774c9ff` };
  } else if (newColor >= 4) {
    newColor = { backgroundColor: `#0866afff` };
  } else if (newColor >= 0) {
    newColor = { backgroundColor: `#05528fff` };
  } else {
    newColor = { backgroundColor: `#022f53ff` };
  }

  return (
    <div className="Current">
      <div className="current-temp">
        <span className="unit">{unitFahrenheit}</span>
      </div>
      <div className="big-circle" style={newColor}>
        <span className="gradient-overlay">
          <img
            src={require(`./asset/${props.icon}.png`)}
            alt=""
            className="condition-icon"
          />
        </span>
      </div>

      <div>
        <ul>
          <li>Humid: {currentHumidity}%</li>
          <li>Wind: {currentWind}km/h</li>
        </ul>
      </div>
    </div>
  );
};

export default Current;
