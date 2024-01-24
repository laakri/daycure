import dayjs from "dayjs";
import { useState } from "react";
import { Calendar } from "@mantine/dates";
import {
  Box,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  Flex,
  Wrap,
  Checkbox,
  useDisclosure,
  HStack,
  TagLabel,
  Tag,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
import { fetchAllTasks, addTask } from "../../states/schedule";

const Schedule = () => {
  const [selected, setSelected] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTask, setNewTask] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [important, setImportant] = useState<boolean>(false);
  const [suggestedTasks] = useState<string[]>([
    "Complete a coding challenge",
    "Read a programming book",
    "Exercise for 30 minutes",
    "Learn a new technology",
  ]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const toggleImportant = () => {
    setImportant((prevImportant) => !prevImportant);
  };

  const toast = useToast();

  // TASK FUNCTIONS
  const handleSelect = async (date: Date) => {
    setSelected(date);

    try {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      const allTasks = await fetchAllTasks("65b0320bb3870b156e159462");
      setTasks(allTasks);

      if (!allTasks[formattedDate] || allTasks[formattedDate].length === 0) {
        toast({
          title: "Info",
          description: "No tasks for the selected date",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Error fetching tasks:", error);

      // Display an error toast message
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAddTask = async () => {
    if (selected && newTask.trim() !== "") {
      const taskDetails = {
        userId: "65b0320bb3870b156e159462",
        date: selected,
        description: newTask.trim(),
        isImportant: important,
      };

      try {
        await addTask(taskDetails);
      } catch (error) {
        console.error("Error adding task:", error);
        const errorMessage = (error as Error).message || "An error occurred";

        // Call the toast function to display the error
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      setNewTask("");
      onClose();
    }
  };

  const handleEditTask = (index: number) => {
    // Implement edit task functionality if needed
  };

  const handleDeleteTask = (index: number) => {
    // Implement delete task functionality if needed
  };

  const handleDragStart = (index: number) => {
    setSelectedTaskIndex(index);
  };

  const handleDragOver = (index: number) => {
    // Implement drag over functionality if needed
  };

  const handleDragEnd = () => {
    setSelectedTaskIndex(null);
  };

  const handleOpenModal = () => {
    onOpen();
    setShowSuggestions(true);
  };

  const handleAddSuggestedTask = (suggestedTask: string) => {
    setNewTask(suggestedTask);
    setShowSuggestions(false);
  };

  const renderSuggestions = () => {
    if (!showSuggestions || suggestedTasks.length === 0) return null;

    return (
      <Box>
        <Text fontSize="md" fontWeight="bold" mb={2}>
          Suggested Tasks
        </Text>
        <Wrap mb={5}>
          {suggestedTasks.map((suggestedTask, index) => (
            <Box
              key={index}
              mt={2}
              p={2}
              justifyContent={"flex-start"}
              rounded={5}
              bg="var(--lvl1-darkcolor)"
              _hover={{
                bg: "var(--lvl2-darkcolor)",
                cursor: "pointer",
              }}
              w={"calc(100% / 2.1 )"}
              border={"solid 1px"}
              onClick={() => handleAddSuggestedTask(suggestedTask)}
            >
              <Text fontSize="sm">{suggestedTask}</Text>
            </Box>
          ))}
        </Wrap>
      </Box>
    );
  };

  const renderTasks = () => {
    if (!selected)
      return (
        <Box>
          <Text fontSize={"xl"} textAlign={"center"} mt={5}>
            You must select a day!
          </Text>
        </Box>
      );

    const formattedDate = dayjs(selected).format("YYYY-MM-DD");
    const dateTasks = tasks[formattedDate] || [];

    return (
      <Box mt={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={10}>
            Tasks
          </Text>
          {dateTasks.map((task, index) => (
            <HStack
              key={index}
              mt={3}
              p={2}
              justifyContent={"space-between"}
              rounded={5}
              bg="var(--lvl1-darkcolor)"
              _hover={{
                bg: "var(--lvl2-darkcolor)",
                cursor: "pointer",
              }}
              onDragOver={() => handleDragOver(index)}
            >
              <Checkbox display={"flex"} colorScheme="purple">
                {important && (
                  <Tag
                    size={"sm"}
                    variant="outline"
                    colorScheme="gray"
                    color={"white"}
                    mt={"2px"}
                    mr={"5px"}
                  >
                    <TagLabel> Important</TagLabel>
                  </Tag>
                )}
                {task}
              </Checkbox>
              <Flex>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => handleEditTask(index)}
                  size="xs"
                  color="gray.500"
                  variant="ghost"
                  _hover={{
                    bg: "var(--lvl3-darkcolor)",
                    cursor: "pointer",
                  }}
                  aria-label="Edit Task"
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteTask(index)}
                  size="xs"
                  color="red.500"
                  variant="ghost"
                  _hover={{
                    bg: "red.900",
                    color: "red.200",
                    cursor: "pointer",
                  }}
                  aria-label="Delete Task"
                />
                <IconButton
                  icon={<DragHandleIcon />}
                  size="xs"
                  cursor="grab"
                  colorScheme="black"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  _hover={{
                    bg: "gray.400",
                    color: "gray.900",
                    cursor: "grap",
                  }}
                  aria-label="Drag Task"
                />
              </Flex>
            </HStack>
          ))}
        </Box>
      </Box>
    );
  };

  const renderDay = (paramDate: Date) => {
    const formattedDate = dayjs(paramDate).format("YYYY-MM-DD");
    const hasTasks = tasks[formattedDate] && tasks[formattedDate].length > 0;

    return (
      <Box position="relative">
        {hasTasks && (
          <Box
            position="absolute"
            right="12px"
            top="-2px"
            w="6px"
            h="6px"
            rounded="50%"
            bg="red"
          ></Box>
        )}
        <Text color={"gray.200"}>{dayjs(paramDate).format("D")}</Text>
      </Box>
    );
  };

  return (
    <Wrap
      mt={50}
      spacing={4}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box rounded={10} p={10}>
        <Calendar
          getDayProps={(date) => ({
            onClick: () => handleSelect(date),
          })}
          size={"xl"}
          renderDay={renderDay}
        />
      </Box>
      <Box
        w={520}
        border={"solid 1px "}
        borderColor={"gray.800"}
        p={"10px 20px"}
        rounded={10}
      >
        {selected && (
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"xl"}>
              {dayjs(selected).format("MMMM D, YYYY")}
            </Text>
            <Button
              size={"sm"}
              bg={"transparent"}
              color={"gray.100"}
              _hover={{ background: "gray.100" }}
              onClick={handleOpenModal}
            >
              <AddIcon />
            </Button>
          </Flex>
        )}
        <Box>{renderTasks()}</Box>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setNewTask("");
          setSelectedTaskIndex(null);
          setImportant(false);
          setShowSuggestions(false);
        }}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent bg={"var(--lvl1-darkcolor)"}>
          <ModalHeader>
            {selectedTaskIndex !== null ? "Edit Task" : "Add Task"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderSuggestions()}

            <Input
              borderColor={"gray.700"}
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Checkbox
              mt={2}
              colorScheme="purple"
              isChecked={important}
              onChange={toggleImportant}
            >
              Important Task
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="black" mr={3} onClick={handleAddTask}>
              {selectedTaskIndex !== null ? "Save" : "Add"}
            </Button>
            <Button colorScheme="black" color={"red.500"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrap>
  );
};

export default Schedule;
