import { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import {
  fetchAllTasks,
  addTask,
  updateTaskIsCompleted,
} from "../../states/schedule";
import Task from "./taskModel";

const Schedule = () => {
  const [selected, setSelected] = useState<Date | null>(dayjs().toDate());
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});
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

  const toast = useToast();
  //to fetch the freacking data when the page loaded
  useEffect(() => {
    fetchData();
  }, [toast]);

  //function that fetch the data
  const fetchData = async () => {
    try {
      const allTasks = await fetchAllTasks("65b0320bb3870b156e159462");
      const tasksByDate: { [key: string]: Task[] } = {};

      allTasks.forEach((task: Task) => {
        const date = dayjs(task.date).format("YYYY-MM-DD");

        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }

        tasksByDate[date].push(task);
      });

      setTasks(tasksByDate);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  //taggle the important state of the task
  const toggleImportant = () => {
    setImportant((prevImportant) => !prevImportant);
  };

  //handle the selected date state
  const handleSelect = (date: Date) => {
    setSelected(date);
  };

  //the add task function
  const handleAddTask = async () => {
    if (selected && newTask.trim() !== "") {
      const taskDetails = {
        userId: "65b0320bb3870b156e159462",
        date: dayjs(selected).format("YYYY-MM-DD"),
        description: newTask.trim(),
        isImportant: important,
        isCompleted: false,
      };

      try {
        await addTask(taskDetails);
        await fetchData();
      } catch (error) {
        console.error("Error adding task:", error);
        const errorMessage = (error as Error).message || "An error occurred";

        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setImportant(false);
      setNewTask("");
      onClose();
    }
  };

  //handle the open add task popup
  const handleOpenModal = () => {
    onOpen();
    setShowSuggestions(true);
  };

  //handle add suggetion to task
  const handleAddSuggestedTask = (suggestedTask: string) => {
    setNewTask(suggestedTask);
    setShowSuggestions(false);
  };

  //render the suggetion list
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

  //handle the task completed checkbox
  const handleToggleTaskCompletion = async (
    taskId: string,
    isCompleted: boolean
  ) => {
    try {
      await updateTaskIsCompleted(taskId, isCompleted);
      await fetchData();
    } catch (error) {
      console.error("Error toggling task completion status:", error);
      const errorMessage = (error as Error).message || "An error occurred";

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  //render tasks list
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

          {dateTasks.length === 0 ? (
            <Box
              m={"40px auto"}
              maxW={"max-content"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={4}
            >
              <Text fontSize="md" color="gray.200">
                No tasks for this day.
              </Text>
              <Button
                size={"sm"}
                bg={"transparent"}
                color={"gray.100"}
                border={"dashed 1px"}
                borderColor={"gray.500"}
                _hover={{ background: "gray.100" }}
                leftIcon={<AddIcon fontSize={"xs"} />}
                maxW={"max-content"}
                onClick={handleOpenModal}
              >
                <Text fontSize={"sm"}>Add task</Text>
              </Button>
            </Box>
          ) : (
            dateTasks.map((task, index) => (
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
              >
                <Checkbox
                  display={"flex"}
                  colorScheme="purple"
                  isChecked={task.isCompleted}
                  onChange={() =>
                    handleToggleTaskCompletion(task._id, !task.isCompleted)
                  }
                >
                  {" "}
                  {task.isImportant && (
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
                  {task.description}
                </Checkbox>
                <Flex>
                  <IconButton
                    icon={<EditIcon />}
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
                    _hover={{
                      bg: "gray.400",
                      color: "gray.900",
                      cursor: "grap",
                    }}
                    aria-label="Drag Task"
                  />
                </Flex>
              </HStack>
            ))
          )}
        </Box>
      </Box>
    );
  };

  //render day function for the calender
  const renderDay = (paramDate: Date) => {
    const date = dayjs(paramDate).format("YYYY-MM-DD");
    const currentDay = dayjs().format("YYYY-MM-DD");

    const isCurrentDay = date === currentDay;
    const isSelectedDay =
      selected && date === dayjs(selected).format("YYYY-MM-DD");
    const hasTasks = tasks[date] && tasks[date].length > 0;

    return (
      <Box
        position="relative"
        border={"1px solid"}
        p={"4px 5px"}
        rounded={7}
        borderColor={isCurrentDay ? "purple.400" : "transparent"}
        bg={isSelectedDay ? "gray.800" : undefined}
      >
        <Text color={isCurrentDay ? "purple.400" : undefined}>
          {dayjs(paramDate).format("D")}
        </Text>
        {hasTasks && (
          <Box
            position="absolute"
            right="50%"
            left="50%"
            top="-4px"
            w="6px"
            h="6px"
            rounded="50%"
            bg="red"
            transform={"translate(-50%)"}
          ></Box>
        )}
      </Box>
    );
  };

  // rendering function for all schedule
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
              border={"dashed 1px"}
              borderColor={"gray.500"}
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
