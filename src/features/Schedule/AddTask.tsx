import { useEffect, useState } from "react";
import {
  Wrap,
  useToast,
  Box,
  Text,
  Checkbox,
  Button,
  Select,
  Input,
  Flex,
  Link,
} from "@chakra-ui/react";
import { fetchAllTasks, addTask } from "../../states/schedule";
import Task from "./taskModel";
import dayjs from "dayjs";
import { BiSend } from "react-icons/bi";
import { useUserData } from "./useUserData";

interface AddTaskProps {
  selected: Date | null;
  updateTasks: (updatedTasks: { [key: string]: Task[] }) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ selected, updateTasks }) => {
  const [newTask, setNewTask] = useState("");

  const [important, setImportant] = useState<boolean>(false);
  const [suggestedTasks] = useState<string[]>([
    "Complete a coding challenge",
    "Read a programming book",
    "Exercise for 30 minutes",
    "Learn a new technology",
  ]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const [taskType, setTaskType] = useState<string | null>(null);
  const [eventType, setEventType] = useState<string | null>(null);

  const [taskDuration, setTaskDuration] = useState<{
    hours: number;
    minutes: number;
  } | null>(null);
  const [selectedRoutineType, setSelectedRoutineType] = useState<string | null>(
    null
  );

  const toast = useToast();
  const user = useUserData();

  // to fetch the data when the page loaded
  useEffect(() => {
    fetchData();
  }, [toast]);

  // function that fetch the data
  const fetchData = async () => {
    try {
      const allTasks = await fetchAllTasks(user.userId);

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
      updateTasks(tasksByDate);
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

  // the add task function
  const handleAddTask = async () => {
    if (selected && newTask.trim() !== "") {
      const subTypeValue = taskType === "Social" ? eventType || "" : "";
      const routineTypeValue =
        taskType === "Routine" ? selectedRoutineType || "" : "";

      // Set isCompleted based on taskType
      const isCompleted = taskType === "Social" ? true : false;

      const taskDetails = {
        user: user.userId,
        date: dayjs(selected).format("YYYY-MM-DD"),
        description: newTask.trim(),
        isImportant: important,
        isCompleted: isCompleted,
        type: taskType || "Normal",
        ...(subTypeValue !== "" && { subType: subTypeValue }),
        ...(routineTypeValue !== "" && { routineType: routineTypeValue }),
        duration: taskDuration,
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
      setTaskType(null);
      setEventType(null);
      setSelectedRoutineType(null);
      setTaskDuration(null);
    }
  };

  // handle add suggestion to task
  const handleAddSuggestedTask = (suggestedTask: string) => {
    setNewTask(suggestedTask);
  };

  // render the suggestion list
  const renderSuggestions = () => {
    if (!showSuggestions || suggestedTasks.length === 0) return null;

    return (
      <Box mt={7}>
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
              bg="var(--lvl2-darkcolor)"
              _hover={{
                bg: "var(--lvl3-darkcolor)",
                cursor: "pointer",
              }}
              w={"calc(100% / 2.1 )"}
              border={"solid 1px  "}
              borderColor={"gray.600"}
              onClick={() => handleAddSuggestedTask(suggestedTask)}
            >
              <Text fontSize="sm">{suggestedTask}</Text>
            </Box>
          ))}
        </Wrap>
      </Box>
    );
  };

  return (
    <Flex
      bg={"var(--lvl3-darkcolor)"}
      rounded={10}
      border={"solid 1px "}
      borderColor={"#3b3a3a44"}
      p={"20px "}
      flexDirection={"column"}
      justifyContent={"space-between"}
      minW={440}
      minH={"calc( 100vh - 160px )"}
    >
      <Flex flexDirection={"column"}>
        <Text fontSize={"xl"}>Add Task</Text>
        {renderSuggestions()}
        <Box>
          <Select
            mt={3}
            value={taskType || ""}
            onChange={(e) => setTaskType(e.target.value || null)}
            borderColor={"gray.700"}
            colorScheme="white"
          >
            <option value="" color="black">
              Select Task Type
            </option>
            <option value="Goal">Goal</option>
            <option value="Social">Social</option>
            <option value="Routine">Routine</option>
            <option value="Timing">Timing</option>
          </Select>
          {taskType === "Social" && (
            <Flex direction="column" mt={2}>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Select event type
              </Text>
              <Flex>
                <Select
                  mt={2}
                  value={eventType || ""}
                  onChange={(e) => setEventType(e.target.value || null)}
                  borderColor={"gray.700"}
                  colorScheme="white"
                >
                  <option value="" color="black">
                    Select Type
                  </option>
                  <option value="birthday">birthday</option>
                  <option value="wedding">wedding</option>
                  <option value="party">party</option>
                  <option value="event">event</option>
                </Select>
              </Flex>
            </Flex>
          )}

          {taskType === "Timing" && (
            <Flex direction="column" mt={2}>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Select Task Duration
              </Text>
              <Flex>
                <Input
                  type="number"
                  min={0}
                  max={23}
                  placeholder="Hours"
                  value={taskDuration?.hours ?? ""}
                  onChange={(e) => {
                    const hoursValue =
                      e.target.value !== "" ? Number(e.target.value) : 0;
                    const clampedHours = Math.min(23, Math.max(0, hoursValue));

                    setTaskDuration((prevDuration) => ({
                      ...prevDuration,
                      hours: clampedHours,
                      minutes: prevDuration?.minutes ?? 0,
                    }));
                  }}
                  borderColor={"gray.700"}
                  colorScheme="purple"
                  mr={2}
                />

                <Input
                  type="number"
                  min={0}
                  max={59}
                  placeholder="Minutes"
                  value={taskDuration?.minutes ?? ""}
                  onChange={(e) => {
                    const minutesValue =
                      e.target.value !== "" ? Number(e.target.value) : 0;
                    const clampedMinutes = Math.min(
                      59,
                      Math.max(0, minutesValue)
                    );

                    setTaskDuration((prevDuration) => ({
                      ...prevDuration,
                      minutes: clampedMinutes,
                      hours: prevDuration?.hours ?? 0,
                    }));
                  }}
                  borderColor={"gray.700"}
                  colorScheme="purple"
                />
              </Flex>
            </Flex>
          )}
          {taskType === "Routine" && (
            <Flex direction="column" mt={2}>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Select Routine Type
              </Text>
              <Flex>
                <Select
                  mt={2}
                  value={selectedRoutineType || ""}
                  onChange={(e) =>
                    setSelectedRoutineType(e.target.value || null)
                  }
                  borderColor={"gray.700"}
                  colorScheme="white"
                >
                  <option value="" color="black">
                    Select Routine Type
                  </option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </Select>
              </Flex>
            </Flex>
          )}
        </Box>
      </Flex>

      <Flex flexDirection={"column"} gap={5}>
        <Flex flexDirection={"column"} gap={2}>
          <Link>
            <Text fontSize={"sm"} color={"gray.400"}>
              Can't find any tasks ?
            </Text>
          </Link>
          <Link>
            <Text fontSize={"sm"} color={"gray.400"}>
              Pro tips
            </Text>
          </Link>
        </Flex>
        <Checkbox
          mt={4}
          ml={2}
          colorScheme="purple"
          isChecked={important}
          onChange={toggleImportant}
        >
          Important Task
        </Checkbox>
        <Flex justifyContent={"end"} alignItems={"center"} gap={1}>
          <Input
            borderColor={"gray.700"}
            placeholder="Enter task description "
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            maxW={30}
            onClick={handleAddTask}
            bg="var(--lvl3-lightcolor)"
            color={"gray.50"}
            _hover={{
              color: "purple.400",
              border: "transparent  solid 1px",
            }}
          >
            <Box fontSize={"xl"}>
              <BiSend />
            </Box>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default AddTask;
