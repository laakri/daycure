import { useEffect, useState } from "react";
import {
  Wrap,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Checkbox,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import CalendarComponent from "./CalendarComponent";
import TasksComponent from "./TasksComponent";
import {
  fetchAllTasks,
  addTask,
  updateTaskIsCompleted,
} from "../../states/schedule";
import Task from "./taskModel";
import dayjs from "dayjs";

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

  // to fetch the data when the page loaded
  useEffect(() => {
    fetchData();
    console.log(tasks);
  }, [toast]);

  // function that fetch the data
  const fetchData = async () => {
    try {
      const allTasks = await fetchAllTasks("65b0320bb3870b156e159462");

      const tasksByDate: { [key: string]: Task[] } = {};

      allTasks.forEach((task: Task, index: number) => {
        const date = dayjs(task.date).format("YYYY-MM-DD");

        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }

        // Assign position to the task based on its order in the array
        task.position = index + 1;

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

  // toggle the important state of the task
  const toggleImportant = () => {
    setImportant((prevImportant) => !prevImportant);
  };

  // handle the selected date state
  const handleSelect = (date: Date) => {
    setSelected(date);
  };

  // the add task function
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

  // handle the open add task popup
  const handleOpenModal = () => {
    onOpen();
    setShowSuggestions(true);
  };

  // handle add suggestion to task
  const handleAddSuggestedTask = (suggestedTask: string) => {
    setNewTask(suggestedTask);
    setShowSuggestions(false);
  };

  // render the suggestion list
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

  // handle the task completed checkbox
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

  return (
    <Wrap
      mt={50}
      spacing={4}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CalendarComponent
        selected={selected}
        handleSelect={handleSelect}
        tasks={tasks}
      />

      <TasksComponent
        selected={selected}
        tasks={tasks}
        handleOpenModal={handleOpenModal}
        handleToggleTaskCompletion={handleToggleTaskCompletion}
      />

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
            <Button
              color={"red.400"}
              onClick={() => {
                onClose();
                setNewTask("");
                setSelectedTaskIndex(null);
                setImportant(false);
                setShowSuggestions(false);
              }}
              bg="var(--lvl3-lightcolor)"
              _hover={{
                bg: "var(--lvl3-darkcolor)",
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="gray"
              border={"solid 1px"}
              borderColor={"gray.700"}
              onClick={handleAddTask}
              mr={3}
              bg="var(--lvl3-lightcolor)"
              _hover={{
                bg: "var(--lvl3-darkcolor)",
                color: "gray.300",
                border: "transparent  solid 1px",
              }}
            >
              {selectedTaskIndex !== null ? "Save Changes" : "Add Task"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Wrap>
  );
};

export default Schedule;
