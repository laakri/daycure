import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Input,
  Button,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const WalletExpense = () => {
  return (
    <Flex flexDirection={"column"} gap={2}>
      <Text fontSize={"xl"} color={"purple.100"}>
        Add Expense Transaction
      </Text>
      <Input
        placeholder="Amount DT"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
        mb={"10px"}
      />
      <Input
        placeholder="Description"
        bg={"var(--lvl1-darkcolor)"}
        h={"40px"}
        border={"1px solid transparent"}
      />
      <Menu>
        <MenuButton
          textAlign={"start"}
          rightIcon={<ChevronDownIcon />}
          as={Button}
          color={"var(--chakra-colors-chakra-body-text)"}
          bg={"var(--lvl1-darkcolor)"}
          _hover={{
            bg: "var(--lvl2-darkcolor)",
            color: "var(--chakra-colors-chakra-body-text)",
          }}
        >
          Categories
        </MenuButton>{" "}
        <Portal>
          <MenuList
            bg={"var(--lvl1-darkcolor)"}
            borderColor={"var(--bordercolor)"}
          >
            <MenuItem
              bg={"var(--lvl1-darkcolor)"}
              borderColor={"transparent"}
              _hover={{
                bg: "var(--lvl3-darkcolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Add Category
            </MenuItem>
            <MenuItem
              bg={"var(--lvl1-darkcolor)"}
              borderColor={"transparent"}
              _hover={{
                bg: "var(--lvl3-darkcolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Category 1
            </MenuItem>
            <MenuItem
              bg={"var(--lvl1-darkcolor)"}
              borderColor={"transparent"}
              _hover={{
                bg: "var(--lvl3-darkcolor)",
                color: "var(--chakra-colors-chakra-body-text)",
              }}
            >
              Category 2
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      {/* 
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>*/}
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

export default WalletExpense;
