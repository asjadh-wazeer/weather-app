import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";

import { SiWindicss } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { GiWeightScale } from "react-icons/gi";
import { FaMapMarkerAlt } from "react-icons/fa";
import TemparatureSwitchToggle from "../components/TemparatureSwitchToggle";
import { BsCaretDownFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { FaCity } from "react-icons/fa";
// import { FaBeer } from 'react-icons/fa';
// import { FaBeer } from 'react-icons/fa';
// import { FaBeer } from 'react-icons/fa';

import warning from "../assets/warning.png";
import WeatherLogo from "../components/WeatherLogo";

const Location = () => {
  const [city, setCity] = useState(null);

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [date, setDate] = useState(true);
  const [isCelcius, setIsCelcius] = useState(true);
  const [icon, setIcon] = useState(true);

  const [allowLocation, setAllowLocation] = useState(true);

  const [latitudeValue, setLatitudeValue] = useState(true);
  const [longitudeValue, setLongitudeValue] = useState(true);

  const [expanded, setExpanded] = useState(false);

  console.log(icon);

  function toggleExpanded() {
    setExpanded(!expanded);
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

  function celsiusFahrenheitConversion(value) {
    if (isCelcius) {
      const kelvinToCelcius = value - 273.15;
      const roundedNumber = Math.ceil(kelvinToCelcius * 10) / 10;
      return roundedNumber;
    } else {
      const kelvinToFahrenheit = ((value - 273.15) * 9) / 5 + 32;
      const roundedNumber = Math.ceil(kelvinToFahrenheit * 10) / 10;
      return roundedNumber;
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
      setAllowLocation(true);
      setLatitudeValue(latitude);
      setLongitudeValue(longitude);
      await fetchWeatherData(latitude, longitude);
      setLoading(false);
    } catch (error) {
      //   alert("Please allow access to your location...");
      setAllowLocation(false);
      console.log("Error occurred in the fetchLocationData function");
      setLoading(false);
    }
  }

  async function fetchWeatherData(latitude, longitude) {
    try {
      const fetchLocationName = await axios.get(
        //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=7.4631162&lon=80.618706`
        // `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=263ff849579223b9c064ec72db77c4f7
        `
      );
      if (fetchLocationName.status === 200) {
        setCity(fetchLocationName.data.name);

        setTemperature(fetchLocationName.data?.main?.temp);
        setWeather(fetchLocationName.data);
        setIcon(fetchLocationName.data?.weather[0]?.icon);
      }
    } catch (error) {
      console.log("Error occurred in the fetchLocationName function");
    }
  }
  //   console.log(weather,`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`);
  useEffect(() => {
    fetchLocationData();
    setDateFormat();
  }, []);

  return (
    <div className="Location">
      {allowLocation ? (
        <div>
          {loading ? (
            // <div className="error__message">Loading location.....</div>
            <div className="error__message__container">
              <div className="error__message__box">
                {/* <img src={warning} alt="warning" className="warning__logo" /> */}
                <div>
                  <Rings
                    height="100"
                    width="100"
                    color="#fafd73"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                  />
                </div>
                <p>Detecting your location...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="weather__container">
                {/* <div> */}
                <div className="location__container">
                  <FaMapMarkerAlt className="location__icon" />
                  <h4 className="location__name">{city}</h4>
                </div>

                <WeatherLogo icon={icon} />

                <div className="temperature__box">
                  <p className="temperature">
                    {celsiusFahrenheitConversion(temperature)}
                  </p>

                  <p className="temperature__unit">°</p>
                </div>

                <div className="temparature__switch__toggle">
                  <TemparatureSwitchToggle
                    label={"Temparature"}
                    setIsCelcius={setIsCelcius}
                  />
                </div>

                <h3 className="weather__type">
                  {weather?.weather[0]?.description}
                </h3>
                <h2 className="date">{date}</h2>

                {/*  */}
                <div className="weather__content">
                  <div
                    className={`weather__content__text ${
                      expanded ? "expanded" : ""
                    }`}
                  >
                    <div className="unit__box__container">
                      <div className="unit__box ">
                        <SiWindicss className="unit__icon" />
                        <h6>{`${weather.wind.speed} km/h`}</h6>
                        <p>Wind</p>
                      </div>

                      <div className="unit__box ">
                        <WiHumidity className="unit__icon humidity__icon" />
                        <h6>{`${weather.main.humidity} %`}</h6>
                        <p>Humidity</p>
                      </div>

                      <div className="unit__box ">
                        <GiWeightScale className="unit__icon pressure__icon" />
                        <h6>{`${weather.main.pressure} hPa`}</h6>
                        <p>Pressure</p>
                      </div>
                    </div>

                    <div className="unit__box__container unit__box__container__2">
                      <div className="unit__box ">
                        <TbWorldLatitude className="unit__icon" />
                        <h6>{latitudeValue?.toFixed(3)}</h6>
                        <p>Latitude</p>
                      </div>

                      <div className="unit__box ">
                        <TbWorldLongitude className="unit__icon humidity__icon" />
                        <h6>{longitudeValue?.toFixed(3)}</h6>
                        <p>Longitude</p>
                      </div>

                      <div className="unit__box ">
                        <FaCity className="unit__icon pressure__icon" />
                        <h6>{city}</h6>
                        <p>City</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="show__more__less__button "
                    onClick={toggleExpanded}
                  >
                    <span>{expanded ? "Show Less" : "Show More"}</span>
                    <span className="show__more__less__button__icon__container">
                      {expanded ? (
                        <BsCaretUpFill className="show__more__less__button__icon" />
                      ) : (
                        <BsCaretDownFill className="show__more__less__button__icon" />
                      )}
                    </span>
                  </button>
                </div>
                {/*  */}
              </div>
            </>
          )}
        </div>
      ) : (
        // <div className="error__message">
        //   <img src={warning} alt="warning" className="warning__logo" />
        //   <p>Please allow access to your location</p>
        // </div>

        <div className="error__message__container">
          <div className="error__message__box">
            <img src={warning} alt="warning" className="warning__logo" />
            <p>Please allow access to your location</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
