import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import WalletCategory from "./WalletCategory";
import WalletStats from "./WalletStats";

const Wallet = () => {
  return (
    <Box maxW={"900px"} m={"40px auto"}>
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
      <WalletStats />

      <Flex justifyContent={"center"}>
        <WalletCategory />
      </Flex>
    </Box>
  );
};

export default Wallet;
