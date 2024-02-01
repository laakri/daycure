import React, { ReactElement, useEffect, useState } from "react";
import { GiPartyPopper, GiPartyFlags } from "react-icons/gi";
import { PiCakeThin } from "react-icons/pi";
import { CiPlane } from "react-icons/ci";
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
  SliderThumb,
  SliderTrack,
  Slider,
  SliderFilledTrack,
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
import { MdNotStarted, MdPauseCircleFilled } from "react-icons/md";

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
  }: {
    taskDuration: { hours: number; minutes: number } | null;
    taskId: string;
  }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {
      if (taskDuration) {
        setCurrentTime(0); // Start from 00:00:00
      }
    }, [taskDuration]);

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

    const handleStop = () => {
      setIsTimerRunning(false);
    };

    return (
      <>
        {taskDuration && (
          <HStack
            height={"25px"}
            bg={"gray.700"}
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
    let istype: string = "";

    for (const task of dateTasks) {
      istype = task.type;
    }
    return (
      <Box mt={4} h={"max-content"}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={10}>
            Events
          </Text>
          {dateTasks

            .filter((task) => task.subType !== undefined)
            .map((task, index) => (
              <HStack
                key={index}
                mt={3}
                p={2}
                justifyContent={"space-between"}
                rounded={5}
                border={"solid 1px"}
                borderColor={getBackgroundColorBysubType(task.subType)}
                _hover={{
                  bg: "var(--lvl2-darkcolor)",
                  cursor: "pointer",
                }}
              >
                <InputGroup>
                  <Flex
                    justifyContent={"center"}
                    alignContent={"center"}
                    gap={2}
                  >
                    {getIconBysubType(task.subType)}

                    {task.description}
                  </Flex>
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
                    aria-label="Edit Event"
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
                    aria-label="Delete Event"
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
                      cursor: "grab",
                    }}
                    aria-label="Drag Task"
                  />
                </Flex>
                {dateTasks.length !== 0 &&
                  dateTasks.some((task) => task.type === "Social")}
              </HStack>
            ))}
        </Box>
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
              <Flex direction={"column"} alignItems={"center"}>
                <HStack
                  key={index}
                  w={"100%"}
                  mt={3}
                  p={2}
                  justifyContent={"space-between"}
                  rounded={5}
                  bg={"gray.900"}
                  _hover={{
                    bg: "var(--lvl2-darkcolor)",
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
                {task.type == "Timing" && (
                  <TimerSlider taskDuration={task.duration} taskId={task._id} />
                )}
              </Flex>
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
      return <CiCalendarDate size={15} />;
  }
}

function getIconBysubType(type: string): ReactElement {
  switch (type) {
    case "event":
      return <CiPlane size={18} />;
    case "birthday":
      return <PiCakeThin color={"gold"} size={19} />;
    case "wedding":
      return <GiPartyPopper color={"white"} size={19} />;
    case "party":
      return <GiPartyFlags color={"white"} size={19} />;

    default:
      return <CiCalendarDate color="white" size={19} />;
  }
}
function getBackgroundColorBysubType(type: string): string {
  switch (type) {
    case "event":
      return "#2aeada40";
    case "birthday":
      return "#eab72a40";
    case "wedding":
      return "#9400d859";
    case "party":
      return "cyan.200";

    default:
      return "#ea2a9055";
  }
}
export default TasksComponent;
