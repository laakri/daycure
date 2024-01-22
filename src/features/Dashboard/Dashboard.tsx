import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";
import { Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import FinanceNews from "../../components/FinanceNewsComponent";
import TechnologiesNews from "../../components/TechnologiesNews";

const Dashboard = () => {
  return (
    <Flex flexDirection="column" gap="20px">
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>

      <Wrap spacing="10px">
        <WrapItem>
          <Weather />
        </WrapItem>

        <WrapItem>
          <CryptoPrices />
        </WrapItem>

        <WrapItem>
          <Horoscope />
        </WrapItem>
        <WrapItem>
          <RandomQuotes />
        </WrapItem>
      </Wrap>

      <Flex flexDirection="column" gap="20px">
        <FinanceNews />
        <TechnologiesNews />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
