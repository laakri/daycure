import {
  Text,
  Flex,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const BodyFatComponent = () => {
  return (
    <Flex flexDirection={"row"} gap={10}>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Text fontSize={"xl"} color={"purple.100"}>
          Body Fat Calculator
        </Text>
        <Input
          placeholder="Neck"
          bg={"var(--lvl1-darkcolor)"}
          h={"40px"}
          border={"1px solid transparent"}
        />
        <Input
          placeholder="Waist  "
          bg={"var(--lvl1-darkcolor)"}
          h={"40px"}
          border={"1px solid transparent"}
        />
        <Button
          color={"var(--chakra-colors-chakra-body-text)"}
          bg={"var(--maincolor)"}
          _hover={{
            bg: "var(--hover-maincolor)",
            color: "var(--chakra-colors-chakra-body-text)",
          }}
          mt={5}
          w={"100%"}
        >
          Calcul
        </Button>
      </Box>
      <Box>
      <Text fontSize={"xl"} color={"purple.100"}>
          Resultat
        </Text>
        <InputGroup>
          <Input
            placeholder="Body fat percentage"
            bg={"var(--lvl1-darkcolor)"}
            textAlign={"center"}
            h={"100px"}
            fontSize={"20px"}
            border={"1px solid transparent"}
            mb={"10px"}
            disabled
            mt={2}
          />
          <InputRightElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            %
          </InputRightElement>
        </InputGroup>
        <Text fontSize={"l"} color={"gray.400"} textAlign={'left'} mt={'2px'}>
           Bidy Fat : Average
        </Text>
      </Box>
      <Box>
      <Text fontSize={"xl"} color={"purple.100"}>
          Reference
        </Text>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Women</Th>
              <Th> Men</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Essential fat</Td>
              <Td>10-13%</Td>
              <Td isNumeric>2-5%</Td>
            </Tr>
            <Tr>
              <Td>Athletes</Td>
              <Td>14-20%</Td>
              <Td isNumeric>6-13%</Td>
            </Tr>
            <Tr>
              <Td>Fitness</Td>
              <Td>21-24%</Td>
              <Td isNumeric>14-17%</Td>
            </Tr>
            <Tr>
              <Td>Average</Td>
              <Td>25-31%</Td>
              <Td isNumeric>18-24%</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Obese</Th>
              <Th>32+%</Th>
              <Th isNumeric>25+%</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      </Box>
    </Flex>
  );
};

export default BodyFatComponent;
