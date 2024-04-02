import {
  Box,
  Flex,
  HStack,
  Text,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { fetchAllTransactions } from "../../../states/wallet";
import React from "react";
import { initialCategoryIcons } from "../CategoriesIcons";
import { useQuery } from "react-query";

const WalletListTransactions = () => {
  const { data } = useQuery("transactions", fetchAllTransactions);

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

  const groupedTransactions: any = groupTransactionsByDate(data ?? []);

  return (
    <Box px={2}>
      <Flex justifyContent={"space-between"} py={2}>
        <Text fontSize={"xl"}>Transactions</Text>
        <InputGroup
          size="md"
          borderColor={"var(--bordercolor) "}
          maxW={"250px"}
        >
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
      <Divider
        orientation="horizontal"
        borderColor="var(--bordercolor)"
        my={2}
      />

      {Object.entries(groupedTransactions).map(([date, data]) => (
        <React.Fragment key={date}>
          <Text p={"2px 7px"} maxW={"max-content"} rounded={7}>
            {date}
          </Text>
          {data.map((transaction: any) => (
            <HStack
              key={transaction._id}
              bg={"gray.900"}
              p={"10px 15px "}
              rounded={10}
              justifyContent={"space-between"}
              my={"7px"}
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
    </Box>
  );
};
export default WalletListTransactions;
