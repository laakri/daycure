import React, { useEffect, useState } from "react";
import { getCryptoData } from "../apis/CryptoApi";
import { Box, Text, Flex, Image, Link } from "@chakra-ui/react";
import { DragHandleIcon, RepeatIcon } from "@chakra-ui/icons";

const CryptoPrices: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any>(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Attempt to retrieve cached data from localStorage
        const cachedData = localStorage.getItem("cryptoDataCache");
        const cachedTimestamp = localStorage.getItem("cryptoDataTimestamp");

        // Check if cached data is still valid (within 5 minutes)
        const isDataValid =
          cachedData &&
          cachedTimestamp &&
          Date.now() - parseInt(cachedTimestamp, 10) < 300000;

        if (isDataValid) {
          // If valid, set data from cache
          setCryptoData(JSON.parse(cachedData));
          return;
        }

        // If not valid or no cache, make a new API request
        const response = await getCryptoData();

        // Extract only the top 5 coins
        const top5Coins = response.data.coins.slice(0, 5);

        setCryptoData({ ...response.data, coins: top5Coins });

        // Update the cached data and timestamp in localStorage
        localStorage.setItem("cryptoDataCache", JSON.stringify(response.data));
        localStorage.setItem("cryptoDataTimestamp", Date.now().toString());
      } catch (error) {
        console.log(error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <Box
      border="1px solid var(--bordercolor)"
      borderRadius="10px"
      p="10px"
      width="max-content"
      background="var(--lvl1-darkcolor)"
      position="relative"
      minW="350px"
    >
      <Box position={"absolute"} right="10px">
        <button>
          <DragHandleIcon />
        </button>
      </Box>
      <Flex alignItems={"Center"} gap={"10px"}>
        <Text fontSize="md" fontWeight="bold">
          Top Cryptos
        </Text>
        <Box>
          <Link
            size="sm"
            p={0}
            color="gray.400"
            display="flex"
            alignItems="center"
            gap="10px"
          >
            <RepeatIcon />
            Refresh
          </Link>
        </Box>
      </Flex>
      <Text fontSize="md" color="gray.300">
        Check out the latest crypto prices
      </Text>
      {cryptoData && (
        <Flex
          direction="column"
          bg="var(--lvl3-darkcolor)"
          p="0 10px 10px 10px"
          mt="10px"
          rounded="10px"
        >
          {cryptoData.coins.map((coin: any) => (
            <Flex
              key={coin.uuid}
              align="center"
              mt={2}
              borderBottom="1px solid var(--bordercolor)"
              pb="2"
            >
              <Image src={coin.iconUrl} boxSize="20px" mr="2" />
              <Text fontSize="lg" fontWeight="bold">
                {coin.name} ({coin.symbol})
              </Text>
              <Text fontSize="lg" ml="auto">
                ${parseFloat(coin.price).toFixed(2)}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default CryptoPrices;
