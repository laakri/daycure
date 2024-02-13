import { Box, Text, Flex } from "@chakra-ui/react";
import Chart from "react-apexcharts";

const WalletInfos = () => {
  // Static local data for demonstration
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
    series: [200, 150, 100, 300, 180], // Dummy values for demonstration
  };

  const incomeVsExpensesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    series: [
      { name: "Income", data: [3000, 3200, 2800, 3500, 4000, 3800] },
      { name: "Expenses", data: [1500, 1300, 1800, 2000, 2200, 2000] },
    ],
  };

  const options = {
    // Options for the charts (customize as needed)
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      colors: ["#4a0ac9", "#bf13d6"],
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
    stroke: {
      curve: "smooth",
      width: 5,
      colors: ["#4a0ac9", "#bf13d6"],
    },
    legend: {
      show: false,
    },
  };

  const donutOptions = {
    // Options for the donut chart (customize as needed)
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    labels: expenseCategoriesData.labels,
    stroke: {
      width: 0, // Remove border
    },
    colors: ["#4a0ac9", "#8B5CF6", "#D1D5DB", "#9CA3AF", "#E5E7EB"], // Custom colors for donut segments
  };

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
          />
        </Box>
      </Flex>
      <Box
        width={"100%"}
        bg={"var(--lvl1-darkcolor)"}
        border={"var(--bordercolor) solid 1px"}
        rounded={10}
      >
        <Text fontWeight="bold" m={4}>
          Income vs Expenses Comparison
        </Text>
        <Chart
          options={options}
          series={incomeVsExpensesData.series}
          type="bar"
          width="100%"
          height={280}
        />
      </Box>
    </Flex>
  );
};

export default WalletInfos;
