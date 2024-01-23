import { AddIcon, CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  SlideFade,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  StatHelpText,
  Wrap,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
const categories = [
  "Groceries",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Utilities",
  "Utilities",
  "Utilities",
  "Other",
];
const transactions = [
  { id: 1, description: "Transaction 1", amount: 20.0, category: "Groceries" },
  { id: 2, description: "Transaction 2", amount: -15.0, category: "Shopping" },
  { id: 2, description: "Transaction 2", amount: 15.0, category: "Shopping" },
  { id: 2, description: "Transaction 2", amount: -15.0, category: "Shopping" },
  // Add more transactions as needed
];
const Wallet = () => {
  const borderColor = useColorModeValue("gray.700", "gray.300");
  const circleRadius = 160; // Adjust the radius as needed
  const center = { x: circleRadius, y: circleRadius };
  const calculatePosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / categories.length;
    const x = center.x + circleRadius * Math.cos(angle);
    const y = center.y + circleRadius * Math.sin(angle);
    return { x, y };
  };
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Wallet Stats
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            border={"var(--bordercolor) solid 1px"}
            p={"5px 5px 5px 8px "}
            rounded={8}
            gap={3}
            display={"flex"}
            alignItems={"center"}
          >
            <CalendarIcon color={"gray.500"} />
            2024
          </Text>
        </Flex>
        <InputGroup size="md" borderColor={"gray.700"} maxW={"300px"}>
          <Input pr="4.5rem" placeholder="Search.." />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              color="white"
              bg={"gray.800"}
              _hover={{ bg: "teal.600" }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex mt={10} gap={3}>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel fontSize={"xl"}> Total</StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"green.400"} fontSize={"xl"}>
              Income
            </StatLabel>
            <StatNumber>0.00 Dt</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"red.400"} fontSize={"xl"}>
              Expenses
            </StatLabel>{" "}
            <StatNumber>0.00 Dt </StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          w={"calc(100% / 4)"}
          rounded={10}
          p={"10px 20px"}
        >
          <Stat>
            <StatLabel color={"blue.400"} fontSize={"xl"}>
              Savings
            </StatLabel>
            <StatNumber>0.00 Dt</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Box>
      </Flex>
      <Wrap spacing={4}>
        <Box
          border="1px"
          borderColor="gray.700"
          mt={10}
          w="calc(100% - 520px)"
          rounded={10}
          py={3}
          px={5}
        >
          <Table variant="simple" size="sm">
            <TableCaption>Transactions</TableCaption>
            <Thead>
              <Tr borderBottom="2px  solid" borderColor={"gray.700"}>
                <Th color={"gray.500"}>Description</Th>
                <Th color={"gray.500"}>Amount</Th>
                <Th color={"gray.500"}>Category</Th>
                <Th color={"gray.500"}>Type</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr
                  key={transaction.id}
                  borderBottom="2px  solid"
                  borderColor={"gray.800"}
                >
                  <Td>{transaction.description}</Td>
                  <Td>{transaction.amount}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>
                    <Text
                      w={"max-content"}
                      p={"2px 7px "}
                      rounded={7}
                      bg={transaction.amount >= 0 ? "green.900" : "red.900"}
                      color={transaction.amount >= 0 ? "green.300" : "red.300"}
                      fontWeight="bold"
                    >
                      {transaction.amount >= 0 ? "Income" : "Expense"}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box
          border={"1px"}
          borderColor={"gray.700"}
          mt={10}
          w={"500px"}
          rounded={10}
          py={3}
          px={5}
        >
          <Text fontSize={"xl"}>Category </Text>
          <Flex align="center" justify="center" py={50} px={70}>
            <SlideFade in>
              <Box position="relative">
                <Circle
                  size="320px"
                  border="solid 1px"
                  borderColor={borderColor}
                  shadow="md"
                  position="relative"
                >
                  {categories.map((category, index) => {
                    const { x, y } = calculatePosition(index);
                    return (
                      <Button
                        key={index}
                        aria-label={category}
                        size="sm"
                        fontSize="md"
                        color="gray.1000"
                        bg={"gray.700"}
                        position="absolute"
                        left={x}
                        _hover={{ bg: "teal.600" }}
                        top={y}
                        transform="translate(-50%, -50%)"
                      >
                        {category}
                      </Button>
                    );
                  })}
                  <Button
                    size="md"
                    fontSize="md"
                    rounded={10}
                    position="absolute"
                    borderColor={"gray.600"}
                    color={"gray.100"}
                    boxShadow="lg"
                    variant="outline"
                    _hover={{ bg: "teal.500" }}
                    gap={3}
                    alignItems={"center"}
                  >
                    <AddIcon fontSize="xs" />
                    Category
                  </Button>
                </Circle>
              </Box>
            </SlideFade>
          </Flex>
        </Box>
      </Wrap>
    </Box>
  );
};

export default Wallet;
