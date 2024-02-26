import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";
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
import FinanceNews from "../../components/FinanceNewsComponent";
import TechnologiesNews from "../../components/TechnologiesNews";
import WomenProd from "../../components/WomenProdComponent";
import WomenPeriod from "../../components/WomenPeriodComponent";
import { Search2Icon } from "@chakra-ui/icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
const Dashboard = () => {
  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold">
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
        <Input borderColor={"gray.700"} placeholder="Search section" />
        <InputRightElement>
          <Button size="xs" bg={"gray.700"} mr={1} color={"white"}>
            <Search2Icon />
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
              {" "}
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
