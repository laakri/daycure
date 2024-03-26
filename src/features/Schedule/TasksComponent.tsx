import React, { ReactElement, useEffect, useState } from "react";
import { GiPartyPopper } from "react-icons/gi";
import { PiCakeThin } from "react-icons/pi";
import { CiClock2, CiStar, CiTrophy, CiGrid42 } from "react-icons/ci";
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
  SliderThumb,
  SliderTrack,
  Slider,
  SliderFilledTrack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  useToast,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import Task from "./taskModel";
import {
  MdModeEdit,
  MdNotStarted,
  MdPauseCircleFilled,
  MdQuestionMark,
} from "react-icons/md";
import {
  deleteTask,
  fetchAllTasks,
  updateTaskProgress,
} from "../../states/schedule";
import { BsStars } from "react-icons/bs";
import { GoKebabHorizontal } from "react-icons/go";
import { TbCirclesRelation } from "react-icons/tb";
import { IoShareSocial } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { useUserData } from "./useUserData";
interface TasksComponentProps {
  selected: Date | null;
  tasks: { [key: string]: Task[] };
  handleToggleTaskCompletion: (taskId: string, isCompleted: boolean) => void;
  updateTasks: (updatedTasks: { [key: string]: Task[] }) => void;
  loading: boolean;
}

const TasksComponent: React.FC<TasksComponentProps> = ({
  selected,
  tasks,
  handleToggleTaskCompletion,
  updateTasks,
  loading,
}) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTaskId, setEditedTaskId] = useState("");

  const toast = useToast();
  const user = useUserData();

  const fetchData = async () => {
    try {
      const allTasks = await fetchAllTasks(user.userId);
      const tasksByDate: { [key: string]: Task[] } = {};

      allTasks.forEach((task: Task, index: number) => {
        const date = dayjs(task.date).format("YYYY-MM-DD");

        if (!tasksByDate[date]) {
          tasksByDate[date] = [];
        }

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
  const handleEdit = (taskId: string, description: string) => {
    // Function to enter edit mode
    setEditedTaskId(taskId);
    setEditedDescription(description);
    setEditMode(true);
  };

  const handleSave = async () => {
    setEditMode(false);
    setEditedTaskId("");
    setEditedDescription("");
  };

  const renderDescription = (taskId: string, description: string) => {
    if (editMode && taskId === editedTaskId) {
      return (
        <Flex>
          <Input
            m={"auto"}
            size={"sm"}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <Button
            size="sm"
            bg={"gray.700"}
            color={"white"}
            onClick={handleSave}
          >
            Save
          </Button>
        </Flex>
      );
    } else {
      return <Text>{description}</Text>;
    }
  };
  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };
  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    targetTaskId: string
  ) => {
    event.preventDefault();
    if (draggedTaskId !== null && draggedTaskId !== targetTaskId) {
      const updatedTasks = updateTaskPosition(
        tasks,
        draggedTaskId,
        targetTaskId
      );

      console.log("Updated Tasks:", updatedTasks);
      setDraggedTaskId(null);
    }
  };

  const handleDrop = (targetTaskId: string) => {
    console.log(`Move task ${draggedTaskId} to position ${targetTaskId}`);
    setDraggedTaskId(null);
  };

  const updateTaskPosition = (
    currentTasks: { [key: string]: Task[] },
    draggedTaskId: string,
    targetTaskId: string
  ): { [key: string]: Task[] } => {
    const updatedTasks = { ...currentTasks };

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

    if (!draggedTask || !targetTask) {
      console.error("Could not find dragged or target task");
      return currentTasks;
    }

    return updatedTasks;
  };
  const TimerSlider = ({
    taskDuration,
    taskProgress,
    taskId,
  }: {
    taskDuration: { hours: number; minutes: number } | null;
    taskProgress: { hours: number; minutes: number } | null;
    taskId: string;
  }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
      if (taskDuration) {
        setCurrentTime(
          taskProgress
            ? taskProgress.hours * 3600 + taskProgress.minutes * 60
            : 0
        );
      }
    }, [taskDuration, taskProgress]);

    useEffect(() => {
      let interval: number | undefined;

      if (isTimerRunning && taskDuration) {
        const totalSeconds =
          taskDuration.hours * 3600 + taskDuration.minutes * 60;
        if (currentTime < totalSeconds) {
          interval = setInterval(() => {
            setCurrentTime((prevTime) =>
              prevTime < totalSeconds ? prevTime + 1 : prevTime
            );
          }, 1000);
        } else {
          handleStop();
        }
      }

      return () => clearInterval(interval);
    }, [isTimerRunning, currentTime, taskDuration]);

    const formatTime = (time: number) => {
      const hours = Math.floor(time / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    };

    const handleStart = () => {
      setIsTimerRunning(true);
    };

    const handleStop = async () => {
      setIsTimerRunning(false);

      const progressHours = Math.floor(currentTime / 3600);
      const progressMinutes = Math.floor((currentTime % 3600) / 60);

      try {
        await updateTaskProgress(taskId, progressHours, progressMinutes);
        await handleToggleTaskCompletion(taskId, true);
        console.log("Task progress updated successfully");
      } catch (error) {
        console.error("Error updating task progress:", error);
      }
    };

    return (
      <>
        {taskDuration && (
          <HStack
            height={"25px"}
            bg={"var(--lvl4-darkcolor)"}
            w={"100%"}
            roundedBottom={5}
            p={2}
            px={4}
            spacing={4}
          >
            <Slider
              aria-label="timer-slider"
              max={taskDuration.hours * 3600 + taskDuration.minutes * 60}
              value={currentTime}
              flex={1}
            >
              <SliderTrack>
                <SliderFilledTrack bg="purple.500" />
              </SliderTrack>
              <SliderThumb boxSize={3} />
            </Slider>
            <Flex>
              <Button
                colorScheme="unstyled"
                size="xs"
                onClick={handleStart}
                isDisabled={isTimerRunning}
              >
                <MdNotStarted fontSize={"20px"} color="gray.100" />
              </Button>

              <Button
                colorScheme="unstyled"
                size="xs"
                onClick={handleStop}
                isDisabled={!isTimerRunning}
              >
                <MdPauseCircleFilled fontSize={"20px"} color="red.200" />
              </Button>
            </Flex>
            <span>
              {formatTime(currentTime)} /{" "}
              {formatTime(
                taskDuration.hours * 3600 + taskDuration.minutes * 60
              )}
            </span>
          </HStack>
        )}
      </>
    );
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await fetchData();
      toast({
        title: "Success",
        description: "Task deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const renderTasks = () => {
    if (loading) {
      return (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="xl" />
        </Flex>
      );
    }
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
    let istype: string = "";

    for (const task of dateTasks) {
      istype = task.type;
    }
    return (
      <Box
        minH={"calc(100vh - 225px)"}
        maxH={"calc(100vh - 225px)"}
        overflowY={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Box>
          {dateTasks

            .filter((task) => task.type == "Social")
            .map((task, index) => (
              <HStack
                key={`${task._id}-${index}`}
                mt={3}
                p={2}
                justifyContent={"space-between"}
                rounded={5}
                borderLeft={"solid 3px"}
                borderColor={
                  getBackgroundAndTextColorBySubType(task.subType).textColor
                }
                bg={
                  getBackgroundAndTextColorBySubType(task.subType)
                    .backgroundColor
                }
                _hover={{
                  bg: "var(--lvl4-darkcolor)",
                }}
              >
                <Flex
                  display={"flex"}
                  justifyContent={"center"}
                  alignContent={"center"}
                  gap={"10px"}
                >
                  <Box w={5}>{getIconBysubType(task.subType)}</Box>
                  <Tag
                    size={"sm"}
                    variant="outline"
                    border={"solid 1px"}
                    pb={"1px"}
                    color={"white"}
                    borderColor={"white"}
                    maxH={"25px"}
                    mt={"2px"}
                    mr={"5px"}
                  >
                    <TagLabel display={"flex"} alignItems={"center"} gap={2}>
                      {task.subType ? <>{task.subType}</> : <Text>Social</Text>}
                    </TagLabel>
                  </Tag>
                  {task.description}
                </Flex>
                <Menu placement="left-start">
                  <MenuButton
                    as={IconButton}
                    icon={<GoKebabHorizontal />}
                    size="xs"
                    color="gray.50"
                    colorScheme="black"
                    _hover={{
                      bg: "gray.400",
                      color: "gray.900",
                      cursor: "point",
                    }}
                    aria-label="Options"
                  />
                  <MenuList
                    bg={"var(--lvl3-darkcolor)"}
                    borderColor={"var(--bordercolor)"}
                    zIndex={10000000000}
                    style={{
                      minWidth: "unset",
                      maxWidth: "150px",
                    }}
                  >
                    <MenuItem
                      bg={"var(--lvl3-darkcolor)"}
                      _hover={{
                        bg: "var(--lvl3-darkcolor)",
                        color: "blue.200",
                      }}
                      color={"gray.200"}
                      icon={<MdModeEdit />}
                      fontSize={"14px"}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      bg={"var(--lvl3-darkcolor)"}
                      _hover={{
                        bg: "var(--lvl3-darkcolor)",
                        color: "red.200",
                      }}
                      color={"red.300"}
                      icon={<FaTrashAlt />}
                      fontSize={"14px"}
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
                {dateTasks.length !== 0 &&
                  dateTasks.some((task) => task.type === "Social")}
              </HStack>
            ))}
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mt={4}>
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
              >
                <Text fontSize={"sm"}>Add task</Text>
              </Button>
            </Box>
          ) : (
            dateTasks
              .filter((task) => task.type !== "Social")
              .map((task, index) => (
                <Flex
                  key={`${task._id}-${index}`}
                  direction={"column"}
                  alignItems={"center"}
                >
                  <HStack
                    key={index}
                    w={"100%"}
                    mt={3}
                    p={2}
                    justifyContent={"space-between"}
                    rounded={5}
                    bg="var(--lvl3-darkcolor)"
                    _hover={{
                      bg: "var(--lvl4-darkcolor)",
                      cursor: "pointer",
                    }}
                    draggable
                    onDragStart={() => handleDragStart(task._id)}
                    onDragOver={(e) => handleDragOver(e, task._id)}
                    onDrop={() => handleDrop(task._id)}
                  >
                    <Checkbox
                      gap={2}
                      colorScheme="purple"
                      isChecked={task.isCompleted}
                      onChange={() =>
                        handleToggleTaskCompletion(task._id, !task.isCompleted)
                      }
                    >
                      {task.isImportant && (
                        <Tag
                          size={"sm"}
                          variant="outline"
                          colorScheme="red"
                          color={"white"}
                          maxH={"25px"}
                          mt={"2px"}
                          mr={"5px"}
                        >
                          <TagLabel>Important</TagLabel>
                        </Tag>
                      )}
                      {task.type !== "Normal" && (
                        <Tag
                          size={"sm"}
                          variant="outline"
                          border={"solid 1px"}
                          pb={"1px"}
                          color={getBackgroundColorByType(task.type)}
                          borderColor={getBackgroundColorByType(task.type)}
                          maxH={"25px"}
                          mt={"2px"}
                          mr={"5px"}
                        >
                          <TagLabel
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                          >
                            {getIconByType(task.type)} {task.type}
                          </TagLabel>
                        </Tag>
                      )}
                      {!editMode
                        ? task.description
                        : renderDescription(task._id, task.description)}
                    </Checkbox>
                    <Flex>
                      <Menu placement="left-start">
                        <MenuButton
                          as={IconButton}
                          icon={<GoKebabHorizontal />}
                          size="xs"
                          color="gray.50"
                          colorScheme="black"
                          _hover={{
                            bg: "gray.400",
                            color: "gray.900",
                            cursor: "point",
                          }}
                          aria-label="Options"
                        />
                        <MenuList
                          bg={"var(--lvl3-darkcolor)"}
                          borderColor={"var(--bordercolor)"}
                          zIndex={10000000000}
                          style={{
                            minWidth: "unset",
                            maxWidth: "150px",
                          }}
                        >
                          <MenuItem
                            bg={"var(--lvl3-darkcolor)"}
                            _hover={{
                              bg: "var(--lvl3-darkcolor)",
                              color: "blue.200",
                            }}
                            color={"gray.200"}
                            icon={<MdModeEdit />}
                            fontSize={"14px"}
                            onClick={() =>
                              handleEdit(task._id, task.description)
                            }
                          >
                            Edit
                          </MenuItem>
                          <MenuItem
                            bg={"var(--lvl3-darkcolor)"}
                            _hover={{
                              bg: "var(--lvl3-darkcolor)",
                              color: "red.200",
                            }}
                            color={"red.300"}
                            icon={<FaTrashAlt />}
                            fontSize={"14px"}
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </HStack>
                  {task.type == "Timing" && (
                    <TimerSlider
                      taskDuration={task.duration}
                      taskProgress={task.progress}
                      taskId={task._id}
                    />
                  )}
                </Flex>
              ))
          )}
        </Box>
      </Box>
    );
  };
  function getBackgroundColorByType(type: string): string {
    switch (type) {
      case "Social":
        return "green.200";
      case "Goal":
        return "yellow.200";
      case "Routine":
        return "purple.200";
      case "Timing":
        return "cyan.200";
      default:
        return "gray.200";
    }
  }

  function getIconByType(type: string): ReactElement {
    switch (type) {
      case "Social":
        return <CiStar size={15} />;
      case "Goal":
        return <CiTrophy size={15} />;
      case "Routine":
        return <CiGrid42 size={15} />;
      case "Timing":
        return <CiClock2 size={15} />;
      default:
        return <IoShareSocial size={15} />;
    }
  }

  function getIconBysubType(type: string): ReactElement {
    switch (type) {
      case "event":
        return <BsStars size={18} />;
      case "birthday":
        return <PiCakeThin size={22} />;
      case "wedding":
        return <TbCirclesRelation size={22} />;
      case "party":
        return <GiPartyPopper size={22} />;

      default:
        return <IoShareSocial size={22} />;
    }
  }
  function getBackgroundAndTextColorBySubType(type: string): {
    backgroundColor: string;
    textColor: string;
  } {
    switch (type) {
      case "event":
        return {
          backgroundColor:
            "linear-gradient(90deg, rgba(23,64,28,1) 0%, rgba(35, 35, 35, 1) 100%)",
          textColor: "green.500",
        };
      case "birthday":
        return {
          backgroundColor:
            "linear-gradient(90deg, rgba(27,23,64,1) 0%, rgba(35, 35, 35, 1) 100%)",
          textColor: "blue.500",
        };
      case "wedding":
        return {
          backgroundColor:
            "linear-gradient(90deg, rgba(64,23,37,1) 0%, rgba(35, 35, 35, 1) 100%)",
          textColor: "red.500",
        };
      case "party":
        return {
          backgroundColor:
            "linear-gradient(90deg,rgba(61,64,23,1) 0%, rgba(35, 35, 35, 1) 100%)",
          textColor: "yellow.500",
        };
      default:
        return {
          backgroundColor:
            "linear-gradient(90deg, #1a1a1a 0%, rgba(35, 35, 35, 1) 100%)",
          textColor: "#ffffff",
        };
    }
  }

  return (
    <Box w={"100%"} p={"20px 10px"} rounded={10}>
      {selected && (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={"xl"}>{dayjs(selected).format("MMMM D, YYYY")}</Text>
          <Button
            size={"sm"}
            fontSize={"xl"}
            bg={"transparent"}
            color={"gray.100"}
            _hover={{
              bg: "var(--lvl2-darkcolor)",
              color: "white",
              borderColor: "var(--lvl2-darkcolor)",
            }}
            // onClick={handleOpenModal}
          >
            <MdQuestionMark />
          </Button>
        </Flex>
      )}
      <Box>{renderTasks()}</Box>
    </Box>
  );
};

export default TasksComponent;
