import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Divider,
  HStack,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
} from "@chakra-ui/react";
import { BiCategory } from "react-icons/bi";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const WalletStats = () => {
  return (
    <Flex flexDirection={"column"} w={"calc(100% - 540px)"} gap={5}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Wallet Stats
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            border={"var(--bordercolor) solid 1px"}
            p={"5px 8px "}
            rounded={8}
            gap={3}
            display={"flex"}
            alignItems={"center"}
          >
            <CalendarIcon color={"gray.500"} />
            2024
          </Text>
        </Flex>
        <InputGroup size="md" borderColor={"gray.700"} maxW={"250px"}>
          <Input pr="4.5rem" placeholder="Search.." />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              color="white"
              bg={"gray.800"}
              _hover={{
                bg: "var(--maincolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Flex
        p={"10px 15px"}
        borderRadius={"20px"}
        w={"100%"}
        minH={"300px"}
        bg={"var(--lvl1-darkcolor)"}
        border={"1px solid var(--bordercolor)"}
        h={"100%"}
      >
        <Flex flexDirection={"column"} gap={3} justifyContent={"space-between"}>
          <Stat>
            <StatLabel color={"purple.300"}>Total Income</StatLabel>
            <StatNumber>300.00</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Box>
            <Stat>
              <StatLabel color={"red.300"}>Monthly Expenses</StatLabel>
              <StatNumber color={"red.100"}>100.00</StatNumber>
            </Stat>
            <Stat>
              <StatLabel color={"cyan.300"}>Remaining Amount</StatLabel>
              <StatNumber color={"cyan.50"}>100.00</StatNumber>
            </Stat>
          </Box>
        </Flex>
        <Box>
          <Image
            src="https://i.ibb.co/qJgL357/select-chart.png"
            alt="Dan Abramov"
          />
          {/* 
        <Text fontSize={"xl"} color={"#6b82a0"}>
          No Stats
        </Text>
        */}
        </Box>
      </Flex>
      <Flex justifyContent={"space-between"} px={5}>
        <Text fontSize={"xl"}>Transactions</Text>
        <Flex gap={4} p={"5px 10px"} bg={"var(--lvl1-darkcolor)"} rounded={4}>
          <Box
            bg={"var(--lvl4-darkcolor)"}
            p={" 0 10px"}
            rounded={4}
            _hover={{
              cursor: "pointer",
            }}
          >
            Infos
          </Box>
          <Box
            bg={"var(--lvl1-darkcolor)"}
            p={" 0 10px"}
            rounded={4}
            _hover={{
              cursor: "pointer",
            }}
          >
            History
          </Box>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" borderColor="var(--bordercolor)" />
      <Text p={"2px 7px"} maxW={"max-content"} rounded={7}>
        26 05 , 2024
      </Text>

      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"10px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3} w={"110px"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg={"red.800"}
              p={"7px"}
              rounded={"50%"}
              color={"red.200"}
            >
              <FaArrowTrendDown />
            </Flex>
            <Text fontWeight={"550"}>Expence</Text>
          </Flex>
          <Flex alignItems={"center"} gap={2}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg={"purple.800"}
              p={"2px 7px"}
              gap={2}
              rounded={5}
              color={"purple.100"}
            >
              <BiCategory />
              <Text>Family</Text>
            </Flex>
          </Flex>
          <Text fontSize={"sm"} color={"gray.300"}>
            buy new house in another country i duno where it is
          </Text>
        </Flex>
        <Flex>
          <Text fontSize={"17px"} color={"red.300"}>
            500.00 DT
          </Text>
        </Flex>
      </HStack>
      <HStack
        bg={"var(--lvl3-darkcolor)"}
        p={"10px 15px "}
        rounded={10}
        justifyContent={"space-between"}
      >
        <Flex gap={2} alignItems={"center"}>
          <Flex alignItems={"center"} gap={3} w={"110px"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg={"green.800"}
              p={"7px"}
              rounded={"50%"}
              color={"green.200"}
            >
              <FaArrowTrendUp />
            </Flex>
            <Text fontWeight={"550"}>Income</Text>
          </Flex>

          <Text fontSize={"sm"} color={"gray.300"}>
            buy new house in another country i duno where it is
          </Text>
        </Flex>
        <Flex>
          <Text fontSize={"17px"} color={"green.300"}>
            500.00 DT
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default WalletStats;
