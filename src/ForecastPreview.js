import React from "react";
import "./ForecastPreview.css";

export default function ForecastPreview(props) {
  let unitFahrenheitMax = props.unit;
  if (unitFahrenheitMax) {
    unitFahrenheitMax = `${Math.round((props.max * 9) / 5 + 32)}°F`;
  } else {
    unitFahrenheitMax = `${Math.round(props.max)}°C`;
  }
  let unitFahrenheitMin = props.unit;
  if (unitFahrenheitMin) {
    unitFahrenheitMin = `${Math.round((props.min * 9) / 5 + 32)}°F`;
  } else {
    unitFahrenheitMin = `${Math.round(props.min)}°C`;
  }

  let days = [
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
    `Sat`,
    `Sun`,
    `Mon`,
    `Tue`,
    `Wed`,
    `Thu`,
    `Fri`,
  ];
  let newDay = days[props.day];

  let newColor = Math.round(props.max);
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
    <div className="forecast">
      <div className="small-circle" style={newColor}>
        <span className="gradient-overlay-small">
          <img
            src={require(`./asset/${props.icon}.png`)}
            alt=""
            className="condition-icon-small"
          />
        </span>
      </div>
      <p className="day-future">{newDay}</p>
      <p className="temp-future">
        <span className="unit">{unitFahrenheitMax}</span> |{" "}
        <span className="future-low-temp" />
        <span className="future-low-temp unit">{unitFahrenheitMin}</span>
      </p>
    </div>
  );
}
