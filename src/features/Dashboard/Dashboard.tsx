import CryptoPrices from "../../dashboard-Components/CryptoComponent";
import RandomQuotes from "../../dashboard-Components/QuoteComponent";
import Horoscope from "../../dashboard-Components/HoroscopeComponents";
import Weather from "../../dashboard-Components/WeatherComponent";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Wrap,
} from "@chakra-ui/react";
import FinanceNews from "../../dashboard-Components/FinanceNewsComponent";
import TechnologiesNews from "../../dashboard-Components/TechnologiesNews";
import WomenProd from "../../dashboard-Components/WomenProdComponent";
import WomenPeriod from "../../dashboard-Components/WomenPeriodComponent";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
const Dashboard = () => {
  return (
    <Box m={"10px auto"} p={"10px"}>
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <Text>
        Find and add up to ten pairs in this view to display them at once.
      </Text>
      <Text
        fontSize="sm"
        color={"gray.400"}
        display={"flex"}
        alignItems={"center"}
        gap={1}
      >
        <IoInformationCircleOutline />
        Note that you can drag any element to a different position
      </Text>
      <InputGroup size="md" w={460} mt={3}>
        <Input borderColor={"gray.700"} placeholder="Add New Widget" />
        <InputRightElement w={"70px"}>
          <Button size="xs" bg={"gray.700"} mr={1} color={"white"} px={2}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <Wrap gap={30} mt={5}>
        <Weather />
        <CryptoPrices />
        <Horoscope />
        <RandomQuotes />
        <WomenProd />
        <WomenPeriod />
        <Flex
          rounded={10}
          border={"1px solid"}
          borderColor={"var(--bordercolor)"}
          bg={"var(--Dashboard-garien-color)"}
          w="320px"
          h={320}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Button fontSize={"xl"} variant={"unstyle"} rounded={"30px"} mb={3}>
              <FaPlus />
            </Button>
            <Text fontSize={"20px"}> Add new widget</Text>
            <Text fontSize={"16px"} color={"gray.400"}>
              You can do it
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap="20px">
          <FinanceNews />
          <TechnologiesNews />
        </Flex>
      </Wrap>
    </Box>
  );
};

export default Dashboard;
