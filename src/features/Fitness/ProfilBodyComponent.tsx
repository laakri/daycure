import {
  Box,
  Divider,
  Flex,
  Heading,
Text
} from "@chakra-ui/react";
import React from "react";
import { BodyComponent } from "reactjs-human-body";
const ProfilBodyComponent: React.FC = () => {
  return (
    <Box
      maxW={"420px"}
      p={"5"}
      borderRadius={"20px"}
    >
    
      <BodyComponent
        partsInput={{
          head: { show: true },
          leftShoulder: { show: true },
          rightShoulder: { show: true },
          leftArm: { show: true },
          rightArm: { show: true },
          chest: { show: true },
          stomach: { show: true },
          leftLeg: { show: true },
          rightLeg: { show: true },
          leftHand: { show: true },
          rightHand: { show: true },
          leftFoot: { show: true },
          rightFoot: { show: true },
        }}
      />
      <Box borderRadius={'10px'} border={'1px solid'}minW={'400px'} p={3} borderColor={'gray.700'}>
        <Heading size={'l'} color={'gray.300'}>
          Profil
        </Heading>
      <Divider orientation="horizontal" borderColor="var(--bordercolor)" mb={1} mt={1}/>

        <Flex justifyContent={'space-between'}>
        <Text as="h2" size="xl" color={"gray.500"}>
        Sheima Zbidi
      </Text>
      <Text as="h2" size="xl" color={"gray.500"}>
161 cm
      </Text>
        </Flex>
        <Flex justifyContent={'space-between'}>

        <Text as="h2" size="xl" color={"gray.500"}>
        23 years
      </Text>
      <Text as="h2" size="xl" color={"gray.500"}>
69 kg
      </Text>
        </Flex>
    
     
      </Box>
    </Box>
  );
};
export default ProfilBodyComponent;
