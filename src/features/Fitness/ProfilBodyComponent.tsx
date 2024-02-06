import {
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { MdCheckCircle, MdSettings } from "react-icons/md";
import { BodyComponent } from "reactjs-human-body";
const ProfilBodyComponent: React.FC = () => {
  return (
    <Box
      maxW={"420px"}
      border={"1px solid"}
      p={"5"}
      borderRadius={"20px"}
      borderColor={"gray.700"}
    >
      <Heading as="h2" size="xl" color={"purple.500"}>
        Profil
      </Heading>
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
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>properties</Th>
              <Th>Values</Th>
              <Th isNumeric>Normal Values</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>Zbidi Chaima</Td>
              <Td isNumeric>-</Td>
            </Tr>
            <Tr>
              <Td>Age</Td>
              <Td>23 years</Td>
              <Td isNumeric>-</Td>
            </Tr>
            <Tr>
              <Td>BMI</Td>
              <Td>33 kg/m2</Td>
              <Td isNumeric>25 kg/m2</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Calories</Th>
              <Th>3200 Kcal</Th>
              <Th isNumeric>2120 Kcal</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default ProfilBodyComponent;
