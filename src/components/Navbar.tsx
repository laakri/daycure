import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
  Kbd,
} from "@chakra-ui/react";
import { FaMoon, FaUserAstronaut } from "react-icons/fa6";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useUserStore } from "../stores/user";
import ModalComponent from "./ModalComponent";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const { user, logout } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl + A combination to open the modal
      if (event.ctrlKey && event.key === "a") {
        setIsModalOpen(true);
      }
    };

    document?.addEventListener("keydown", handleKeyDown);

    return () => {
      document?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Flex
      align="center"
      justify="space-between"
      alignItems={"center"}
      display="flex"
      h="60px"
      px="10px"
      gap={2}
    >
      <Flex>
        <Flex gap="10px" alignItems="center" padding="5px 20px">
          <Link to="/">
            <Text fontSize="xl">DailyCure </Text>
          </Link>
        </Flex>
      </Flex>

      <InputGroup size="sm" w={460}>
        <Input
          id="searchInput"
          borderColor={"gray.700"}
          placeholder="Quick Entry"
          onClick={handleOpenModal}
        />
        <InputRightElement mr={6}>
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
            A
          </Kbd>
        </InputRightElement>
      </InputGroup>
      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
      <Flex gap={"20px"}>
        {isLoggedIn ? (
          <Flex alignItems="center" gap={2}>
            <Flex
              bg="var(--lvl3-darkcolor)"
              border="var(--bordercolor) solid 1px"
              rounded="5px"
              h="35px"
              w="35px"
              alignItems="center"
              justifyContent="center"
              fontSize="md"
            >
              <IoNotifications />
            </Flex>

            <Menu>
              <MenuButton
                as={Flex}
                rounded={5}
                h="35px"
                fontSize="18px"
                cursor={"pointer"}
                _hover={{ bg: "var(--lvl1-darkcolor)" }}
                w={"max-content"}
              >
                <Flex
                  bg="var(--lvl3-darkcolor)"
                  border="var(--bordercolor) solid 1px"
                  rounded="5px"
                  h="35px"
                  w="35px"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="md"
                >
                  <FaUserAstronaut />
                </Flex>
              </MenuButton>
              <MenuList
                bg={"var(--lvl1-darkcolor)"}
                borderColor={"var(--bordercolor)"}
                zIndex={10000000000}
              >
                <MenuItem
                  bg={"var(--lvl1-darkcolor)"}
                  _hover={{
                    bg: "var(--lvl1-darkcolor)",
                    border: "transparent 1px solid",
                    color: "var(--chakra-colors-chakra-body-text)",
                  }}
                  justifyContent={"center"}
                >
                  {user ? user.userName : "User Name"}
                </MenuItem>
                <Divider w={"90%"} m={"auto"} />
                <MenuItem
                  mt={3}
                  bg={"var(--lvl1-darkcolor)"}
                  _hover={{
                    bg: "var(--lvl3-darkcolor)",
                    border: "transparent 1px solid",
                    color: "var(--chakra-colors-chakra-body-text)",
                  }}
                  icon={<IoIosSettings />}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  bg={"var(--lvl1-darkcolor)"}
                  _hover={{
                    bg: "var(--lvl3-darkcolor)",
                    border: "transparent 1px solid",
                    color: "var(--chakra-colors-chakra-body-text)",
                  }}
                  icon={<FaMoon />}
                >
                  Theme Mode
                </MenuItem>
                <MenuItem
                  bg={"var(--lvl1-darkcolor)"}
                  _hover={{
                    bg: "var(--lvl3-darkcolor)",
                    border: "transparent 1px solid",
                    color: "var(--chakra-colors-chakra-body-text)",
                  }}
                  onClick={handleLogout}
                  icon={<IoMdLogOut />}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <>
            <Flex alignItems="center" rounded="5px">
              <Link to="/login">
                <Text fontSize="md">Login</Text>
              </Link>
            </Flex>
            <Flex
              gap="10px"
              alignItems="center"
              rounded="5px"
              p="3px 7px"
              border={"1px solid "}
              borderColor={"gray.700"}
              bg={"var(--lvl3-darkcolor)"}
            >
              <Link to="/signup">
                <Text fontSize="md">Sign Up</Text>
              </Link>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
