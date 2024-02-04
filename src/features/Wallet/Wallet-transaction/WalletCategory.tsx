import {
  AddIcon,
  CalendarIcon,
  CheckIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import {
  addCategory,
  addTransaction,
  fetchAllCategories,
} from "../../../states/wallet";

import { useEffect, useState } from "react";
import Category from "./categoryModel";
import {
  Box,
  Flex,
  useColorModeValue,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Popover,
  Portal,
  InputLeftElement,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  SlideFade,
  Stat,
  StatNumber,
  Checkbox,
  Circle,
  Button,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

const WalletCategory = () => {
  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    date: "",
    description: "",
    isExpense: false,
    walletId: "",
    categoryId: "",
  });
  //Add a new category
  const handleaddTransaction = async () => {
    if (newTransaction.description.trim() !== "") {
      const transactionDetails = {
        amount: newTransaction.amount || 0,
        date: new Date(newTransaction.date), // Convert string to Date
        description: newTransaction.description,
        isExpense: newTransaction.isExpense || true,
        walletId: "ddd",
        categoryId: "ddd",
      };

      try {
        // Assuming addTransaction is an asynchronous function
        await addTransaction(transactionDetails);

        // Assuming setNewTransaction is a state-setting function
        setNewTransaction({
          amount: 0,
          date: "", // You may need to set a default date or leave it as an empty string
          description: "",
          walletId: "",
          categoryId: "",
          isExpense: true,
        });

        console.log("Transaction added successfully:");
      } catch (error) {
        console.error("Error adding transaction:", error);
        throw error; // Rethrow the error for the caller to handle
      }
    }
  };
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    maxBudget: 0,
  });

  const [allCateg, setAllCateg] = useState<Category[]>([]);

  // Fetch All Categories
  useEffect(() => {
    const fetchAllCateg = async () => {
      try {
        const response = await fetchAllCategories();
        setAllCateg(response);
      } catch (err) {
        console.error("Error fetching categories ddd", err);
      }
    };
    fetchAllCateg();
  }, []);

  //Add a new category
  const handleAddCateg = async () => {
    if (newCategory.categoryName.trim() !== "") {
      const categoryDetails = {
        categoryName: newCategory.categoryName,
        maxBudget: newCategory.maxBudget || 0,
      };

      try {
        await addCategory(categoryDetails);
        setNewCategory({ categoryName: "", maxBudget: 0 });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const borderColor = useColorModeValue("gray.700", "gray.300");
  const circleRadius = 160; // Adjust the radius as needed
  const center = { x: circleRadius, y: circleRadius };
  const calculatePosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / allCateg.length;
    const x = center.x + circleRadius * Math.cos(angle);
    const y = center.y + circleRadius * Math.sin(angle);
    return { x, y };
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleOpenModal = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box mt={10} w={"500px"} rounded={10} py={10}>
      <Flex align="center" justify="center">
        <SlideFade in>
          <Box position="relative">
            <Circle
              size="320px"
              border="solid 2px"
              borderColor="purple.700"
              shadow="lg"
              position="relative"
            >
              {allCateg.map((category, index) => {
                const { x, y } = calculatePosition(index);
                return (
                  <Button
                    key={index}
                    aria-label={category.categoryName}
                    size="md"
                    fontSize="md"
                    color="white"
                    bg={"purple.800"}
                    position="absolute"
                    left={x}
                    _hover={{ bg: "purple.700", color: "white" }}
                    top={y}
                    transform="translate(-50%, -50%)"
                    onClick={() => handleOpenModal(category.categoryName)}
                  >
                    {category.categoryName}
                  </Button>
                );
              })}
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent
                  bg="var(--lvl1-darkcolor)"
                  border="solid 1px "
                  borderColor="gray.700"
                  marginTop={"250px"}
                >
                  <ModalHeader>
                    {selectedCategory} transaction
                    <Stat>
                      <StatNumber>0.00 Dt</StatNumber>
                    </Stat>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex justifyContent={"center"} gap={12} p={5}>
                      <Stack spacing={4}>
                        <InputGroup borderColor="gray.700">
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                          >
                            $
                          </InputLeftElement>
                          <Input placeholder="Enter amount" />
                          <InputRightElement>
                            <CheckIcon color="green.500" />
                          </InputRightElement>
                        </InputGroup>

                        <InputGroup borderColor="gray.700" color={"gray.500"}>
                          <InputLeftElement pointerEvents="none">
                            <CalendarIcon color="gray.300" />
                          </InputLeftElement>
                          <Input type="date" placeholder="Date" />
                        </InputGroup>

                        <Textarea
                          borderColor="gray.700"
                          placeholder="Description"
                          size="sm"
                        />
                        <Checkbox colorScheme="green" defaultChecked>
                          Is Expense
                        </Checkbox>
                      </Stack>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="--bordercolor"
                      bg={"gray.700"}
                      mr={3}
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Popover>
                <PopoverTrigger>
                  <Button
                    size="md"
                    fontSize="md"
                    rounded={10}
                    position="absolute"
                    borderColor={"gray.600"}
                    color={"gray.100"}
                    boxShadow="lg"
                    variant="outline"
                    _hover={{ bg: "gray.900", color: "white" }}
                    gap={3}
                    alignItems={"center"}
                  >
                    <AddIcon fontSize="xs" />
                    Category
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    bg="var(--lvl1-darkcolor)"
                    borderColor={"gray.700"}
                  >
                    <PopoverArrow />
                    <PopoverHeader borderColor={"gray.700"}>
                      Add Category
                    </PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Stack spacing={4}>
                        <InputGroup borderColor={"gray.700"}>
                          <InputLeftElement pointerEvents="none">
                            <PlusSquareIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="text"
                            placeholder="Name category"
                            value={newCategory.categoryName}
                            onChange={(e) =>
                              setNewCategory({
                                ...newCategory,
                                categoryName: e.target.value,
                              })
                            }
                          />
                        </InputGroup>

                        <InputGroup borderColor={"gray.700"}>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                          >
                            $
                          </InputLeftElement>
                          <Input
                            placeholder="Enter max amount"
                            value={newCategory.maxBudget}
                            onChange={(e) =>
                              setNewCategory({
                                ...newCategory,
                                maxBudget: parseFloat(e.target.value),
                              })
                            }
                          />
                          <InputRightElement>
                            <CheckIcon color="green.500" />
                          </InputRightElement>
                        </InputGroup>

                        <Button
                          colorScheme="--bordercolor"
                          onClick={handleAddCateg}
                        >
                          Add
                        </Button>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Circle>
          </Box>
        </SlideFade>
      </Flex>
    </Box>
  );
};

export default WalletCategory;
