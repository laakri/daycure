import BMICalculatorComponent from "./BMICalculatorComponent";
import React, { StrictMode } from "react";
import ProfilBodyComponent from "./ProfilBodyComponent";
import { Flex } from "@chakra-ui/react";

const Fitness: React.FC = () => {
 

  return (

<Flex
gap={20}
>
<BMICalculatorComponent/>
<ProfilBodyComponent/>

</Flex>

  );
};

export default Fitness;
