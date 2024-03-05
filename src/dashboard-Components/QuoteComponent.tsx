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

    const oneDayInMillis = 30 * 24 * 60 * 60 * 1000;
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
    <Flex
      rounded={10}
      border={"1px solid"}
      borderColor={"var(--bordercolor)"}
      p="10px"
      bg={"var(--Dashboard-garien-color)"}
      w="320px"
      h={320}
      textAlign={"justify"}
      position="relative"
      flexDirection={"column"}
    >
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
      <Flex justify="space-between" align="center" mb="2">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color={"purple.400"}
          display={"flex"}
          alignItems={"end"}
          gap={"4px"}
        >
          Daily{" "}
          <Text color={"white"} fontSize="md">
            Quote
          </Text>
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
    </Flex>
  );
};

export default RandomQuotes;
