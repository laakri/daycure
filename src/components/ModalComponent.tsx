import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  InputGroup,
  Input,
  Text,
  InputRightElement,
  Flex,
  Kbd,
  useToast,
  Button,
  Wrap,
} from "@chakra-ui/react";
import { BiGame, BiSend } from "react-icons/bi";
import { addTask } from "../states/schedule";
import { addTransaction } from "../states/wallet";
import { listcategories } from "../features/Wallet/CategoriesIcons";
import { JSX } from "react/jsx-runtime";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}
const commands: any = {
  NavigateTask: {
    type: "navigate",
    text: "Navigate to Tasks page",
    pageUrl: "http://localhost:5173/schedule",
    buttonDiscription: "Navigate",
  },
  NavigateWallet: {
    type: "navigate",
    text: "Navigate to Wallet page",

    pageUrl: "http://localhost:5173/wallet",
    buttonDiscription: "Navigate",
  },
  NavigateFitness: {
    type: "navigate",
    text: "Navigate to Fitness page",
    pageUrl: "http://localhost:5173/fitness",
    buttonDiscription: "Navigate",
  },
  CreateTask: {
    type: "create",
    text: "Create quick Task ",
    InputText: "Task :",

    buttonDiscription: "Create",
  },
  CreateWallet: {
    type: "create",
    text: "Create quick wallet Transaction ",
    InputText: "Wallet :",

    buttonDiscription: "Create",
  },
};

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [amount, setAmount] = useState(0);
  const [isExpense, setIsExpense] = useState(false);
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        setSearchText("Task :");
      } else if (event.ctrlKey && event.key === "q") {
        event.preventDefault();
        setSearchText("Wallet :");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const parseDateExpression = (expression: string): Date => {
    // Function to parse date expressions like "tomorrow," "today," "next Monday," etc.
    const expressionLower = expression.toLowerCase();
    const now = new Date();
    if (expressionLower === "tomorrow") {
      return new Date(now.setDate(now.getDate() + 1));
    } else if (expressionLower === "today") {
      return now;
    } else {
      // Handle other expressions like "next Monday," "Friday," etc.
      const weekdays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const dayIndex = weekdays.findIndex((day) =>
        expressionLower.includes(day)
      );
      if (dayIndex !== -1) {
        const currentDay = now.getDay();
        const diff = dayIndex - currentDay;
        let nextDay = now;
        nextDay.setDate(now.getDate() + diff + (diff <= 0 ? 7 : 0));
        return nextDay;
      }
    }
    return now;
  };
  const isTransactionExpense = (description: string): boolean => {
    const expenseKeywords = ["expense", "spent", "bought", "cost", "purchase"];

    const incomeKeywords = [
      "income",
      "earned",
      "received",
      "salary",
      "payment",
    ];

    const hasExpenseKeyword = expenseKeywords.some((keyword) =>
      description.toLowerCase().includes(keyword)
    );

    const hasIncomeKeyword = incomeKeywords.some((keyword) =>
      description.toLowerCase().includes(keyword)
    );

    if (hasExpenseKeyword && !hasIncomeKeyword) {
      return true;
    }

    if (hasIncomeKeyword && !hasExpenseKeyword) {
      return false;
    }

    return true;
  };
  const handleCommand = (command: string) => {
    const selectedCommand = commands[command];
    if (selectedCommand.type === "create") {
      setSearchText(selectedCommand.InputText);
    } else if (selectedCommand.type === "navigate") {
      window.location.href = selectedCommand.pageUrl;
    }
  };

  const handleInputChange = (value: string) => {
    setSearchText(value);
    if (value.startsWith("Task :")) {
      const taskInput = value.slice("Task :".length).trim();
      if (taskInput) {
        // Split the input into different parts based on keywords or patterns
        const parts = taskInput.split(/\b(?:about to|so|and)\b/);
        setDescription(parts[0].trim());

        // Find the part that contains the date information
        const datePart = parts.find((part) =>
          /\b(?:by|on|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(
            part
          )
        );

        // If a date part is found, parse it
        if (datePart) {
          const dateValue = datePart.replace(/\b(?:by|on)\b/, "").trim();
          const parsedDate = parseDateExpression(dateValue);
          setDate(parsedDate);
        } else {
          setDate(new Date());
        }

        setIsImportant(
          parts.some((part) =>
            /\b(important|urgent|critical|priority)\b/i.test(part)
          )
        );
      }
    } else if (value.startsWith("Wallet :")) {
      const transactionInput = value.slice("Wallet :".length).trim();

      // Regular expression to match currency (with optional symbol)
      const amountRegex = /(\d+(\.\d+)?)\s*([a-zA-Z]+|\$)?/;
      const amountMatch = transactionInput.match(amountRegex);

      if (amountMatch) {
        const amount = parseFloat(amountMatch[1]);
        const description = transactionInput.replace(amountRegex, "").trim();
        const isExpense = isTransactionExpense(description);
        const categorys =
          listcategories.find((cat) =>
            description.toLowerCase().includes(cat.toLowerCase())
          ) || "Other";

        // Update state variables
        setAmount(amount);
        setDescription(description);
        setIsExpense(isExpense);
        setCategory(categorys);
      }
    } else {
      setContent(
        <Flex flexDirection={"column"} gap={2} mt={2}>
          {Object.keys(commands)
            .filter((key) =>
              commands[key].text.toLowerCase().includes(value.toLowerCase())
            )
            .map((key) => (
              <Flex
                key={key}
                justifyContent={"space-between"}
                bg={"gray.800"}
                p={"10px 15px"}
                rounded={5}
              >
                <Text color={"gray.300"}>{commands[key].text}</Text>

                <Button
                  size="sm"
                  colorScheme="white"
                  border={"solid 1px var(--bordercolor)"}
                >
                  {commands[key].buttonDiscription}
                </Button>
              </Flex>
            ))}
        </Flex>
      );
    }
  };

  const toast = useToast();

  const sendQuickEntry = async () => {
    if (searchText.startsWith("Task :")) {
      const task = {
        userId: "65b0320bb3870b156e159462",
        description: description,
        isImportant: isImportant,
        date: date,
      };

      try {
        await addTask(task);
        toast({
          title: "Task added",
          description: "The task has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setSearchText("");
      } catch (error) {
        // Error adding task
        toast({
          title: "Error",
          description:
            "An error occurred while adding the task. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else if (searchText.startsWith("Wallet :")) {
      try {
        console.log("amount", amount, "description", description);
        if (!isNaN(amount)) {
          if (isExpense) {
            await addTransaction({
              amount,
              date: new Date(),
              description,
              isExpense: true,
              userId: "65b0320bb3870b156e159462",
              category: "",
            });
            setSearchText("");
            toast({
              title: "Expense transaction added successfully!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          } else {
            await addTransaction({
              amount,
              date: new Date(),
              description,
              isExpense: false,
              userId: "65b0320bb3870b156e159462",
              category: "",
            });
            setSearchText("");
            toast({
              title: "Income transaction added successfully!",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }
        } else {
          console.log("Invalid wallet transaction input");
        }
      } catch (error) {
        toast({
          title: "Error adding income transaction",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.error("Error adding income transaction", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
      <ModalContent
        bg={"var(--lvl3-darkcolor)"}
        border="var(--bordercolor) solid 1px"
      >
        <ModalBody my={3}>
          <InputGroup size="lg">
            <Input
              borderColor={"gray.700"}
              placeholder="Quick Entry"
              value={searchText}
              onChange={(e) => handleInputChange(e.target.value)}
              _focus={{
                boxShadow: "none",
                borderColor: "gray.700",
              }}
              _placeholder={{
                color: "gray.400",
              }}
              _placeholder-shown={{
                color: "gray.400",
              }}
              {...(searchText.includes("Task :") && {
                bg: "gray.800",
              })}
            />
            <InputRightElement>
              <Button
                size="sm"
                bg={"gray.700"}
                mr={1}
                color={"white"}
                px={2}
                _hover={{ bg: "gray.600", color: "purple.100" }}
              >
                <BiSend color={"gray.400"} />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Flex justifyContent="space-between" alignItems="center" m={2}>
            <Text fontSize="sm" color="gray.500">
              {searchText.includes("Task :") && date && (
                <>
                  Date: {date.toLocaleDateString()}{" "}
                  {isImportant ? "(Important)" : "(Not Important)"}
                </>
              )}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" m={2}>
            <Text fontSize="sm" color="gray.500">
              {searchText.includes("Wallet :") && (
                <>
                  Amount: {amount} {isExpense ? "Expense" : "Income"}
                </>
              )}
            </Text>
          </Flex>

          <Flex flexDirection={"column"} gap={2} mt={2}>
            {!searchText ? (
              <>
                <Flex flexDirection={"column"} gap={2} mt={2}>
                  <Flex
                    justifyContent={"space-between"}
                    bg={"gray.800"}
                    p={" 10px 15px"}
                    rounded={5}
                  >
                    <Text color={"gray.300"}>
                      You can add a task by typing "Task :"
                    </Text>

                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"xs"} color={"purple.300"}>
                        or
                      </Text>
                      <Text>
                        <Kbd
                          bg={"var(--lvl3-darkcolor)"}
                          border="var(--bordercolor) solid 1px"
                          mr={1}
                        >
                          Ctrl
                        </Kbd>
                        +
                        <Kbd
                          bg={"var(--lvl3-darkcolor)"}
                          border="var(--bordercolor) solid 1px"
                        >
                          E
                        </Kbd>
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    justifyContent={"space-between"}
                    bg={"gray.800"}
                    p={" 10px 15px"}
                    rounded={5}
                  >
                    <Text color={"gray.300"}>
                      You can add a Transaction by typing "Wallet :"
                    </Text>

                    <Flex alignItems={"center"} gap={2}>
                      <Text fontSize={"xs"} color={"purple.300"}>
                        or
                      </Text>
                      <Text>
                        <Kbd
                          bg={"var(--lvl3-darkcolor)"}
                          border="var(--bordercolor) solid 1px"
                          mr={1}
                        >
                          Ctrl
                        </Kbd>
                        +
                        <Kbd
                          bg={"var(--lvl3-darkcolor)"}
                          border="var(--bordercolor) solid 1px"
                        >
                          Q
                        </Kbd>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            ) : (
              content
            )}
            <Flex
              flexDirection={"column"}
              bg={"gray.800"}
              p={"10px 15px"}
              rounded={5}
            >
              <Text color={"gray.300"}>Recent History:</Text>
              <Wrap mt={2} spacing={"3px"}>
                <Text
                  fontSize={"sm"}
                  color={"gray.300"}
                  bg={"var(--lvl3-darkcolor)"}
                  px={2}
                  pb={1}
                  rounded={5}
                >
                  Task Page
                </Text>
                <Text
                  fontSize={"sm"}
                  color={"gray.300"}
                  bg={"var(--lvl3-darkcolor)"}
                  px={2}
                  pb={1}
                  rounded={5}
                >
                  Fitness
                </Text>
                <Text
                  fontSize={"sm"}
                  color={"gray.300"}
                  bg={"var(--lvl3-darkcolor)"}
                  px={2}
                  pb={1}
                  rounded={5}
                >
                  Wallet
                </Text>
              </Wrap>
            </Flex>

            {/* Contextual Suggestions */}
            <Flex
              justifyContent={"space-between"}
              bg={"gray.800"}
              p={"10px 15px"}
              rounded={5}
            >
              <Text color={"gray.300"}>Contextual Suggestions:</Text>
              <Button
                size="sm"
                colorScheme="white"
                border={"solid 1px var(--bordercolor)"}
              >
                Show Suggestions
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
