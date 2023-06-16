import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import windLgo from "../assets/wind.png";
import { SiWindicss } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { GiWeightScale } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import TemparatureSwitchToggle from "./TemparatureSwitchToggle";
// import { FaBeer } from 'react-icons/fa';

export const SpeedMeter = ({ speed }) => {
  const calculateRotation = (speed) => {
    // Calculate the rotation angle based on the wind speed
    const maxSpeed = 50; // Maximum wind speed for full rotation (adjust as needed)
    const rotation = (speed / maxSpeed) * 180;
    return rotation;
  };

  return (
    <div className="speed-meter">
      <div
        className="needle"
        style={{ transform: `rotate(${calculateRotation(speed)}deg)` }}
      ></div>
      <div className="speed-text">{speed} m/s</div>
    </div>
  );
};

const Location = () => {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [date, setDate] = useState(true);
  const [isCelcius, setIsCelcius] = useState(true);

  const [icon, setIcon] = useState(true);

  async function fetchLocationName(latitude, longitude) {
    console.log(1);
    console.log({ latitude, longitude });
    try {
      const fetchLocationName = await axios.get(
        //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=7.4631162&lon=80.618706`
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );

      if (fetchLocationName.status === 200) {
        console.log("--", fetchLocationName);
        setLocation(fetchLocationName.data.address);
        setCity(fetchLocationName.data.address.city);
        console.log(2);
      }
    } catch (error) {
      console.log("Error occurred in the fetchLocationName function");
    }
  }

  function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function fetchLocationData() {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      await fetchLocationName(latitude, longitude);
      setLoading(false);
    } catch (error) {
      console.log("Error occurred in the fetchLocationData function");
      setLocation("Location not available");
      setLoading(false);
    }
  }

  function setDateFormat() {
    const currentDate = new Date();

    const day = currentDate.getDate();

    const optionsOfWeek = { weekday: "long" };
    const dayOfWeek = currentDate.toLocaleDateString("en-US", optionsOfWeek);

    const optionsOfMonth = { month: "long" };
    const monthName = currentDate.toLocaleDateString("en-US", optionsOfMonth);

    const dateFormat = `${dayOfWeek}, ${day}, ${monthName}`;

    setDate(dateFormat);
  }

  useEffect(() => {
    fetchLocationData();
    setDateFormat();
  }, []);

  console.log("--", weather);

  let label = "";

  function celsiusFahrenheitConversion(value) {
    if (isCelcius) {
      const roundedNumber = Math.ceil(value * 10) / 10;
      return roundedNumber;
    } else {
      const celciusToFahrenheit = (value * 9) / 5 + 32;
      const roundedNumber = Math.ceil(celciusToFahrenheit * 10) / 10;
      return roundedNumber;
    }
  }
  return (
    <div className="Location">
      {loading ? (
        <div>Loading location.....</div>
      ) : (
        <>
          <div className="">
            <div>City: {location?.city}</div>
            <div>District: {location?.state_district}</div>
            <div>State: {location?.state}</div>
            <Weather
              city={city}
              setWeather={setWeather}
              setIcon={setIcon}
              setTemperature={setTemperature}
            />
            <img
              alt="weather"
              className="weather-icon"
              src={`http://openweathermap.org/img/w/${weather[0]?.icon}.png`}
            />
          </div>

          {/*  */}
          <div>
            <h1>{isCelcius?"°C":"°F"}</h1>
          </div>

          <TemparatureSwitchToggle label={label} setIsCelcius={setIsCelcius} />

          {/*  */}

          <div className="weather__container">
            {/* <div> */}
            <div className="location__container">
              <FaMapMarkerAlt className="location__icon" />
              <h4 className="location__name">{location?.city}</h4>
            </div>
            <h2 className="date">{date}</h2>
            <img
              alt="weather"
              className="weather__icon"
              src={`http://openweathermap.org/img/w/${weather[0]?.icon}.png`}
            />

            <div className="temperature__box">
              <p className="temperature">{celsiusFahrenheitConversion(temperature)}</p>
              <p className="temperature__unit">°</p>
            </div>

            <h3 className="weather__type">{weather[0]?.main}</h3>

            <div className="unit__box__container">
              <div className="unit__box">
                <SiWindicss className="unit__icon" />
                <h6>12 km/h</h6>
                <p>Wind</p>
              </div>

              <div className="unit__box">
                <WiHumidity className="unit__icon humidity__icon" />
                <h6>24 %</h6>
                <p>Humidity</p>
              </div>

              <div className="unit__box">
                <GiWeightScale className="unit__icon pressure__icon" />
                <h6>12 Pa</h6>
                <p>Pressure</p>
              </div>
            </div>

            {/* </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Location;
////////////////////////
