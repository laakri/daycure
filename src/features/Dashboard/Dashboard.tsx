import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import {
  addWidgetToDashboard,
  deleteWidgetFromDashboard,
  fetchUserWidgets,
} from "../../states/Dashboard";
import CryptoPrices from "../../dashboard-Components/CryptoComponent";
import RandomQuotes from "../../dashboard-Components/QuoteComponent";
import Horoscope from "../../dashboard-Components/HoroscopeComponents";
import Weather from "../../dashboard-Components/WeatherComponent";
import FinanceNews from "../../dashboard-Components/FinanceNewsComponent";
import TechnologiesNews from "../../dashboard-Components/TechnologiesNews";
import WomenProd from "../../dashboard-Components/WomenProdComponent";
import WomenPeriod from "../../dashboard-Components/WomenPeriodComponent";

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    // Initial widgets
    <Weather />,
    <CryptoPrices />,
    <Horoscope />,
    <RandomQuotes />,
    <WomenProd />,
    <WomenPeriod />,
  ]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const userWidgets = await fetchUserWidgets();
        setWidgets(userWidgets);
      } catch (error) {
        console.error("Error fetching user's widgets:", error);
      }
    };

    fetchWidgets();
  }, []);

  const handleSearch = () => {
    // Filter widgets based on search input
    const filteredWidgets = widgets.filter((widget) =>
      widget.type.toLowerCase().includes(searchInput.toLowerCase())
    );
    setWidgets(filteredWidgets);
  };

  const handleAddWidget = async (widgetName: string) => {
    try {
      // Add widget to the dashboard
      const newWidget = await addWidgetToDashboard(widgetName);
      setWidgets([...widgets, newWidget]);
    } catch (error) {
      console.error("Error adding widget:", error);
    }
  };

  const handleDeleteWidget = async (widgetName: string) => {
    try {
      // Delete widget from the dashboard
      await deleteWidgetFromDashboard(widgetName);
      const updatedWidgets = widgets.filter(
        (widget) => widget.type !== widgetName
      );
      setWidgets(updatedWidgets);
    } catch (error) {
      console.error("Error deleting widget:", error);
    }
  };

  return (
    <Box m={"10px auto"} p={"10px"}>
      <Text fontSize="2xl" fontWeight="bold">
        Dashboard
      </Text>
      <Text>
        Find and add up to ten pairs in this view to display them at once.
      </Text>
      <Text
        fontSize="sm"
        color={"gray.400"}
        display={"flex"}
        alignItems={"center"}
        gap={1}
      >
        <IoInformationCircleOutline />
        Note that you can drag any element to a different position
      </Text>
      <InputGroup size="md" w={460} mt={3}>
        <Input
          borderColor={"gray.700"}
          placeholder="Add New Widget"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <InputRightElement w={"70px"}>
          <Button
            size="xs"
            bg={"gray.700"}
            mr={1}
            color={"white"}
            px={2}
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      <Wrap gap={30} mt={5}>
        {widgets.map((widget, index) => (
          <Flex
            key={index}
            rounded={10}
            border={"1px solid"}
            borderColor={"var(--bordercolor)"}
            bg={"var(--Dashboard-garien-color)"}
            w="320px"
            h={320}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {widget}
          </Flex>
        ))}
        <Flex
          rounded={10}
          border={"1px solid"}
          borderColor={"var(--bordercolor)"}
          bg={"var(--Dashboard-garien-color)"}
          w="320px"
          h={320}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Button fontSize={"xl"} variant={"unstyle"} rounded={"30px"} mb={3}>
              <FaPlus />
            </Button>
            <Text fontSize={"20px"}> Add new widget</Text>
            <Text fontSize={"16px"} color={"gray.400"}>
              You can do it
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection="column" gap="20px">
          <FinanceNews />
          <TechnologiesNews />
        </Flex>
      </Wrap>
    </Box>
  );
};

export default Dashboard;
