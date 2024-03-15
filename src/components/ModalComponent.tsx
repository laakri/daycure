import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  InputGroup,
  Input,
  Text,
  InputRightElement,
  Flex,
  Kbd,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault();
        setSearchText("Add Task:");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleInputChange = () => {
    if (searchText.startsWith("Add Task:")) {
      const taskDescription = searchText.slice("Add Task:".length).trim();
      console.log("Task description:", taskDescription);
      // Perform further analysis or processing here
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
      <ModalContent
        bg={"var(--lvl3-darkcolor)"}
        border="var(--bordercolor) solid 1px"
      >
        <ModalBody my={3}>
          <InputGroup size="lg">
            <Input
              borderColor={"gray.700"}
              placeholder="Search "
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleInputChange();
              }}
              _focus={{
                boxShadow: "none",
                borderColor: "gray.700",
              }}
              _placeholder={{
                color: "gray.400",
              }}
              _placeholder-shown={{
                color: "gray.400",
              }}
              {...(searchText.includes("Add Task:") && {
                bg: "gray.800",
              })}
            />
            <InputRightElement>
              <Search2Icon color={"gray.400"} />
            </InputRightElement>
          </InputGroup>
          <Flex flexDirection={"column"} gap={2} mt={2}>
            <Flex
              justifyContent={"space-between"}
              bg={"gray.800"}
              p={" 10px 15px"}
              rounded={5}
            >
              <Text color={"gray.300"}>
                You can add a task by typing "Add Task:"
              </Text>

              <Flex alignItems={"center"} gap={2}>
                <Text fontSize={"xs"} color={"purple.300"}>
                  or
                </Text>
                <Text>
                  <Kbd
                    bg={"var(--lvl3-darkcolor)"}
                    border="var(--bordercolor) solid 1px"
                    mr={1}
                  >
                    Ctrl
                  </Kbd>
                  +
                  <Kbd
                    bg={"var(--lvl3-darkcolor)"}
                    border="var(--bordercolor) solid 1px"
                  >
                    E
                  </Kbd>
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
