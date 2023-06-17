import React from "react";

import sun from "../assets/sun.png";
import cloudy from "../assets/cloudy.png";
import cloud from "../assets/cloud.png";
import cloud_dark from "../assets/overcast.png";
import raining from "../assets/raining.png";
import cloudy_rain from "../assets/cloudy_rain.png";
import storm from "../assets/storm.png";

function WeatherLogo({ icon }) {
  function selectLogo(icon) {
    if (icon === "01d") {
      return sun;
    } else if (icon === "02d") {
      return cloudy;
    } else if (icon === "03d") {
      return cloud;
    } else if (icon === "04d") {
      return cloud_dark;
    } else if (icon === "09d") {
      return raining;
    } else if (icon === "10d") {
      return cloudy_rain;
    } else if (icon === "11d") {
      return storm;
    } else {
      return cloud;
    }
  }
  return (
    <img
      alt="weather-icon"
      className="weather__icon"
      // src={`http://openweathermap.org/img/w/${icon}.png`}
      src={selectLogo(icon)}
    />
  );
}

export default WeatherLogo;
