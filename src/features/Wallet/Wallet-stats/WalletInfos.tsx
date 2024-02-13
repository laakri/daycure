import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const WalletInfos = () => {
  const savingsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [{ name: "Savings", data: [1000, 1200, 800, 1500, 2000, 1800] }],
  };

  const expenseCategoriesData = {
    labels: [
      "Food",
      "Transportation",
      "Shopping",
      "Utilities",
      "Entertainment",
    ],
    series: [200, 150, 100, 300, 180],
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
      colors: ["#a94dff", "#a94dff"],
    },
    xaxis: {
      categories: savingsData.labels,
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

  const donutOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: expenseCategoriesData.labels,
    stroke: {
      width: 0,
    },
    colors: [
      "#530087",
      "#60009c",
      "#6e00b3",
      "#8e00ed",
      "#E5E7EB",
      "#9a00fa",
      "#9900ff",
    ],
  };
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex flexDirection={"column"} w={"100%"} gap={3}>
      <Flex justifyContent="space-between" gap={3}>
        <Box
          width={"50%"}
          bg={"var(--lvl1-darkcolor)"}
          border={"var(--bordercolor) solid 1px"}
          rounded={10}
        >
          <Text fontWeight="bold" m={4}>
            Savings Over Time
          </Text>
          <Chart
            options={options}
            series={savingsData.series}
            type="line"
            width="100%"
            color={textColor}
          />
        </Box>
        <Box
          width={"50%"}
          bg={"var(--lvl1-darkcolor)"}
          border={"var(--bordercolor) solid 1px"}
          rounded={10}
        >
          <Text fontWeight="bold" m={4}>
            Expense Categories Breakdown
          </Text>
          <Chart
            options={donutOptions}
            series={expenseCategoriesData.series}
            type="donut"
            width="100%"
            color={textColor}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default WalletInfos;
