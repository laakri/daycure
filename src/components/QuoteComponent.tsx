import React, { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
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
      w="320px"
      h="max-content"
    >
      <Flex justify="space-between" align="center" mb="2">
        <Text fontSize="md" fontWeight="bold">
          Daily Quote
        </Text>
        <Box position={"absolute"} right="10px" top="10px">
          <button>
            <DragHandleIcon />
          </button>
        </Box>
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
