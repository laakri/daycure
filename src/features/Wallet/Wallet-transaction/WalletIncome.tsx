import {
  Text,
  Flex,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { addTransaction } from "../../../states/wallet";
import { useState } from "react";
import { useQueryClient } from "react-query";

const WalletIncome = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const client = useQueryClient();
  const toast = useToast();

  const handleConfirmClick = async () => {
    try {
      await addTransaction({
        amount,
        date: new Date(),
        description,
        isExpense: false,
        userId: "65c62e1585bc357e64c9f354",
        category: "",
      });
      setAmount(0);
      setDescription("");
      toast({
        title: "Transaction added successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      client.invalidateQueries("transactions");
      client.invalidateQueries("walletNumberStats");
      client.invalidateQueries("walletStatsData");
    } catch (error) {
      toast({
        title: "Error adding transaction",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error adding transaction", error);
    }
  };

  return (
    <Flex flexDirection={"column"} gap={2}>
      <Text fontSize={"xl"} color={"purple.100"}>
        Add Income Transaction
      </Text>

      <InputGroup>
        <Input
          placeholder="Enter amount"
          bg={"var(--lvl1-darkcolor)"}
          textAlign={"center"}
          h={"100px"}
          fontSize={"50px"}
          border={"1px solid transparent"}
          mb={"10px"}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          onKeyPress={(e) => {
            const charCode = e.which ? e.which : e.keyCode;
            if (
              charCode !== 46 &&
              charCode > 31 &&
              (charCode < 48 || charCode > 57)
            ) {
              e.preventDefault();
            }
          }}
        />
        <InputRightElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          DT
        </InputRightElement>
      </InputGroup>

      <Input
        placeholder="Description"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
        onClick={handleConfirmClick}
      >
        Confirm
      </Button>
    </Flex>
  );
};
export default WalletIncome;
