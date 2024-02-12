import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { fetchAllTransactions } from "../../states/wallet";
import React from "react";
import { initialCategoryIcons } from "./CategoriesIcons";

const WalletListTransactions = () => {
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
    <Box px={2}>
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
              my={2}
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
