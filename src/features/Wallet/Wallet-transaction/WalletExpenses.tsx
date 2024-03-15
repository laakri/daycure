import { Text, Flex, Input, Button, Select, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchAllCategories, addTransaction } from "../../../states/wallet";
import { useQueryClient } from "react-query";

const WalletExpense = () => {
  const [allCateg, setAllCateg] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const client = useQueryClient();

  useEffect(() => {
    const fetchAllCateg = async () => {
      try {
        const response = await fetchAllCategories();
        setAllCateg(response);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchAllCateg();
  }, []);
  const toast = useToast();

  const handleConfirmClick = async () => {
    try {
      await addTransaction({
        amount,
        date: new Date(),
        description,
        isExpense: true,
        userId: "65c62e1585bc357e64c9f354",
        category,
      });
      setAmount(0);
      setDescription("");
      setCategory("");
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
        Add Expense Transaction
      </Text>
      <Input
        placeholder="Enter amount"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
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

      <Input
        placeholder="Description"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Select
        placeholder="Select category"
        bg={"var(--lvl1-darkcolor)"}
        mt={3}
        borderColor={"transparent"}
        color={"gray.400"}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {allCateg.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </Select>
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

export default WalletExpense;
