import React, { useEffect, useState } from "react";
import { getFinanceArticles } from "../apis/FinanceApi";
import { Box, Text, Link, Flex, Wrap, Button } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const FinanceNews: React.FC = () => {
  const [financeArticles, setFinanceArticles] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchFinanceArticles = async () => {
      try {
        const cachedData = localStorage.getItem("financeNewsCache");
        const cachedTimestamp = localStorage.getItem("financeNewsTimestamp");

        const isDataValid =
          cachedData &&
          cachedTimestamp &&
          Date.now() - parseInt(cachedTimestamp, 10) < 30 * 24 * 60 * 60 * 1000;

        if (isDataValid) {
          setFinanceArticles(JSON.parse(cachedData));
          return;
        }

        const response = await getFinanceArticles();
        setFinanceArticles(response.Articles);

        localStorage.setItem(
          "financeNewsCache",
          JSON.stringify(response.Articles)
        );
        localStorage.setItem("financeNewsTimestamp", Date.now().toString());
      } catch (error) {
        console.log(error);
      }
    };

    fetchFinanceArticles();
  }, []);

  const handleNextClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, financeArticles.length - 4)
    );
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleArticles = financeArticles.slice(startIndex, startIndex + 4);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Finance News
      </Text>

      <Wrap spacing="10px">
        {visibleArticles.map((article) => (
          <Box
            key={article.ResourceId}
            p={4}
            maxW={315}
            h={180}
            borderWidth="1px"
            borderRadius="md"
            border="solid 1px var(--bordercolor)"
            bg="var(--lvl1-darkcolor)"
          >
            <Text fontSize="lg" fontWeight="bold" h={110}>
              {article.Title}
            </Text>
            <Text fontSize="md" color="gray.300">
              {article.AuthorName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {article.PublicationTime}
            </Text>
          </Box>
        ))}
      </Wrap>
      <Flex my={4} gap={2} justifyContent={"center"}>
        <Button
          fontSize="25px"
          onClick={handlePrevClick}
          disabled={startIndex === 0}
          variant="link"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          fontSize="25px"
          onClick={handleNextClick}
          disabled={
            startIndex >= financeArticles.length - 1 ||
            financeArticles.length === 0
          }
          variant="link"
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default FinanceNews;
