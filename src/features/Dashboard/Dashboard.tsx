import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";
import { Flex, Text } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Flex flexDirection={"column"} gap={"20px"}>
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <Flex display={"Flex"} wrap={"wrap"} gap={"10px"}>
        <Weather />
        <CryptoPrices />
        <Horoscope />
        <RandomQuotes />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
