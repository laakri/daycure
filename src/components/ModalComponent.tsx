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
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { addTask } from "../states/schedule";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        setSearchText("Task :");
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
    // If no matching expression is found, return the current date
    return now;
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
      } else {
        // Optionally, provide feedback to the user about empty task description
        console.log("Task description cannot be empty");
      }
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
    } else {
      // Handle other types of quick entries here
      console.log("Quick entry of different type");
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
                onClick={sendQuickEntry}
                bg={"transparent"}
                color={"white"}
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
            </Flex>{" "}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
