import React, { useEffect, useState } from "react";
import { getWeatherData } from "../apis/WeatherApi";
import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { WiHumidity, WiStrongWind, WiCloudy } from "react-icons/wi";

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
      borderLeft="2px"
      borderColor="purple.900"
      p="0 20px"
      width={"max-content"}
    >
      <Text fontSize="xl" fontWeight="bold">
        Weather in {weatherData?.name}
      </Text>
      {weatherData && (
        <Flex direction="column">
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
