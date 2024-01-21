import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { getRandomQuotes } from "../apis/QuoteApi";
import { DragHandleIcon } from "@chakra-ui/icons";

const RandomQuotes: React.FC = () => {
  const [quote, setQuote] = useState<any | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  const fetchQuote = async () => {
    try {
      const data = await getRandomQuotes(1);
      setQuote(data[0]);
      setLastFetchTime(Date.now());
      localStorage.setItem("lastFetchTime", JSON.stringify(Date.now()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedLastFetchTime = localStorage.getItem("lastFetchTime");
    if (storedLastFetchTime) {
      const lastFetch = JSON.parse(storedLastFetchTime);
      setLastFetchTime(lastFetch);
    }
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const shouldFetch =
      !lastFetchTime || Date.now() - lastFetchTime > oneDayInMillis;

    if (shouldFetch) {
      fetchQuote();
    }
  }, [lastFetchTime]);

  const handleGetAnotherQuote = () => {
    fetchQuote();
  };

  return (
    <Box
      border="1px solid var(--bordercolor)"
      borderRadius="10px"
      p="20px"
      width="max-content"
      position="relative"
      background="var(--lvl1-darkcolor)"
      maxW="300px"
      h="max-content"
      transition="box-shadow 0.3s ease-in-out"
      _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
    >
      <Flex justify="space-between" align="center" mb="2">
        <Text fontSize="md" fontWeight="bold">
          Daily Quote
        </Text>
        <button>
          <DragHandleIcon />{" "}
        </button>
      </Flex>
      {quote && (
        <Box>
          <Text>{quote.text}</Text>
          <Text fontSize="sm" fontStyle="italic" color="gray.500">
            - {quote.author}, {quote.category}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default RandomQuotes;
