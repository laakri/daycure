import React, { useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Box, Flex, Link, Tag, TagLabel, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Task from "./taskModel";
import { DeleteIcon } from "@chakra-ui/icons";

interface CalendarComponentProps {
  selected: Date | null;
  handleSelect: (date: Date) => void;
  tasks: { [key: string]: Task[] };
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  selected,
  handleSelect,
  tasks,
}) => {
  const routineTasks: Task[] = Object.values(tasks).flatMap((dateTasks) =>
    dateTasks.filter((task) => task.type === "Routine")
  );
  const renderDay = (paramDate: Date) => {
    const date = dayjs(paramDate).format("YYYY-MM-DD");
    const currentDay = dayjs().format("YYYY-MM-DD");

    const isCurrentDay = date === currentDay;
    const isSelectedDay =
      selected && date === dayjs(selected).format("YYYY-MM-DD");
    const hasTasks = tasks[date] && tasks[date].length > 0;
    const completedTasks = tasks[date]
      ? tasks[date].filter((task) => task.isCompleted)
      : [];

    let circleColor = "transparent";

    if (completedTasks.length === 0 && hasTasks) {
      circleColor = "red";
    } else if (
      completedTasks.length > 0 &&
      completedTasks.length === tasks[date].length
    ) {
      circleColor = "green.400";
    } else if (completedTasks.length > 0) {
      circleColor = "orange";
    }
    const dateTasks = tasks[date] || [];
    const hasGoalTask = dateTasks.some((task) => task.type === "Goal");

    return (
      <Box
        position="relative"
        border={"1px solid"}
        w={"90%"}
        h={"90%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        rounded={7}
        borderColor={
          isCurrentDay
            ? "purple.200"
            : hasGoalTask
            ? "#e7fc00a2"
            : "transparent"
        }
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
            top="4px"
            w="6px"
            h="6px"
            rounded="50%"
            bg={circleColor}
            transform={"translate(-50%)"}
          ></Box>
        )}
      </Box>
    );
  };

  return (
    <Flex
      p={10}
      flexDirection={"column"}
      gap={10}
      borderRadius={"30px"}
      alignItems={"center"}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "50%",
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.01), transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Calendar
        getDayProps={(date) => ({
          onClick: () => handleSelect(date),
        })}
        size={"xl"}
        renderDay={renderDay}
      />
      <Box
        border="solid 1px"
        borderColor={"#7a006e"}
        rounded={10}
        minH={"40px"}
        w={"100%"}
        bg={"#170015"}
      >
        <Text fontSize={"md"} p={"10px 15px"} color={"gray.200"}>
          Routine
        </Text>

        {routineTasks.length === 0 ? (
          <Text p={2} color={"gray.400"} textAlign={"center"}>
            No routine tasks available.
          </Text>
        ) : (
          routineTasks.map((task: any, index: any) => (
            <Flex
              key={index}
              border={"solid 1px"}
              borderColor={"gray.800"}
              minH="30px"
              m={"10px"}
              rounded={5}
              bg={"#450040"}
              display={"flex"}
              alignItems={"center"}
              p={2}
              justifyContent={"space-between"}
              maxW={"370px"}
            >
              <Flex>
                <Tag
                  size={"sm"}
                  variant="outline"
                  border={"solid 1px"}
                  pb={"1px"}
                  color={"gray.100"}
                  borderColor={"gray.500"}
                  maxH={"25px"}
                  mt={"2px"}
                  mr={"5px"}
                >
                  <TagLabel display={"flex"} alignItems={"center"} gap={2}>
                    {task.routineType}
                  </TagLabel>
                </Tag>
                <Text key={index} fontSize="sm" color="gray.100">
                  {task.description}
                </Text>
              </Flex>
              <Link
                display={"flex"}
                alignItems={"center"}
                _hover={{
                  color: "red.200",
                  cursor: "pointer",
                }}
                color="red.500"
              >
                <DeleteIcon fontSize="xs" />
              </Link>
            </Flex>
          ))
        )}
      </Box>
    </Flex>
  );
};

export default CalendarComponent;
