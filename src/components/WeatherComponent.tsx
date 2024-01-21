import React, { useEffect, useState } from "react";
import { getWeatherData } from "../apis/WeatherApi";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData();
        setWeatherData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <div>
      <p>Weather Weather</p>
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          {weatherData.main && <p>Temperature: {weatherData.main.temp}°C</p>}
        </div>
      )}
    </div>
  );
};

export default Weather;
