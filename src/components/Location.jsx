// components/Location.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchLocationName(latitude, longitude) {
    console.log(1);
    console.log({ latitude, longitude });
    const fetchLocationName = await axios.get(
      //   `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=7.4631162&lon=80.618706`
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    console.log(fetchLocationName.data.address);
    console.log(2);
  }

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchLocationData = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      await fetchLocationName(latitude, longitude);
      setLoading(false);
    } catch (error) {
      setLocation("Location not available");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);

  return (
    <div className="Location">
      {loading ? (
        <div>Loading location.....</div>
      ) : (
        <div>Location: {location}</div>
      )}
    </div>
  );
};

export default Location;
