import React, { useEffect, useState } from "react";
import { fetchData } from "../apis/HoroscopeApi";
import { Box, Image, Text } from "@chakra-ui/react";
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
      <h1>Horoscope</h1>
      <Box
        borderColor="gray.200"
        backgroundColor="rgba(92, 92, 92, 0.158)"
        borderRadius="20px"
        p={4}
        maxW="300px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={2}
        border="1px"
      >
        <Box maxW="150px" borderColor="gray.200" p="10px">
          <Image src="https://pngimg.com/uploads/scorpio/small/scorpio_PNG31.png" />
        </Box>

        <Box 
          borderRadius="20px"
          p={2}
          maxW="300px"
          display="flex"
          justifyContent="left"
          alignItems="center"
        >
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Your Luck Today
            </Text>
            <Text fontSize="l" mb={2} color="gray">
              {horoscopeData ? horoscopeData.date : "15-01-2024"}
            </Text>
          </Box>

          <Box>
            <DragHandleIcon boxSize={6} marginLeft="110px" />
          </Box>
        </Box>

        {horoscopeData ? (
          <Box>{horoscopeData.prediction}</Box>
        ) : (
          <Box
            borderColor="gray.200"
            p="10px"
            borderRadius="20px"
            backgroundColor="rgba(92, 92, 92, 0.322)"
          >
            <p>
              Lorem ipsum dolor veritatis exercitationem debitis, reprehenderit
              natus ex eum nemo. 
            </p>
            
            <Box
              display="flex"
              flexDirection="row"
              gap={8}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(5, 172, 194, 0.966)"
                pl={3}
                pr={3}
                gap={2}
                mt={1} 
                maxW="70px"
              >
                <SunIcon /> 100%
              </Box>
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(118, 126, 6, 0.966)"
                pl={3}
                pr={3}
                mt={1} 
                gap={2}
                maxW="70px"
              >
                <StarIcon /> 60%
              </Box>
              <Box
                display="flex"
                alignItems="center"
                borderRadius={20}
                backgroundColor="rgba(238, 7, 207, 0.966)"
                gap={2}
                pl={3} 
                mt={1}
                pr={3}
                maxW="70px"
              >
                <ViewIcon /> 30%
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Horoscope;
