import React, { ReactElement, useState } from "react";
import {
  CiClock2,
  CiCalendarDate,
  CiStar,
  CiTrophy,
  CiGrid42,
} from "react-icons/ci";
import {
  Box,
  Text,
  Button,
  IconButton,
  Flex,
  HStack,
  Checkbox,
  Tag,
  TagLabel,
  InputGroup,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  DragHandleIcon,
} from "@chakra-ui/icons";
import dayjs from "dayjs";
import Task from "./taskModel";

interface TasksComponentProps {
  selected: Date | null;
  tasks: { [key: string]: Task[] };
  handleOpenModal: () => void;
  handleToggleTaskCompletion: (taskId: string, isCompleted: boolean) => void;
}

const TasksComponent: React.FC<TasksComponentProps> = ({
  selected,
  tasks,
  handleOpenModal,
  handleToggleTaskCompletion,
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    targetTaskId: string
  ) => {
    event.preventDefault();
    if (draggedTaskId !== null && draggedTaskId !== targetTaskId) {
      // Move the dragged task to the new position
      const updatedTasks = updateTaskPosition(
        tasks,
        draggedTaskId,
        targetTaskId
      );

      // You would need to implement the logic to update the order of tasks in your state
      console.log("Updated Tasks:", updatedTasks);
      setDraggedTaskId(null);
    }
  };

  const handleDrop = (targetTaskId: string) => {
    // Move the dragged task to the new position
    // You would need to implement the logic to update the order of tasks in your state
    console.log(`Move task ${draggedTaskId} to position ${targetTaskId}`);
    setDraggedTaskId(null);
  };

  const updateTaskPosition = (
    currentTasks: { [key: string]: Task[] },
    draggedTaskId: string,
    targetTaskId: string
  ): { [key: string]: Task[] } => {
    // Clone the current tasks to avoid modifying the original state directly
    const updatedTasks = { ...currentTasks };

    // Find the dragged task and target task
    let draggedTask;
    let targetTask;

    Object.keys(updatedTasks).forEach((date) => {
      updatedTasks[date].forEach((task) => {
        if (task._id === draggedTaskId) {
          draggedTask = task;
        }
        if (task._id === targetTaskId) {
          targetTask = task;
        }
      });
    });

    // Ensure both tasks are found
    if (!draggedTask || !targetTask) {
      console.error("Could not find dragged or target task");
      return currentTasks;
    }

    return updatedTasks;
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
    let istype: string = ""; // Déclarée en dehors de la boucle

    for (const task of dateTasks) {
      istype = task.type; // Mettez à jour la variable à chaque itération
    }

    return (
      <Box mt={4}
      >
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
                border={"solid 1px"}
                borderColor={getBackgroundColorByType(task.type)}
                _hover={{
                  bg: "var(--lvl2-darkcolor)",
                  cursor: "pointer",
                }}
                draggable
                onDragStart={() => handleDragStart(task._id)}
                onDragOver={(e) => handleDragOver(e, task._id)}
                onDrop={() => handleDrop(task._id)}
              >
                <InputGroup>
                  <Checkbox
                    display={"flex"}
                    flexDirection={"row"}
                    gap={2}
                    colorScheme="purple"
                    isChecked={task.isCompleted}
                    alignItems={"center"}
                    onChange={() =>
                      handleToggleTaskCompletion(task._id, !task.isCompleted)
                    }
                  >
                    <Flex
                      justifyContent={"center"}
                      alignContent={"center"}
                      gap={2}
                    >
                      {getIconByType(task.type)}
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
                    </Flex>
                  </Checkbox>
                </InputGroup>

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
                    color="gray.200"
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

  return (
    <Box
      w={520}
      border={"solid 1px "}
      borderColor={"#3b3a3a44"}
      p={"20px 20px"}
      rounded={10}
      style={{
        background: 'linear-gradient( black,#6e6d6d12 )'
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "50%",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.090), transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    borderRadius={'30px'}

    >
      {selected && (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"xl"}>{dayjs(selected).format("MMMM D, YYYY")}</Text>
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
  );
};
function getBackgroundColorByType(type: string): string {
  switch (type) {
    case "Social":
      return "#2aeada40";
    case "Goal":
      return "#eab72a40";
    case "Routine":
      return "#9400d859";
    case "Timing":
      return "#1dd80044";
    default:
      return "#ea2a9055";
  }
}

function getIconByType(type: string): ReactElement {
  switch (type) {
    case "Social":
      return <CiStar size={18} />;
    case "Goal":
      return <CiTrophy color={"gold"} size={19} />;
    case "Routine":
      return <CiGrid42 color={"white"} size={19} />;
    case "Timing":
      return <CiClock2 color={"white"} size={19} />;
    default:
      return <CiCalendarDate color="white" size={19} />;
  }
}
export default TasksComponent;
