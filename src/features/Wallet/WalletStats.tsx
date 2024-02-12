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
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import { CalendarIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface WalletStatsProps {
  onTransactionAdded: () => void;
}

const WalletStats: React.FC<WalletStatsProps> = ({ onTransactionAdded }) => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [StatsData, setStatsData] = useState<any | null>(null);
  const [chartData, setChartData] = useState({
    labels: [],
    series: [
      { name: "Expense", data: [] },
      { name: "Income", data: [] },
    ],
  });

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption, onTransactionAdded]);

  const fetchData = async (range: string) => {
    try {
      const response = await fetch(
        `http://localhost:4401/api/transactions/stats/65c62e1585bc357e64c9f354/${range}`
      );
      const data = await response.json();
      setChartData(data.chartData);
      const responsees = await fetch(
        `http://localhost:4401/api/transactions/stats-number/65c62e1585bc357e64c9f354`
      );
      const datastats = await responsees.json();
      setStatsData(datastats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },

    fill: {
      type: "gradient",
    },
    stroke: {
      curve: "smooth",
      width: 5,
      colors: ["#66DA26", "#E53E3E"],
    },
    xaxis: {
      categories: chartData.labels,
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
  };
  const bgColor = useColorModeValue("var(--lvl1-darkcolor)", "gray.800");
  const borderColor = useColorModeValue("var(--bordercolor)", "gray.700");
  const textColor = useColorModeValue("black", "white");

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
  };

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
        maxH={"300px"}
        position={"relative"}
        overflow={"hidden"}
      >
        <Flex flexDirection={"column"} gap={5} w={100}>
          <Stat>
            <StatLabel color={"purple.300"}>Total Income</StatLabel>
            <StatNumber display={"flex"} alignItems={"center"} gap={1}>
              {StatsData ? StatsData.totalIncome : "..."}
              <Text fontSize={"xs"} color={"gray.400"}>
                DT
              </Text>
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={"red.300"}>Monthly Expenses</StatLabel>
            <StatNumber
              color={"red.100"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              {StatsData ? StatsData.totalExpense : "..."}
              <Text fontSize={"xs"} color={"gray.400"}>
                DT
              </Text>
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel color={"cyan.300"}>Remaining Amount</StatLabel>
            <StatNumber
              color={"cyan.50"}
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              {StatsData ? StatsData.remainingAmount : "..."}
              <Text fontSize={"xs"} color={"gray.400"}>
                DT
              </Text>
            </StatNumber>
          </Stat>
        </Flex>
        <Box w={"calc(100% - 80px)"} color={textColor}>
          <Chart
            options={options}
            series={chartData.series}
            type="line"
            height={280}
          />
        </Box>
        <Flex position={"absolute"} right={3}>
          <Menu placement="bottom-end" colorScheme="gray">
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg={"var(--lvl3-darkcolor)"}
              color={"white"}
              px={2}
              h={8}
              display={"flex"}
              _active={{
                bg: "var(--lvl3-darkcolor)",
              }}
              border={"var(--bordercolor) solid 1px"}
            >
              {selectedOption}
            </MenuButton>
            <MenuList
              bg={"var(--lvl3-darkcolor)"}
              borderColor={"var(--bordercolor)"}
              zIndex={10000}
              style={{
                minWidth: "unset",
                maxWidth: "150px",
              }}
            >
              <MenuItem
                minH="48px"
                bg={"var(--lvl3-darkcolor)"}
                _hover={{
                  bg: "var(--lvl1-darkcolor)",
                  color: "white",
                }}
                borderColor={"transparent"}
                onClick={() => handleOptionSelect("All")}
              >
                All
              </MenuItem>
              <MenuItem
                minH="48px"
                bg={"var(--lvl3-darkcolor)"}
                _hover={{
                  bg: "var(--lvl1-darkcolor)",
                  color: "white",
                }}
                borderColor={"transparent"}
                onClick={() => handleOptionSelect("Year")}
              >
                Year
              </MenuItem>
              <MenuItem
                minH="40px"
                bg={"var(--lvl3-darkcolor)"}
                _hover={{
                  bg: "var(--lvl1-darkcolor)",
                  color: "white",
                }}
                borderColor={"transparent"}
                onClick={() => handleOptionSelect("Month")}
              >
                Month
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WalletStats;
