import React, { useState } from "react";
import ProfilBodyComponent from "./ProfilBodyComponent";
import { Flex } from "@chakra-ui/react";
import StatsFitnessComponent from "./StatsFitnessComponent";
import MuscleExerciceComponent from "./FitnessCalcul/MuscleExerciceComponent";
import FitnessExercise from "../../components/FitnessExercise";

const Fitness: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const handleBodyPartSelect = (selectedMuscle: string) => {
    setSelectedMuscle(selectedMuscle); // Update selectedMuscle state
  };

  console.log(selectedMuscle);

  return (
    <Flex gap={20}>
      {selectedMuscle ? (
        <MuscleExerciceComponent />
      ) : (
        <FitnessExercise/>

      )}
      <ProfilBodyComponent onBodyPartSelect={handleBodyPartSelect} /> {/* Pass the function to handle selected muscle */}
    </Flex>
  );
};

export default Fitness;
