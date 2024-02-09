import BMICalculatorComponent from "./BMICalculatorComponent";
import React, { StrictMode } from "react";
import ProfilBodyComponent from "./ProfilBodyComponent";
import { Flex } from "@chakra-ui/react";
import StatsFitnessComponent from "./StatsFitnessComponent";

const Fitness: React.FC = () => {
  return (
    <Flex gap={20}>
      <StatsFitnessComponent />
      <ProfilBodyComponent />
    </Flex>
  );
};

export default Fitness;
