
import {
    Box,
    HStack,
    Text,
    Flex,
  
  } from "@chakra-ui/react";
;
  import { useState } from "react";
  import React from "react";
import BMIComponent from "./FitnessCalcul/BMIComponent";
import CaloriesComponent from "./FitnessCalcul/CaloriesComponent";
import BodyFatComponent from "./FitnessCalcul/BodyFatComponent";
  
  const BMICalculatorComponent:React.FC = () => {
    const [activeComponent, setActiveComponent] = useState("BMI");
   
  
    const handleTabClick = (tab: string) => {
      setActiveComponent(tab);
    };
    return (
      <Box position="sticky" top="30px" zIndex="sticky">
        <Box
          w={{ base: "420px", md: "720px", xl: "950px" }}
          border={"solid 1px "}
          borderColor={"#3b3a3a44"}
          p={"20px 30px"}
          rounded={10}
          bg={"var(--lvl3-darkcolor)"}
        >
          <HStack mb={5} justifyContent={"space-between"}>
            <Flex gap={20}>
              <Text
                w={"max-content"}
                p={"5px 7px"}
                rounded={10}
                bg={activeComponent === "BMI" ? "var(--lvl1-darkcolor)" : ""}
                color={activeComponent === "BMI" ? "" : "gray.400"}
                fontWeight={activeComponent === "BMI" ? "700" : "normal"}
                cursor="pointer"
                onClick={() => handleTabClick("BMI")}
              >
                BMI
              </Text>
              <Text
                w={"max-content"}
                p={"5px 7px"}
                rounded={10}
                bg={activeComponent === "CALORIES" ? "var(--lvl1-darkcolor)" : ""}
                color={activeComponent === "CALORIES" ? "" : "gray.400"}
                fontWeight={activeComponent === "CALORIES" ? "700" : "normal"}
                cursor="pointer"
                onClick={() => handleTabClick("CALORIES")}
              >
                 Ideal Weight
              </Text>
              <Text
                w={"max-content"}
                p={"5px 7px"}
                rounded={10}
                bg={activeComponent === "Body" ? "var(--lvl1-darkcolor)" : ""}
                color={activeComponent === "Body" ? "" : "gray.400"}
                fontWeight={activeComponent === "Body" ? "700" : "normal"}
                cursor="pointer"
                onClick={() => handleTabClick("Body")}
              >
                Body Fat
              </Text>
            </Flex>
          
          </HStack>
  
          {activeComponent === "BMI" && <BMIComponent />}
          {activeComponent === "CALORIES" && <CaloriesComponent />}
          {activeComponent === "Body" && <BodyFatComponent />}

        </Box>
  
       
      </Box>
    );
  };
  
  export default BMICalculatorComponent;
  