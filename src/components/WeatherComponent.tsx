import React, { useEffect, useState } from "react";
import { getWeatherData } from "../apis/WeatherApi";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { WiHumidity, WiStrongWind, WiCloudy } from "react-icons/wi";
import { DragHandleIcon } from "@chakra-ui/icons";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Attempt to retrieve cached data from localStorage
        const cachedData = localStorage.getItem("weatherDataCache");
        const cachedTimestamp = localStorage.getItem("weatherDataTimestamp");

        // Check if cached data is still valid (within 5 minutes)
        const isDataValid =
          cachedData &&
          cachedTimestamp &&
          Date.now() - parseInt(cachedTimestamp, 10) < 300000;

        if (isDataValid) {
          // If valid, set data from cache
          setWeatherData(JSON.parse(cachedData));
          return;
        }

        // If not valid or no cache, make a new API request
        const response = await getWeatherData();
        setWeatherData(response);

        // Update the cached data and timestamp in localStorage
        localStorage.setItem("weatherDataCache", JSON.stringify(response));
        localStorage.setItem("weatherDataTimestamp", Date.now().toString());
      } catch (error) {
        console.log(error);
      }
    };

    fetchWeatherData();
  }, []);
  return (
    <Box
      border="1px  solid var(--bordercolor)"
      borderRadius={"10px"}
      p="10px"
      width={"max-content"}
      background={"var(--lvl1-darkcolor)"}
      position={"relative"}
      w="320px"
      h="max-content"
    >
      <Box position={"absolute"} right="10px">
        <button>
          <DragHandleIcon />
        </button>
      </Box>
      <Text fontSize="md" fontWeight="bold">
        Weather in {weatherData?.name}
      </Text>
      <Text fontSize="md" color="gray.300">
        Lorem ipsum dolor sit amet
      </Text>
      {weatherData && (
        <Flex
          direction="column"
          bg={"var(--lvl3-darkcolor)"}
          p="0 10px 10px 10px"
          mt={"10px"}
          rounded={"10px"}
          justifyContent="space-between"
        >
          <Flex align="center" mt={2}>
            <Icon as={WiCloudy} boxSize={28} color="blue.500" />
            <Flex flexDirection="column">
              <Text fontSize="3xl" ml={2}>
                {weatherData.main?.temp}°C
              </Text>
              <Text fontSize="lg" ml={2} color="gray.400">
                {weatherData.weather?.[0]?.description}
              </Text>
            </Flex>
          </Flex>
          <Flex gap="10px">
            <Flex
              align="center"
              mt={2}
              background="purple.900"
              justifyContent="center"
              rounded="20px"
              w="max-content"
              px="15px"
            >
              <Icon as={WiHumidity} boxSize={8} color="teal.500" />
              <Text fontSize="lg" ml={2}>
                {weatherData.main?.humidity}%
              </Text>
            </Flex>
            <Flex
              align="center"
              mt={2}
              background="purple.900"
              justifyContent="center"
              rounded="20px"
              w="max-content"
              px="15px"
            >
              <Icon as={WiStrongWind} boxSize={8} color="gray.500" />
              <Text fontSize="lg" ml={2}>
                {weatherData.wind?.speed} m/s
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Weather;
