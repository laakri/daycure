import { Link } from "react-router-dom";
import {
  Flex,
  Text,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Divider,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { FaMoon, FaUserAstronaut } from "react-icons/fa6";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";

import { IoNotifications } from "react-icons/io5";
import { useUserStore } from "../stores/user";
import { Search2Icon } from "@chakra-ui/icons";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const { user } = useUserStore();
  const { logout } = useUserStore();

  const handleLogout = () => {
    logout();
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
        <Flex
          gap="10px"
          alignItems="center"
          justifyContent={"center"}
          padding="5px 20px"
        >
          <Link to="/">
            <Text fontSize="xl">DailyCure </Text>
          </Link>
        </Flex>
      </Flex>
      <InputGroup size="md" w={460}>
        <Input borderColor={"gray.700"} placeholder="Search " />
        <InputRightElement>
          <Button size="xs" bg={"gray.700"} mr={1} color={"white"}>
            <Search2Icon />
          </Button>
        </InputRightElement>
      </InputGroup>
      {/* <Flex
        as="nav"
        align="center"
        justify="space-around"
        wrap="wrap"
        padding="5px 10px"
        display="flex"
        gap="15px"
        bg="var(--lvl3-darkcolor)"
        rounded="10px"
        maxW="500px"
        margin="auto"
        mt={"10px"}
      >
        <Box display="flex" gap="10px" alignItems="center">
          <NavLink to="/dashboard">
            <Text fontSize="2xl" p="5px 10px">
              <RxDashboard />
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="center ">
          <NavLink to="/schedule">
            <Text fontSize="2xl" p="5px 10px">
              <MdOutlineAddTask />
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="cent e r">
          <NavLink to="/wallet">
            <Text fontSize="2xl" p="5px 10px">
              <IoWalletOutline />
            </Text>
          </NavLink>
        </Box>
        <Box display="flex" gap="10px" alignItems="cente r ">
          <NavLink to="/fitness">
            <Text fontSize="2xl" p="5px 10px">
              <IoFitnessOutline />
            </Text>
          </NavLink>
        </Box>
      </Flex> */}
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
