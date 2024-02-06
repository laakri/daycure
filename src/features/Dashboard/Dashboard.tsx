import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";
import { Box, Flex, Text, Wrap } from "@chakra-ui/react";
import FinanceNews from "../../components/FinanceNewsComponent";
import TechnologiesNews from "../../components/TechnologiesNews";
import WomenProd from "../../components/WomenProdComponent";
import WomenPeriod from "../../components/WomenPeriodComponent";
const Dashboard = () => {
  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <Wrap gap={30} mt={10}>
        <Weather />
        <CryptoPrices />
        <Horoscope />
        <RandomQuotes />
        <WomenProd />
        <WomenPeriod />
        <Flex flexDirection="column" gap="20px">
          <FinanceNews />
          <TechnologiesNews />
        </Flex>
      </Wrap>
    </Box>
  );
};

export default Dashboard;
