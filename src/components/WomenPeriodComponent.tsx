import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { IoWaterOutline, IoFlowerOutline } from "react-icons/io5";
import { PiBabyThin } from "react-icons/pi";

const WomenPeriod: React.FC = () => {
  return (
    <Flex
      rounded={10}
      border={"1px solid"}
      borderColor={"var(--bordercolor)"}
      p="10px"
      bg={"var(--Dashboard-garien-color)"}
      position="relative"
      w="320px"
      h={320}
      gap={"20px"}
      flexDirection={"column"}
    >
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid "}
        borderColor={"RGBA(255, 255, 255, 0.06)"}
        borderRadius={"10px"}
        background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
        gap={10}
      >
        <IoWaterOutline size={"25px"} color={"rgba(128, 127, 127, 0.842)"} />

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
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid "}
        borderColor={"RGBA(255, 255, 255, 0.06)"}
        borderRadius={"10px"}
        background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
        gap={2}
      >
        <PiBabyThin size={"50px "} color={"rgba(128, 127, 127, 0.842)"} />

        <Text
          fontSize="l"
          fontWeight="bold"
          color={"white"}
          display={"flex"}
          alignItems={"end"}
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
      </Flex>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        border={"1px solid "}
        borderColor={"RGBA(255, 255, 255, 0.06)"}
        borderRadius={"10px"}
        background="linear-gradient(to bottom, rgba(87, 87, 87, 0.209), transparent)"
        gap={2}
      >
        <IoFlowerOutline size={"50px "} color={"rgba(128, 127, 127, 0.842)"} />

        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={"rgba(128, 127, 127, 0.842)"}
          display={"flex"}
          alignItems={"end"}
        >
          Ovulation
        </Text>
        <Box
          display="flex"
          alignItems="center"
          borderRadius={21}
          background="linear-gradient(to bottom, rgba(127, 112, 251, 0.316), transparent)"
          border={"1px solid "}
          borderColor={"RGBA(255, 255, 255, 0.06)"}
          p="0 7px"
        >
          <CiCalendar size={"17px"} />
          <Text fontSize={"14px"}> Calender</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default WomenPeriod;
