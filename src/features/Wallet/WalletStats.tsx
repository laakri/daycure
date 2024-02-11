import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { CalendarIcon } from "@chakra-ui/icons";

const WalletStats = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    series: [
      { name: "Income", data: [] },
      { name: "Expense", data: [] },
    ],
  });

  useEffect(() => {
    // Fetch data from backend when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:4401/api/transactions/stats/65c62e1585bc357e64c9f354"
      );
      const data = await response.json();
      setChartData(data.chartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false, // Hide the toolbar
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#38A169", "#E53E3E"], // Green for income, red for expense
    },
    xaxis: {
      categories: chartData.labels,
    },
    grid: {
      show: false,
    },
  };

  const bgColor = useColorModeValue("var(--lvl1-darkcolor)", "gray.800");
  const borderColor = useColorModeValue("var(--bordercolor)", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex flexDirection={"column"} gap={5}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Wallet Stats
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            border={`${borderColor} solid 1px`}
            p={"5px 8px "}
            rounded={8}
            gap={3}
            display={"flex"}
            alignItems={"center"}
          >
            <CalendarIcon color={"gray.500"} />
            2024
          </Text>
        </Flex>
        <InputGroup size="md" borderColor={borderColor} maxW={"250px"}>
          <Input pr="4.5rem" placeholder="Search.." />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              color="white"
              bg={"gray.800"}
              _hover={{
                bg: "var(--maincolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        p={"10px 15px"}
        borderRadius={"20px"}
        w={"100%"}
        minH={"300px"}
        bg={bgColor}
        border={`1px solid ${borderColor}`}
        h={"100%"}
      >
        <Flex
          flexDirection={"column"}
          gap={3}
          justifyContent={"space-between"}
          w={150}
        >
          <Stat>
            <StatLabel color={"purple.300"}>Total Income</StatLabel>
            <StatNumber>300.00</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Box>
            <Stat>
              <StatLabel color={"red.300"}>Monthly Expenses</StatLabel>
              <StatNumber color={"red.100"}>100.00</StatNumber>
            </Stat>
            <Stat>
              <StatLabel color={"cyan.300"}>Remaining Amount</StatLabel>
              <StatNumber color={"cyan.50"}>100.00</StatNumber>
            </Stat>
          </Box>
        </Flex>
        <Box w={"calc(100% - 120px)"} color={textColor}>
          <Chart
            options={options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default WalletStats;
