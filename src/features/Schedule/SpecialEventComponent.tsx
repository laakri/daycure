import React, { ReactElement } from "react";
import { GiPartyPopper } from "react-icons/gi";
import { PiCakeThin } from "react-icons/pi";
import { CiCalendarDate, CiPlane } from "react-icons/ci";
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
import Event from "./eventModel";

interface EventComponentProps {
  selected: Date | null;
  events: { [key: string]: Event[] };
  handleOpenModal: () => void;
}

const SpecialEventComponent: React.FC<EventComponentProps> = ({
  selected,
  events,
  handleOpenModal,
}) => {
  const renderEvent = () => {
    if (!selected)
      return (
        <Box>
          <Text fontSize={"xl"} textAlign={"center"} mt={5}>
            You must select a day!
          </Text>
        </Box>
      );

    const formattedDate = dayjs(selected).format("YYYY-MM-DD");
    const dateEvent = events[formattedDate] || [];
    let istype: string = ""; // Déclarée en dehors de la boucle

    for (const event of dateEvent) {
      istype = event.type; // Mettez à jour la variable à chaque itération
    }

    return (
      <Box mt={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2} mt={10}>
            Events
          </Text>

          {dateEvent.length === 0 ? (
            <Box
              m={"40px auto"}
              maxW={"max-content"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={4}
            >
              <Text fontSize="md" color="gray.200">
                No events for this day.
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
                <Text fontSize={"sm"}>Add Event</Text>
              </Button>
            </Box>
          ) : (
            dateEvent.map((event, index) => (
              <HStack
                key={index}
                mt={3}
                p={2}
                justifyContent={"space-between"}
                rounded={5}
                border={"solid 1px"}
                borderColor={getBackgroundColorByType(event.type)}
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
                      {getIconByType(event.type)}
                      {event.isImportant && (
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

                      {event.description}
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
        background: "linear-gradient( black,#6e6d6d12 )",
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: "50%",
        background:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.090), transparent)",
        zIndex: 1,
        pointerEvents: "none",
      }}
      borderRadius={"30px"}
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
      <Box>{renderEvent()}</Box>
    </Box>
  );
};
function getBackgroundColorByType(type: string): string {
  switch (type) {
    case "event":
      return "#2aeada40";
    case "birthday":
      return "#eab72a40";
    case "wedding":
      return "#9400d859";

    default:
      return "#ea2a9055";
  }
}

function getIconByType(type: string): ReactElement {
  switch (type) {
    case "event":
      return <CiPlane size={18} />;
    case "birthday":
      return <PiCakeThin color={"gold"} size={19} />;
    case "wedding":
      return <GiPartyPopper color={"white"} size={19} />;

    default:
      return <CiCalendarDate color="white" size={19} />;
  }
}
export default SpecialEventComponent;
