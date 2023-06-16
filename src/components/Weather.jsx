import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather({ city, setIcon, setWeather, setTemperature }) {

    
  async function fetchWeatherData() {
    try {
      const getWeatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=263ff849579223b9c064ec72db77c4f7`
      );

      console.log("🌆---->", city);

      if (getWeatherData.status === 200) {
        console.log("getWeatherData", getWeatherData.data?.main?.temp);
        setTemperature(getWeatherData.data?.main?.temp);
        setIcon(getWeatherData.data.weather[0].icon);
        setWeather(getWeatherData.data.weather);
      }
    } catch (error) {
      console.log("Error occurred in the fetchWeatherData function");
    }
  }

  useEffect(() => {
    console.log("City");
    fetchWeatherData();
  }, [city]);

  return <div>Weather</div>;
}

export default Weather;
