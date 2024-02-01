import CryptoPrices from "../../components/CryptoComponent";
import RandomQuotes from "../../components/QuoteComponent";
import Horoscope from "../../components/HoroscopeComponents";
import Weather from "../../components/WeatherComponent";
import { PiBabyThin } from "react-icons/pi";
import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import FinanceNews from "../../components/FinanceNewsComponent";
import TechnologiesNews from "../../components/TechnologiesNews";
import WomenProd from "../../components/WomenProdComponent";
import Wallet from "../../components/WalletComponent";
import { LuClover } from "react-icons/lu";
import { CiHeart, CiHospital1, CiCalendar } from "react-icons/ci";
import { IoWaterOutline, IoFlowerOutline } from "react-icons/io5";
const Dashboard = () => {
  return (
    <Flex flexDirection="column" gap="20px">
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <Box height="380px" padding={"20px"} paddingBottom={"0px"}>
        <Flex gap={"30px"}>
          <WrapItem>
            <Weather />
          </WrapItem>

          <Box padding={"10px"} borderRadius={"20px"}>
            <Flex gap={"20px"}>
              <Flex direction={"column"} gap={"10px"}>
                <WrapItem>
                  <CryptoPrices />
                </WrapItem>
              </Flex>
              <Flex direction={"column"} gap={"10px"}>
                <WrapItem>
                  <Horoscope />
                </WrapItem>
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  h={"45px"}
                  w={"300px"}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    borderRadius={20}
                    border={"1px solid "}
                    borderColor={"RGBA(255, 255, 255, 0.06)"}
                    background="linear-gradient(to bottom, rgba(127, 112, 251, 0.316), transparent)"
                    gap="5px"
                    p="0 7px"
                  >
                    <LuClover size={"17px"} />
                    <Text fontSize={"14px"}> Luck 30%</Text>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    borderRadius={20}
                    background="linear-gradient(to bottom, rgba(127, 112, 251, 0.316), transparent)"
                    border={"1px solid "}
                    borderColor={"RGBA(255, 255, 255, 0.06)"}
                    gap="5px"
                    p="0 7px"
                  >
                    <CiHeart size={"17px"} />{" "}
                    <Text fontSize={"14px"}> Love 3%</Text>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    borderRadius={20}
                    background="linear-gradient(to bottom, rgba(127, 112, 251, 0.316), transparent)"
                    border={"1px solid "}
                    borderColor={"RGBA(255, 255, 255, 0.06)"}
                    gap="5px"
                    p="0 7px"
                  >
                    <CiHospital1 size={"17px"} />
                    <Text fontSize={"14px"}> Health 3%</Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex direction={"column"} gap={"10px"}>
                <Box
                  border={"1px solid "}
                  borderColor={"RGBA(255, 255, 255, 0.06)"}
                  borderRadius={"20px"}
                  background="linear-gradient(to bottom, rgba(127, 57, 218, 0.111), transparent)"
                  height={"90px"}
                  width={"300px"}
                >
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color={"white"}
                    textAlign={"center"}
                    p={"30px"}
                  >
                    1th February
                  </Text>
                </Box>

                <WrapItem>
                  <RandomQuotes />
                </WrapItem>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Flex height="380px" padding={"15px"} gap={"10"}>
        <WrapItem>
          <WomenProd />
        </WrapItem>
        <Flex
          rounded={"20px"}
          width={"900px"}
          h={"160px"}
          p={"10px"}
          gap={"20px"}
          background="linear-gradient(to bottom, rgba(127, 57, 218, 0.111), transparent)"
          border={"1px solid "}
          borderColor={"RGBA(255, 255, 255, 0.06)"}
        >
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid "}
            borderColor={"RGBA(255, 255, 255, 0.06)"}
            w={"120px"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"20px"}
            background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
          >
            <IoWaterOutline
              size={"50px "}
              color={"rgba(128, 127, 127, 0.842)"}
            />

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={"rgba(128, 127, 127, 0.842)"}
              display={"flex"}
              alignItems={"end"}
              gap={"4px"}
            >
              Next PMS
            </Text>
            <Text color={"white"} fontSize="xl" fontWeight="bold">
              Feb 8
            </Text>
          </Box>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid "}
            borderColor={"RGBA(255, 255, 255, 0.06)"}
            w={"220px"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"20px"}
            background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
          >
            <PiBabyThin size={"50px "} color={"rgba(128, 127, 127, 0.842)"} />

            <Text
              fontSize="l"
              fontWeight="bold"
              color={"white"}
              display={"flex"}
              alignItems={"end"}
              gap={"4px"}
              textAlign={"center"}
            >
              Chance of getting pregmant
            </Text>
            <Text
              color={"rgba(128, 127, 127, 0.842)"}
              fontSize="xl"
              fontWeight="bold"
            >
              High
            </Text>
          </Box>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            border={"1px solid "}
            borderColor={"RGBA(255, 255, 255, 0.06)"}
            w={"120px"}
            display={"flex"}
            flexDirection={"column"}
            borderRadius={"20px"}
            background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
          >
            <IoFlowerOutline
              size={"50px "}
              color={"rgba(128, 127, 127, 0.842)"}
            />

            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={"rgba(128, 127, 127, 0.842)"}
              display={"flex"}
              alignItems={"end"}
              gap={"4px"}
            >
              Ovulation
            </Text>
            <Box
              display="flex"
              alignItems="center"
              borderRadius={20}
              background="linear-gradient(to bottom, rgba(127, 112, 251, 0.316), transparent)"
              border={"1px solid "}
              borderColor={"RGBA(255, 255, 255, 0.06)"}
              gap="5px"
              p="0 7px"
            >
              <CiCalendar size={"17px"} />
              <Text fontSize={"14px"}> Calender</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap="20px">
        <FinanceNews />
        <TechnologiesNews />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
