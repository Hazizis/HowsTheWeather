import React from "react";
import "./ForecastPreview.css";

export default function HourlyForecast(props) {
  let unitFahrenheit = props.unit;

  if (unitFahrenheit) {
    unitFahrenheit = `${Math.round((props.temp * 9) / 5 + 32)}°F`;
  } else {
    unitFahrenheit = `${Math.round(props.temp)}°C`;
  }

  let newColor = Math.round(props.temp);
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

  let totalHour = props.hour;

  if (totalHour >= 24) {
    totalHour -= 24;
    totalHour = `${totalHour}:00`;
  } else if (totalHour < 0) {
    totalHour += 24;
    totalHour = `${totalHour}:00`;
  } else if (totalHour === 0) {
    totalHour = `00:00`;
  } else if (totalHour < 10) {
    totalHour = `0${totalHour}:00`;
  } else if (totalHour === "Now") {
  } else {
    totalHour = `${totalHour}:00`;
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
      <p className="day-future">{totalHour}</p>
      <p className="temp-future">
        <span className="unit">{unitFahrenheit}</span>
      </p>
    </div>
  );
}
