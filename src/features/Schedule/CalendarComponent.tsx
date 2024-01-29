import React from "react";
import { Calendar } from "@mantine/dates";
import { Box, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import Task from "./taskModel";

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
  const renderDay = (paramDate: Date) => {
    const date = dayjs(paramDate).format("YYYY-MM-DD");
    const currentDay = dayjs().format("YYYY-MM-DD");
// const checkType 

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
            bg={circleColor}
            transform={"translate(-50%)"}
          ></Box>
        )}
      </Box>
    );
  };

  return (
    <Box rounded={10} p={10}>
      <Calendar
        getDayProps={(date) => ({
          onClick: () => handleSelect(date),
        })}
        size={"xl"}
        renderDay={renderDay}
      />
    </Box>
  );
};

export default CalendarComponent;
