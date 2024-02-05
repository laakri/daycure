import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Wrap,
  Divider,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import WalletIncome from "./WalletIncome";
import WalletExpense from "./WalletExpenses";
import { useState } from "react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
import { FaWallet } from "react-icons/fa6";

const WalletTransaction = () => {
  const [activeComponent, setActiveComponent] = useState("expenses");
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const wallets = [
    "Car",
    "Family",
    "Education",
    "Car",
    "Family",
    "Education",
    "Car",
    "Family",
  ];

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    console.log("fazjopfj");
  };

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleTabClick = (tab: string) => {
    setActiveComponent(tab);
  };
  return (
    <Box>
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
            onClick={openModal}
          >
            Add Category
          </Button>
        </HStack>

        {activeComponent === "expenses" && <WalletExpense />}
        {activeComponent === "income" && <WalletIncome />}
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg={"var(--lvl2-darkcolor)"}>
          <ModalHeader fontSize={"sm"}>Category List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.700" />
              </InputLeftElement>
              <Input borderColor="gray.700" placeholder="Search .." />
            </InputGroup>
          </ModalBody>
          <Wrap spacing={2} m={"10px 20px"}>
            {wallets.map((wallet, index) => (
              <Flex
                key={index}
                alignItems={"center"}
                gap={2}
                border={"1px solid var(--bordercolor) "}
                p={"3px 8px"}
                rounded={10}
                mb={2}
              >
                <FaWallet color="var(--secend-maincolor)" />
                {wallet}
              </Flex>
            ))}
          </Wrap>
          <Divider w={"90%"} m={"auto"} borderColor={"var(--bordercolor)"} />
          <Flex flexDirection={"column"} gap={1} m={"10px 20px"}>
            {wallets.map((wallet, index) => (
              <Flex
                key={index}
                justifyContent={"space-between"}
                alignItems={"center"}
                border={"1px solid var(--bordercolor) "}
                p={"7px 8px"}
                rounded={7}
                mb={2}
              >
                <Flex alignItems={"center"} gap={2}>
                  <Box
                    display={"flex"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    p={"7px"}
                    rounded={"50%"}
                    bg={"purple.900"}
                    color="purple.300"
                  >
                    <FaWallet />
                  </Box>
                  {wallet}
                </Flex>
                <AddIcon fontSize={"xs"} color={"gray.400"} />
              </Flex>
            ))}
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WalletTransaction;
