import React, { useEffect, useState } from "react";
import { fetchData } from "../apis/HoroscopeApi";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { DragHandleIcon, SunIcon, StarIcon, ViewIcon } from "@chakra-ui/icons";

const Horoscope: React.FC = () => {
  const [horoscopeData, setHoroscopeData] = useState<any>(null);

  useEffect(() => {
    const fetchHoroData = async () => {
      try {
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
    <div>
      <Box
        borderRadius="20px"
        border={"1px solid"}
        borderColor={"RGBA(255, 255, 255, 0.06)"}
        height={"250px"}
        maxW="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        background="linear-gradient(to bottom, rgba(127, 57, 218, 0.111), transparent)"
        position="relative"
        p="15px"
        minW="300px"
      >
        <Box position={"absolute"} right="10px" top="10px">
          <button>
            <DragHandleIcon />
          </button>
        </Box>
        <Box maxW="150px" maxH="120px" borderColor="gray.200" p="10px" m="auto " mt={'20px'}>
          <Image
            maxH="80px"
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
            bg="rgba(226, 226, 226, 0.111)"
            p="10px"
            mt="10px"
            rounded="20px"
            mb={"15px"}
          >
            <p>{horoscopeData.prediction}</p>

          </Flex>
        ) : (
          <Flex
            direction="column"
            bg="rgba(226, 226, 226, 0.111)"

            p="10px"
            mt="10px"
            rounded="20px"
            mb={"15px"}
          >
            <p>
              Lorem ipsum dolor veritatis exercitationem debitis, reprehenderit
              natus ex eum nemo.
            </p>

          </Flex>
        )}
      </Box>
    </div>
  );
};

export default Horoscope;
