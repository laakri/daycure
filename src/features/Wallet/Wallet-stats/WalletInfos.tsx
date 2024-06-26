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
      width: 4,
      colors: ["#06070a"],
    },
    colors: [
      "#dc731f",
      "#5fc8dd",
      "#535cf8",
      "#c31b2a",
      "#7979b6",
      "#9a00fa",
      "#9900ff",
    ],
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "80%",
          stroke: {
            width: 1,
            colors: ["transparent"],
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex flexDirection={"column"} w={"100%"} gap={3}>
      <Flex justifyContent="space-between" gap={3}>
        <Box width={"50%"} bg={"gray.900"} rounded={10}>
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
        <Box width={"50%"} bg={"gray.900"} rounded={10}>
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
