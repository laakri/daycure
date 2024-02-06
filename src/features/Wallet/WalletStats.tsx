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
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchAllTransactions } from "../../states/wallet";
import React from "react";
import { initialCategoryIcons } from "./CategoriesIcons";

const WalletStats = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    fetchData();
  }, []);

  const groupTransactionsByDate = (transactions: any[]): any => {
    const sortedTransactions = transactions.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const currentDate = new Date();

      const diffA = Math.abs(dateA.getTime() - currentDate.getTime());
      const diffB = Math.abs(dateB.getTime() - currentDate.getTime());

      return diffA - diffB;
    });

    const groupedTransactions: any = {};
    sortedTransactions.forEach((transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });
    return groupedTransactions;
  };

  const groupedTransactions: any = groupTransactionsByDate(transactions);

  return (
    <Flex
      flexDirection={"column"}
      w={{ base: "80%", xl: "calc(100% - 540px)" }}
      gap={5}
    >
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
        <Flex
          flexDirection={"column"}
          gap={3}
          justifyContent={"space-between"}
          w={150}
        >
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
        <Box w={"calc(100% - 120px)"}>
          <Image
            rounded={10}
            src="https://i.ibb.co/qJgL357/select-chart.png"
            alt="Dan Abramov"
          />
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

      {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <React.Fragment key={date}>
          <Text p={"2px 7px"} maxW={"max-content"} rounded={7}>
            {date}
          </Text>
          {dateTransactions.map((transaction: any) => (
            <HStack
              key={transaction._id}
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
                    bg={transaction.isExpense ? "red.800" : "green.800"}
                    p={"7px"}
                    rounded={"50%"}
                    color={transaction.isExpense ? "red.200" : "green.200"}
                  >
                    {transaction.isExpense ? (
                      <FaArrowTrendDown />
                    ) : (
                      <FaArrowTrendUp />
                    )}
                  </Flex>
                  <Text fontWeight={"550"}>
                    {transaction.isExpense ? "Expense" : "Income"}
                  </Text>
                </Flex>
                {transaction.category !== "" && (
                  <Flex alignItems={"center"} gap={2}>
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      bg={"purple.900"}
                      p={"2px 7px"}
                      gap={2}
                      rounded={5}
                      color={"purple.100"}
                    >
                      {initialCategoryIcons[transaction.category]()}
                      <Text>{transaction.category}</Text>
                    </Flex>
                  </Flex>
                )}
                <Text fontSize={"sm"} color={"gray.300"}>
                  {transaction.description}
                </Text>
              </Flex>
              <Flex>
                <Text
                  fontSize={"17px"}
                  color={transaction.isExpense ? "red.300" : "green.300"}
                >
                  {transaction.amount} DT
                </Text>
              </Flex>
            </HStack>
          ))}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default WalletStats;
