import React, { useState } from "react";
import ProfilBodyComponent from "./ProfilBodyComponent";
import { Flex } from "@chakra-ui/react";
import StatsFitnessComponent from "./StatsFitnessComponent";
import MuscleExerciceComponent from "./FitnessCalcul/MuscleExerciceComponent";
import FitnessExercise from "../../components/FitnessExercise";
import FitnessDashboard from "./FitnessDashboard";

const Fitness: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const handleBodyPartSelect = (selectedMuscle: string) => {
    setSelectedMuscle(selectedMuscle); // Update selectedMuscle state
  };

  console.log(selectedMuscle);

  return (
    <Flex gap={20}>
      <FitnessDashboard/>
    </Flex>
  );
};

export default Fitness;
