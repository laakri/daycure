import { Text, Flex, Input, Button } from "@chakra-ui/react";

const WalletIncome = () => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Text fontSize={"xl"} color={"purple.100"}>
        Add Income Transaction
      </Text>
      <Input
        placeholder="... DT"
        textAlign={"center"}
        bg={"var(--lvl1-darkcolor)"}
        fontSize={"50px"}
        rounded={15}
        h={150}
        border={"1px solid transparent"}
        mb={"10px"}
      />
      <Input
        placeholder="Description"
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
        Confirm
      </Button>
    </Flex>
  );
};
export default WalletIncome;
