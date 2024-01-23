import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";

import {
  Flex,

  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import FinanceNews from "../../components/FinanceNewsComponent";
import TechnologiesNews from "../../components/TechnologiesNews";
import WomenProd from "../../components/WomenProdComponent";
import Wallet from "../../components/WalletComponent";

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
        <WrapItem>
          <WomenProd />
        </WrapItem>
      </Wrap>

      <Flex flexDirection="column" gap="20px">
        <FinanceNews />
        <TechnologiesNews />
       <Wallet/>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
