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
        border="1px var(--bordercolor) solid"
        borderRadius="10px"
        maxW="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        background="var(--lvl1-darkcolor)"
        position="relative"
        p="10px"
        minW="320px"
      >
        <Box position={"absolute"} right="10px" top="10px">
          <button>
            <DragHandleIcon />
          </button>
        </Box>
        <Box maxW="150px" maxH="120px" borderColor="gray.200" p="10px" m="auto">
          <Image
            maxH="100px"
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
          <Box>{horoscopeData.prediction}</Box>
        ) : (
          <Flex
            direction="column"
            bg="var(--lvl3-darkcolor)"
            p="10px"
            mt="10px"
            rounded="10px"
          >
            <p>
              Lorem ipsum dolor veritatis exercitationem debitis, reprehenderit
              natus ex eum nemo.
            </p>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              mt="10px"
            >
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(5, 172, 194, 0.966)"
                gap="5px"
                p="0 10px"
              >
                <SunIcon /> 100%
              </Box>
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(118, 126, 6, 0.966)"
                gap="5px"
                p="0 10px"
              >
                <StarIcon /> 60%
              </Box>
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(2--38, 7, 207, 0.966)"
                gap="5px"
                p="0 10px"
              >
                <ViewIcon /> 30%
              </Box>
            </Box>
          </Flex>
        )}
      </Box>
    </div>
  );
};

export default Horoscope;
