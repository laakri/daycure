import { useEffect, useState } from "react";
import { useToast, Box, Flex } from "@chakra-ui/react";
import CalendarComponent from "./CalendarComponent";
import TasksComponent from "./TasksComponent";
import { fetchAllTasks, updateTaskIsCompleted } from "../../states/schedule";
import Task from "./taskModel";
import dayjs from "dayjs";
import AddTask from "./AddTask";

const Schedule = () => {
  const [selected, setSelected] = useState<Date | null>(dayjs().toDate());
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({});

  const toast = useToast();

  // to fetch the data when the page loaded
  useEffect(() => {
    fetchData();
  }, [toast]);

  // function that fetch the data
  const fetchData = async () => {
    try {
      const allTasks = await fetchAllTasks();

      const tasksByDate: { [key: string]: Task[] } = {};

      allTasks.forEach((task: Task, index: number) => {
        const date = dayjs(task.date).format("YYYY-MM-DD");

        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }

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

  const handleSelect = (date: Date) => {
    setSelected(date);
  };

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
    <Box m={"10px auto"} minH={"calc( 100vh - 160px )"}>
      <Flex
        gap={{ base: "10px", xl: "none" }}
        p={"10px"}
        justifyContent={"space-between"}
        alignItems={{ base: "center", xl: "start" }}
        direction={{ base: "column", xl: "row" }}
      >
        <AddTask selected={selected} updateTasks={setTasks} />
        <TasksComponent
          selected={selected}
          tasks={tasks}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
        />
        <CalendarComponent
          selected={selected}
          handleSelect={handleSelect}
          tasks={tasks}
        />
      </Flex>
    </Box>
  );
};
export default Schedule;
