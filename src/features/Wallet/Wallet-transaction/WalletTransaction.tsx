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
  ModalBody,
  ModalCloseButton,
  Input,
  Wrap,
  Divider,
  InputLeftElement,
  InputGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import WalletIncome from "./WalletIncome";
import WalletExpense from "./WalletExpenses";
import { useState } from "react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import React from "react";
import {
  fetchAllCategories,
  addCategory,
  deleteCategory,
} from "../../../states/wallet";
import { initialCategoryIcons, listcategories } from "../CategoriesIcons";
import { IoClose } from "react-icons/io5";

const WalletTransaction = () => {
  const [activeComponent, setActiveComponent] = useState("expenses");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [catebogies, setCatebogies] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCategoryName, setDeleteCategoryName] = useState("");

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = listcategories.filter(
    (category) => !catebogies.includes(category)
  );

  const fetchData = async () => {
    try {
      const data = await fetchAllCategories();
      setCatebogies(data);
    } catch (error) {
      console.error("Error fetching catebogies", error);
    }
  };

  // Function to open the modal
  const openModal = () => {
    fetchData();
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleTabClick = (tab: string) => {
    setActiveComponent(tab);
  };

  // Function to add a category to the user
  const handleCategoryClick = async (category: string) => {
    try {
      await addCategory(category);
      fetchData();
    } catch (error) {
      console.error("Error adding category to user:", error);
    }
  };

  // Function to delete a category from the user
  const handleCategoryDelete = async (category: string) => {
    try {
      setDeleteCategoryName(category);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Function to confirm deletion and delete the category
  const confirmDeleteCategory = async () => {
    try {
      await deleteCategory(deleteCategoryName);
      fetchData();
      setDeleteCategoryName("");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Box position="sticky" top="30px" zIndex="sticky">
      <Box
        w={{ base: "420px", md: "720px", xl: "520px" }}
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
            _hover={{
              bg: "var(--lvl2-darkcolor)",
              color: "white",
              borderColor: "var(--lvl2-darkcolor)",
            }}
          >
            Add Category
          </Button>
        </HStack>

        {activeComponent === "expenses" && <WalletExpense />}
        {activeComponent === "income" && <WalletIncome />}
      </Box>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
        <ModalContent bg={"var(--lvl3-darkcolor)"}>
          <ModalHeader fontSize={"sm"}>Category List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                borderColor="gray.700"
                placeholder="Search .."
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </InputGroup>
          </ModalBody>

          <Wrap spacing={2} m={"10px 20px"}>
            {catebogies.map((category, index) => (
              <Flex
                key={index}
                alignItems={"center"}
                gap={2}
                border={"1px solid var(--bordercolor) "}
                p={"3px 8px"}
                rounded={10}
                mb={2}
              >
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  bg={"gray.700"}
                  rounded={"50%"}
                  p={1}
                >
                  {initialCategoryIcons[category]()}
                </Flex>
                {category}
                <Popover
                  isOpen={deleteCategoryName === category}
                  onClose={() => setDeleteCategoryName("")}
                  placement="bottom-start"
                >
                  <PopoverTrigger>
                    <Flex
                      alignItems={"center"}
                      justifyContent={"center"}
                      rounded={2}
                      fontSize={"xl"}
                      _hover={{
                        color: "red.500",
                        cursor: "pointer",
                      }}
                      onClick={() => setDeleteCategoryName(category)}
                    >
                      <IoClose />
                    </Flex>
                  </PopoverTrigger>

                  <PopoverContent
                    w={200}
                    bg={"var(--lvl1-darkcolor)"}
                    borderColor={"var(--bordercolor)"}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text>Confirm Delete </Text>
                      <Flex justifyContent="flex-end" mt={3}>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={confirmDeleteCategory}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            ))}
          </Wrap>
          <Divider w={"90%"} m={"auto"} borderColor={"var(--bordercolor)"} />
          <Flex
            flexDirection={"column"}
            gap={1}
            m={"10px 20px"}
            maxH={400}
            overflow={"auto"}
            __css={{
              "&::-webkit-scrollbar": {
                w: "2",
              },
              "&::-webkit-scrollbar-track": {
                w: "6",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `gray.100`,
              },
            }}
            pr={3}
          >
            {filteredCategories
              .filter((category) =>
                category.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((category, index) => (
                <Flex
                  key={index}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  border={"1px solid var(--bordercolor) "}
                  p={"7px 8px"}
                  _hover={{
                    bg: "var(--lvl1-darkcolor)",
                    cursor: "pointer",
                  }}
                  rounded={7}
                  mb={2}
                  onClick={() => handleCategoryClick(category)}
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
                      {initialCategoryIcons[category]()}
                    </Box>
                    {category}
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
