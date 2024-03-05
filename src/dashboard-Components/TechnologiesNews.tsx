// TechnologiesNews.tsx
import React, { useEffect, useState } from "react";
import { getTechnologyNews } from "../apis/technologiesApi";
import { Box, Text, Link, Flex, Wrap, Button } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

const TechnologiesNews: React.FC = () => {
  const [technologyNews, setTechnologyNews] = useState<any[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchTechnologyNews = async () => {
      try {
        const cachedData = localStorage.getItem("technologyNewsCache");
        const cachedTimestamp = localStorage.getItem("technologyNewsTimestamp");

        const isDataValid =
          cachedData &&
          cachedTimestamp &&
          Date.now() - parseInt(cachedTimestamp, 10) < 30 * 24 * 60 * 60 * 1000;

        if (isDataValid) {
          setTechnologyNews(JSON.parse(cachedData));
          return;
        }

        const response = await getTechnologyNews();
        setTechnologyNews(response.data);

        localStorage.setItem(
          "technologyNewsCache",
          JSON.stringify(response.data)
        );
        localStorage.setItem("technologyNewsTimestamp", Date.now().toString());
      } catch (error) {
        console.log(error);
      }
    };

    fetchTechnologyNews();
  }, []);

  const handleNextClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, technologyNews.length - 4)
    );
  };

  const handlePrevClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const visibleNews = technologyNews.slice(startIndex, startIndex + 4);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Technology News
      </Text>

      <Wrap spacing="10px">
        {visibleNews.map((news) => (
          <Box
            key={news.date}
            p={4}
            maxW={315}
            minH={180}
            borderWidth="1px"
            borderRadius="md"
            border="solid 1px var(--bordercolor)"
            bg="var(--lvl1-darkcolor)"
          >
            <Text
              fontSize="lg"
              fontWeight="bold"
              h="4.5em"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              <Text>{news.title}</Text>
            </Text>
            <Text
              fontSize="md"
              color="gray.300"
              mt={2}
              maxH="3em"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {news.excerpt}
            </Text>
            <Flex justifyContent={"space-between"} alignItems={"center"} mt={3}>
              <Text fontSize="sm" color="gray.500">
                {news.relativeTime}
              </Text>

              <Link href={news.url} isExternal>
                <ExternalLinkIcon />
              </Link>
            </Flex>
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
        <Button fontSize="25px" onClick={handleNextClick} variant="link">
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default TechnologiesNews;
