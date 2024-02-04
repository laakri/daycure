import { Box, HStack, Text, Button, Flex } from "@chakra-ui/react";
import WalletIncome from "./WalletIncome";
import WalletExpense from "./WalletExpenses";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

const WalletTransaction = () => {
  const [activeComponent, setActiveComponent] = useState("expenses");

  const handleTabClick = (tab: string) => {
    setActiveComponent(tab);
  };
  return (
    <Box
      w={520}
      border={"solid 1px "}
      borderColor={"#3b3a3a44"}
      p={"20px 10px"}
      rounded={10}
      bg={"var(--lvl3-darkcolor)"}
    >
      <HStack mb={5} justifyContent={"space-between"}>
        <Flex>
          <Text
            w={"max-content"}
            p={"5px 7px"}
            rounded={10}
            bg={activeComponent === "expenses" ? "var(--lvl1-darkcolor)" : ""}
            color={activeComponent === "expenses" ? "" : "gray.400"}
            fontWeight={activeComponent === "expenses" ? "700" : "normal"}
            cursor="pointer"
            onClick={() => handleTabClick("expenses")}
          >
            Expenses
          </Text>
          <Text
            w={"max-content"}
            p={"5px 7px"}
            rounded={10}
            bg={activeComponent === "income" ? "var(--lvl1-darkcolor)" : ""}
            color={activeComponent === "income" ? "" : "gray.400"}
            fontWeight={activeComponent === "income" ? "700" : "normal"}
            cursor="pointer"
            onClick={() => handleTabClick("income")}
          >
            Income
          </Text>
        </Flex>
        <Button
          size={"sm"}
          leftIcon={<AddIcon fontSize={"xs"} />}
          border={"dashed 1px"}
          borderColor={"gray.500"}
          color={"white"}
          variant="outline"
        >
          Add Category
        </Button>
      </HStack>

      {activeComponent === "expenses" && <WalletExpense />}
      {activeComponent === "income" && <WalletIncome />}
    </Box>
  );
};

export default WalletTransaction;
