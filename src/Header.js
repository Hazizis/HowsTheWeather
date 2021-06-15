import React, { useState, useEffect } from "react";
import { Route, useHistory, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import hideVirtualKeyboard from "hide-virtual-keyboard";

import axios from "axios";

import Hallo from "./Hallo";
import City from "./City";
import Current from "./Current";
import HourlyForecast from "./HourlyForecast";
import ForecastPreview from "./ForecastPreview";
import Citynotfound from "./Citynotfound";
import "./Header.css";

const Header = (props) => {
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({});
  const [hourly, setHourly] = useState({});
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState({});
  const [hourlyHour, setHourlyHour] = useState({});
  const [forecast, setForecast] = useState({});
  const [fahrenheit, setFahrenheit] = useState(false);
  const [fSelected, setFSelected] = useState({});
  const [cSelected, setCSelected] = useState(props.unitC);
  const [ready, setReady] = useState(false);
  const history = useHistory();

  function showTime(response) {
    setDay(response.data.day_of_week);
    let date = new Date();
    let hours = date.getUTCHours();
    let inte = parseInt(hours);
    let offset = parseInt(response.data.utc_offset);
    let totalHour = inte + offset;
    let jam = totalHour;
    if (totalHour >= 24) {
      totalHour -= 24;
    } else if (totalHour < 0) {
      totalHour += 24;
    } else if (totalHour === 0) {
      totalHour = `00`;
    } else if (totalHour < 10) {
      totalHour = `0${totalHour}`;
    } else totalHour = inte + offset;

    setHour({
      ready: true,
      hourSet: totalHour,
    });

    if (jam >= 24) {
      jam -= 24;
    } else if (jam < 0) {
      jam += 24;
    }

    setHourlyHour({
      hourlyset: jam,
      ready: true,
    });
  }

  function showForecast(response) {
    setForecast(response.data);
    let timeUrl = `https://worldtimeapi.org/api/timezone/`;
    axios
      .get(`${timeUrl}${response.data.timezone}`)
      .then(showTime)
      .catch(
        () =>
          setHour({
            ready: true,
            hourSet: "00",
          }) & setDay(0)
      )
      .then(() => setReady(true));
  }

  function showHourly(response) {
    setHourly(response.data);
  }

  function showWeather(response) {
    setWeather({
      ready: true,
      city: response.data.name,
      description: response.data.weather[0].description,
      temp: response.data.main.temp,
      icon: response.data.weather[0].icon,
      humid: response.data.main.humidity,
      wind: response.data.wind.speed,
      latitude: response.data.coord.lat,
      longitude: response.data.coord.lon,
    });

    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;
    let apiKeyHourly = `903ef20e2768a7e266ca3802f5b7359a`;
    let hourlyUrl = "https://api.openweathermap.org/data/2.5/onecall";

    //proses nambah hourly
    axios
      .get(
        `${hourlyUrl}?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily&appid=${apiKeyHourly}&units=metric`
      )
      .then(showHourly);

    //ini buat daily

    let apiKeyWeather = `903ef20e2768a7e266ca3802f5b7359a`;
    let weatherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall`;
    axios
      .get(
        `${weatherForecastUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKeyWeather}&units=metric`
      )
      .then(showForecast);
    hideVirtualKeyboard();
  }

  function search() {
    let apiKey = `903ef20e2768a7e266ca3802f5b7359a`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(url)
      .then(showWeather)
      .catch(function (error) {
        history.push("/citynotfound");
      });
    setCity("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/forecast");
    search();
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function displayFahrenheit(event) {
    event.preventDefault();
    setFahrenheit(true);
    setFSelected({
      color: `#fcfeff`,
      backgroundColor: `#465866`,
      borderRadius: `50%`,
      cursor: `default`,
    });
    setCSelected({});
  }

  function displayCelcius(event) {
    event.preventDefault();
    setFahrenheit(false);
    setCSelected({
      color: `#fcfeff`,
      backgroundColor: `#465866`,
      borderRadius: `50%`,
      cursor: `default`,
    });
    setFSelected({});
  }

  if (ready) {
    return (
      <div>
        <div className="Header">
          <div className="page-name">
            <Link to="/">
              How's The <strong>Weather</strong>
            </Link>
          </div>
          <div className="search-form">
            <form onSubmit={handleSubmit}>
              <button>
                <i className="fas fa-search search-icon" />
              </button>
              <input
                className="text-input"
                type="text"
                placeholder="Search for a city"
                autoComplete="off"
                spellCheck="false"
                autoFocus
                onChange={handleChange}
                value={city}
              />
            </form>
          </div>
          <div>
            <a href="http://">
              <span
                className="conversion-c"
                onClick={displayCelcius}
                style={cSelected}
              >
                C
              </span>
              <span
                className="conversion-f"
                onClick={displayFahrenheit}
                style={fSelected}
              >
                F
              </span>
            </a>
          </div>
        </div>
        <div>
          <Route path="/" exact component={Hallo} />
        </div>
        <div>
          <Route path="/citynotfound" exact component={Citynotfound} />
        </div>
        <div>
          <Route
            path="/forecast"
            exact
            render={(props) => (
              <City
                {...props}
                city={weather.city}
                description={weather.description}
                dayOfWeek={day}
                fullHour={hour.hourSet}
              />
            )}
          />
          <Route
            path="/forecast"
            exact
            render={(props) => (
              <Current
                {...props}
                temperature={weather.temp}
                humidity={weather.humid}
                wind={weather.wind}
                icon={weather.icon}
                unit={fahrenheit}
              />
            )}
          />
          {
            //Hourly disini
          }
          <div className="forecast-flax-wrapper-white-box-for-all">
            <div className="forecast-flax-wrapper forecast-scroll">
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[0].temp}
                    icon={hourly.hourly[0].weather[0].icon}
                    unit={fahrenheit}
                    hour={"Now"}
                  />
                )}
              />

              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[3].temp}
                    icon={hourly.hourly[3].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 3}
                  />
                )}
              />

              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[6].temp}
                    icon={hourly.hourly[6].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 6}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[9].temp}
                    icon={hourly.hourly[9].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 9}
                  />
                )}
              />

              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[12].temp}
                    icon={hourly.hourly[12].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 12}
                  />
                )}
              />

              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[15].temp}
                    icon={hourly.hourly[15].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 15}
                  />
                )}
              />

              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <HourlyForecast
                    {...props}
                    temp={hourly.hourly[18].temp}
                    icon={hourly.hourly[18].weather[0].icon}
                    unit={fahrenheit}
                    hour={hourlyHour.hourlyset + 18}
                  />
                )}
              />
            </div>
            <div></div>
            <div className="forecast-flax-wrapper forecast-scroll">
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[0].temp.max}
                    min={forecast.daily[0].temp.min}
                    icon={forecast.daily[0].weather[0].icon}
                    day={day}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[1].temp.max}
                    min={forecast.daily[1].temp.min}
                    icon={forecast.daily[1].weather[0].icon}
                    day={day + 1}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[2].temp.max}
                    min={forecast.daily[2].temp.min}
                    icon={forecast.daily[2].weather[0].icon}
                    day={day + 2}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[3].temp.max}
                    min={forecast.daily[3].temp.min}
                    icon={forecast.daily[3].weather[0].icon}
                    day={day + 3}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[4].temp.max}
                    min={forecast.daily[4].temp.min}
                    icon={forecast.daily[4].weather[0].icon}
                    day={day + 4}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[5].temp.max}
                    min={forecast.daily[5].temp.min}
                    icon={forecast.daily[5].weather[0].icon}
                    day={day + 5}
                    unit={fahrenheit}
                  />
                )}
              />
              <Route
                path="/forecast"
                exact
                render={(props) => (
                  <ForecastPreview
                    {...props}
                    max={forecast.daily[6].temp.max}
                    min={forecast.daily[6].temp.min}
                    icon={forecast.daily[6].weather[0].icon}
                    day={day + 6}
                    unit={fahrenheit}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader">
        <Loader
          type="ThreeDots"
          color="#94aec2"
          height={100}
          width={150}
          timeout={3000} //3 secs
        />
      </div>
    );
  }
};

export default Header;
