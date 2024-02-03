import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import WalletCategory from "./WalletCategory";
import WalletStats from "./WalletStats";

const Wallet = () => {
  return (
    <Box maxW={"1400px"} m={"40px auto"}>
      <Flex
        mt={50}
        justifyContent={"space-between"}
        alignItems={"start"}
        display={"flex"}
      >
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
            p={5}
            borderRadius={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            minH={"300px"}
            border={"1px solid var(--bordercolor)"}
          >
            <Text fontSize={"xl"} color={"#6b82a0"}>
              No Stats
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} px={10}>
            <Text>Transactions</Text>
            <Flex
              gap={4}
              p={"5px 10px"}
              bg={"var(--lvl1-darkcolor)"}
              rounded={4}
            >
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
          <HStack>
            <Text>faz</Text>
          </HStack>
        </Flex>

        <Box
          w={520}
          border={"solid 1px "}
          borderColor={"#3b3a3a44"}
          p={"20px 10px"}
          rounded={10}
          bg={"var(--lvl3-darkcolor)"}
        >
          <HStack>
            <Text fontWeight={"700"}> Expenses</Text>
            <Text color={"gray.400"}>Income</Text>
          </HStack>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            bg={"var(--lvl1-darkcolor)"}
            mt={5}
            rounded={15}
            h={150}
          >
            <Input
              placeholder=".. $"
              textAlign={"center"}
              fontSize={"50px"}
              h={"100%"}
              border={"1px solid transparent"}
            />
          </Flex>
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
        </Box>
      </Flex>
    </Box>
  );
};

export default Wallet;
