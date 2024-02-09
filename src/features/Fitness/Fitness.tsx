import BMICalculatorComponent from "./BMICalculatorComponent";
import React, { StrictMode } from "react";
import ProfilBodyComponent from "./ProfilBodyComponent";
import { Flex } from "@chakra-ui/react";
import StatsFitnessComponent from "./StatsFitnessComponent";
import MuscleExerciceComponent from "./FitnessCalcul/MuscleExerciceComponent";

const Fitness: React.FC = () => {
  return (
    <Flex gap={20}>
      <MuscleExerciceComponent />
      <ProfilBodyComponent />
    </Flex>
  );
};

export default Fitness;
