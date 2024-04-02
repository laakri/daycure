import { useState } from "react";
import {
  Box,
  Flex,
  Text,
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import {
  fetchWalletNumberStatsData,
  fetchWalletStatsData,
} from "../../../states/wallet";

const WalletStats = () => {
  const [selectedOption, setSelectedOption] = useState("All");

  const {
    data: statsData,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery("walletNumberStats", fetchWalletNumberStatsData);

  const { data: chartData } = useQuery(
    ["walletStatsData", selectedOption],
    () => fetchWalletStatsData(selectedOption),
    { enabled: !!selectedOption }
  );

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
      categories: chartData?.labels || [],
      labels: {
        style: {
          colors: ["#D1D5DB"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#D1D5DB"],
        },
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const bgColor = useColorModeValue("var(--lvl1-darkcolor)", "gray.900");
  const borderColor = useColorModeValue("var(--bordercolor)", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex flexDirection={"column"} gap={5}>
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
              {statsLoading
                ? "Loading..."
                : statsError
                ? "Error"
                : statsData
                ? statsData.totalIncome
                : "..."}
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
              {statsLoading
                ? "Loading..."
                : statsError
                ? "Error"
                : statsData
                ? statsData.totalExpense
                : "..."}
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
              {statsLoading
                ? "Loading..."
                : statsError
                ? "Error"
                : statsData
                ? statsData.remainingAmount
                : "..."}
              <Text fontSize={"xs"} color={"gray.400"}>
                DT
              </Text>
            </StatNumber>
          </Stat>
        </Flex>
        <Box w={"calc(100% - 80px)"} color={textColor}>
          <Chart
            options={options}
            series={chartData?.series || []}
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
