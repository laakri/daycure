import React from "react";
import { Calendar } from "@mantine/dates";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
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
  console.log(tasks);
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
      circleColor = "red"; // Uncompleted tasks
    } else if (
      completedTasks.length > 0 &&
      completedTasks.length === tasks[date].length
    ) {
      circleColor = "green.400"; // All tasks completed
    } else if (completedTasks.length > 0) {
      circleColor = "orange"; // Some tasks completed
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
        borderColor={"#00007a"}
        rounded={10}
        minH={40}
        bg={"#000017"}
      >
        <Text fontSize={"md"} p={"10px 15px"} color={"gray.200"}>
          Routine
        </Text>

        <Flex
          border={"solid 1px"}
          borderColor={"gray.800"}
          minH="30px"
          m={"10px"}
          rounded={5}
          bg={"#000045"}
          display={"flex"}
          alignItems={"center"}
          p={2}
          justifyContent={"space-between"}
          maxW={"370px"}
        >
          <Text fontSize={"sm"}>
            ye chaima rahoy saif yahki alik bl khayeb bl khayeb alekherweny
            habet nkolk ema m 9etch kifh
          </Text>

          <Link display={"flex"} alignItems={"center"}>
            <DeleteIcon color={"red.300"} fontSize={"xs"} />
          </Link>
        </Flex>
        <Flex
          border={"solid 1px"}
          borderColor={"gray.800"}
          minH="30px"
          m={"10px"}
          rounded={5}
          bg={"#000045"}
          display={"flex"}
          alignItems={"center"}
          p={2}
          justifyContent={"space-between"}
          maxW={"370px"}
        >
          <Text fontSize={"sm"}>
            ye chaima rahoy saif yahki alik bl khayeb bl khayeb alekherweny
            habet nkolk ema m 9etch kifh
          </Text>

          <Link display={"flex"} alignItems={"center"}>
            <DeleteIcon color={"red.300"} fontSize={"xs"} />
          </Link>
        </Flex>
        <Flex
          border={"solid 1px"}
          borderColor={"gray.800"}
          minH="30px"
          m={"10px"}
          rounded={5}
          bg={"#000045"}
          display={"flex"}
          alignItems={"center"}
          p={2}
          justifyContent={"space-between"}
          maxW={"370px"}
        >
          <Text fontSize={"sm"}>
            ye chaima rahoy saif yahki alik bl khayeb bl khayeb alekherweny
            habet nkolk ema m 9etch kifh
          </Text>

          <Link display={"flex"} alignItems={"center"}>
            <DeleteIcon color={"red.300"} fontSize={"xs"} />
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CalendarComponent;
