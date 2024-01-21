import React, { useEffect, useState } from "react";
import { getWeatherData } from "../apis/WeatherApi";
import { Box, Text } from "@chakra-ui/react";

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
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      maxW={"max-content"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Weather in {weatherData?.name}
      </Text>
      {weatherData && (
        <Box>
          <Text fontSize="lg">Temperature: {weatherData.main?.temp}°C</Text>
          <Text fontSize="lg" mt={2}>
            Description: {weatherData.weather?.[0]?.description}
          </Text>
          <Text fontSize="lg" mt={2}>
            Humidity: {weatherData.main?.humidity}%
          </Text>
          <Text fontSize="lg" mt={2}>
            Wind Speed: {weatherData.wind?.speed} m/s
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
