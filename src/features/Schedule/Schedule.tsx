import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Calendar } from "@mantine/dates";

import {
  Box,
  Text,
  Input,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/color-mode";
import { useViewportSize } from "@mantine/hooks";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

const Schedule = () => {
  const [selected, setSelected] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<{ [key: string]: string[] }>({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleSelect = (date: Date) => {
    setSelected(date);
    setDrawerOpen(true);
  };

  const handleAddTask = (task: string) => {
    if (selected) {
      const formattedDate = dayjs(selected).format("YYYY-MM-DD");
      setTasks((prevTasks) => ({
        ...prevTasks,
        [formattedDate]: [...(prevTasks[formattedDate] || []), task],
      }));
    }
  };
  const { width } = useViewportSize();
  // depending on the width, assign a size of md, lg, xl
  const calendarSize = useMemo(() => {
    if (width < 420) return "md";
    if (width < 500) return "lg";
    return "xl";
  }, [width]);

  const renderTasks = () => {
    if (!selected) return null;

    const formattedDate = dayjs(selected).format("YYYY-MM-DD");
    const dateTasks = tasks[formattedDate] || [];

    return (
      <Box mt={4}>
        <Text mt={2} fontWeight="semibold">
          Add a task :
        </Text>
        <Input
          mt={4}
          type="text"
          placeholder="Enter task"
          size="sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
              handleAddTask(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={10}>
            Tasks for {dayjs(selected).format("MMMM D, YYYY")}:
          </Text>
          {dateTasks.map((task, index) => (
            <Text
              mt={3}
              p={"5px 15px"}
              rounded={5}
              border={"1px"}
              borderColor={"gray.600"}
              fontSize={"md"}
              key={index}
            >
              {task}
            </Text>
          ))}
        </Box>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box>
        <Calendar
          getDayProps={(date) => ({
            onClick: () => handleSelect(date),
          })}
          size={calendarSize}
          renderDay={(paramDate) => {
            return <div>daf</div>;
          }}
        />
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={() => {
            setDrawerOpen(false);
            setSelected(null);
          }}
          size="xs"
        >
          <DrawerOverlay>
            <DrawerContent bg={"var(--lvl1-darkcolor)"}>
              <DrawerCloseButton />
              <DrawerHeader>
                {selected && dayjs(selected).format("MMMM D, YYYY")}
              </DrawerHeader>
              <DrawerBody>{renderTasks()}</DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </ChakraProvider>
  );
};

export default Schedule;
