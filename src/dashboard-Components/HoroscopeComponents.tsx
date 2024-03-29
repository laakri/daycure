import React, { useEffect, useState } from "react";
import { fetchData } from "../apis/HoroscopeApi";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { LuClover } from "react-icons/lu";
import { CiHeart, CiHospital1 } from "react-icons/ci";

const Horoscope: React.FC = () => {
  const [horoscopeData, setHoroscopeData] = useState<any>(null);

  useEffect(() => {
    const fetchHoroData = async () => {
      try {
        // Attempt to retrieve cached data from localStorage
        const cachedData = localStorage.getItem("HoroscopeDataCache");
        const cachedTimestamp = localStorage.getItem("HoroscopeDataTimestamp");

        const isDataValid =
          cachedData &&
          cachedTimestamp &&
          Date.now() - parseInt(cachedTimestamp, 10) < 30 * 24 * 60 * 60 * 1000;

        if (isDataValid) {
          setHoroscopeData(JSON.parse(cachedData));
          return;
        }

        const data = await fetchData();
        setHoroscopeData(data);
        console.log("Horoscope data:", data);
      } catch (error) {
        console.error("Error fetching horoscope data:", error);
      }
    };

    fetchHoroData();
  }, []);

  return (
    <Flex
      rounded={10}
      border={"1px solid"}
      borderColor={"var(--bordercolor)"}
      p="10px"
      bg={"var(--Dashboard-garien-color)"}
      w="320px"
      h={320}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      position="relative"
    >
      <Box position={"absolute"} right="10px" top="10px">
        <button>
          <DragHandleIcon />
        </button>
      </Box>
      <Box h="70px" borderColor="gray.200" m="auto">
        <Image
          h="70px"
          src="https://pngimg.com/uploads/scorpio/small/scorpio_PNG31.png"
        />
      </Box>
      <Box maxW="300px" justifyContent="left" alignItems="center">
        <Box>
          <Text fontSize="md" fontWeight="bold">
            Your Luck Today
          </Text>
          <Text fontSize="md" color="gray.300">
            {horoscopeData ? horoscopeData.date : "15-01-2024"}
          </Text>
        </Box>
      </Box>

      {horoscopeData ? (
        <Flex
          direction="column"
          bg="var(--lvl2-darkcolor)"
          p="10px"
          mt="10px"
          rounded={10}
          mb={"15px"}
        >
          <Text
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {horoscopeData.prediction}
          </Text>
        </Flex>
      ) : (
        <Flex
          direction="column"
          bg={"var(--lvl1-darkcolor)"}
          p="10px"
          mt="10px"
          rounded="10px"
          mb={"15px"}
        >
          <p>Error on fetching data</p>
        </Flex>
      )}
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
          background="var( --lvl4-darkcolor)"
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
          background="var( --lvl4-darkcolor)"
          border={"1px solid "}
          borderColor={"RGBA(255, 255, 255, 0.06)"}
          gap="5px"
          p="0 7px"
        >
          <CiHeart size={"17px"} /> <Text fontSize={"14px"}> Love 3%</Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          borderRadius={20}
          background="var( --lvl4-darkcolor)"
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
  );
};

export default Horoscope;
