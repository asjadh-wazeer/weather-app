import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const Location = () => {
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(true);

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

  useEffect(() => {
    fetchLocationData();
  }, []);

  return (
    <div className="Location">
      {loading ? (
        <div>Loading location.....</div>
      ) : (
        <>
          <div>City: {location?.city}</div>
          <div>District: {location?.state_district}</div>
          <div>State: {location?.state}</div>
          <Weather city={city} setWeather={setWeather} />
        </>
      )}
    </div>
  );
};

export default Location;
////////////////////////
